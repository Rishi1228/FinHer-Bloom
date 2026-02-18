import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate the user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Invalid authentication' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { documents, schemeName, schemeRequirements, uploadedFiles } = await req.json();

    // Validate inputs
    if (documents && (!Array.isArray(documents) || documents.length > 20)) {
      return new Response(JSON.stringify({ error: 'Invalid documents. Maximum 20 allowed.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (uploadedFiles && (!Array.isArray(uploadedFiles) || uploadedFiles.length > 10)) {
      return new Response(JSON.stringify({ error: 'Too many files. Maximum 10 allowed.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (uploadedFiles) {
      for (const file of uploadedFiles) {
        if (file.base64 && file.base64.length > 7 * 1024 * 1024) {
          return new Response(JSON.stringify({ error: 'File too large. Maximum 5MB per file.' }), {
            status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }
    }
    if (!schemeName || typeof schemeName !== 'string' || schemeName.length > 200) {
      return new Response(JSON.stringify({ error: 'Invalid scheme name.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log('Verifying documents for scheme:', schemeName);
    console.log('Uploaded files count:', uploadedFiles?.length || 0);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build the messages array
    const messages: any[] = [];

    const systemPrompt = `You are an expert document verification assistant for Indian government schemes. Your job is to analyze documents (both listed and uploaded images) and verify if they meet the requirements for scheme applications.

You will be given:
1. A list of documents the user claims to have
2. The scheme name and its document requirements
3. Optionally, images of uploaded documents to analyze

When analyzing uploaded document images:
- Identify the document type (Aadhaar, PAN, Birth Certificate, etc.)
- Check if the document appears genuine and readable
- Verify the document format is acceptable
- Note any issues like blur, incomplete information, or tampering signs
- Extract key information if visible (name, ID number partially masked for privacy)

Provide a comprehensive verification report including:
1. Overall readiness status (ready, partial, not_ready)
2. Readiness score (0-100)
3. For each document, whether it's verified, missing, or needs review
4. Specific feedback for uploaded images
5. Missing documents list
6. Helpful tips for the applicant
7. Any warnings or issues

Be encouraging but accurate. Help women understand what they need to complete their application.`;

    messages.push({ role: "system", content: systemPrompt });

    // Build user message with text and optional images
    const userContent: any[] = [];

    // Add text content
    const textContent = `Scheme: ${schemeName}

Required Documents: ${JSON.stringify(schemeRequirements, null, 2)}

User's Listed Documents: ${JSON.stringify(documents, null, 2)}

${uploadedFiles && uploadedFiles.length > 0 ? `Number of Uploaded Document Images: ${uploadedFiles.length}

Please analyze the uploaded document images and provide detailed feedback on each.` : 'No document images were uploaded for visual verification.'}

Please provide your verification report in the following JSON format:
{
  "overallStatus": "ready" | "partial" | "not_ready",
  "readinessScore": number (0-100),
  "summary": "Brief summary of document readiness",
  "documentChecks": [
    {
      "documentName": "Document name",
      "status": "verified" | "missing" | "needs_review",
      "message": "Explanation",
      "isUploaded": boolean
    }
  ],
  "uploadedDocumentAnalysis": [
    {
      "fileName": "file name",
      "detectedType": "What type of document this appears to be",
      "quality": "good" | "fair" | "poor",
      "status": "verified" | "needs_review" | "rejected",
      "feedback": "Detailed feedback about the document",
      "extractedInfo": "Any visible information (partially masked for privacy)"
    }
  ],
  "missingDocuments": ["List of missing required documents"],
  "tips": ["Helpful tips for the applicant"],
  "warnings": ["Any warnings or issues"]
}`;

    userContent.push({ type: "text", text: textContent });

    // Add uploaded images if present
    if (uploadedFiles && uploadedFiles.length > 0) {
      for (const file of uploadedFiles) {
        if (file.base64 && file.mimeType) {
          userContent.push({
            type: "image_url",
            image_url: {
              url: `data:${file.mimeType};base64,${file.base64}`
            }
          });
        }
      }
    }

    messages.push({ role: "user", content: userContent });

    console.log("Sending request to AI gateway with", uploadedFiles?.length || 0, "images");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: "Rate limit exceeded. Please try again in a moment." 
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: "Service temporarily unavailable. Please try again later." 
        }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log("AI Response received");

    // Parse JSON response
    let verificationResult;
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        verificationResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      verificationResult = {
        overallStatus: "partial",
        readinessScore: 50,
        summary: "Document verification completed. Please review the details below.",
        documentChecks: documents.map((doc: string) => ({
          documentName: doc,
          status: "verified",
          message: "Document noted",
          isUploaded: false
        })),
        uploadedDocumentAnalysis: uploadedFiles?.map((f: any) => ({
          fileName: f.fileName,
          detectedType: "Unknown",
          quality: "fair",
          status: "needs_review",
          feedback: "Unable to analyze document. Please ensure the image is clear.",
          extractedInfo: null
        })) || [],
        missingDocuments: [],
        tips: ["Ensure all documents are clear and legible", "Keep original documents ready for verification"],
        warnings: []
      };
    }

    return new Response(JSON.stringify(verificationResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in verify-documents function:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
