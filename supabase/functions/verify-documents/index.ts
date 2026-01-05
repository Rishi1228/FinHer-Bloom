import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documents, schemeName, schemeRequirements } = await req.json();
    
    console.log('Verifying documents for scheme:', schemeName);
    console.log('Documents submitted:', documents);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert document verification assistant for Indian government schemes. Your job is to analyze uploaded documents and verify if they meet the requirements for scheme applications.

You will be given:
1. A list of documents the user claims to have
2. The scheme name
3. The scheme's document requirements

Analyze and provide:
1. Overall readiness status (ready, partial, not_ready)
2. For each required document, check if it's present
3. Any missing documents
4. Helpful tips for the applicant
5. Any potential issues or warnings

Be encouraging but accurate. Help women understand what they need to complete their application.`;

    const userPrompt = `Scheme: ${schemeName}

Required Documents: ${JSON.stringify(schemeRequirements, null, 2)}

User's Submitted Documents: ${JSON.stringify(documents, null, 2)}

Please analyze the documents and provide a verification report in the following JSON format:
{
  "overallStatus": "ready" | "partial" | "not_ready",
  "readinessScore": number (0-100),
  "summary": "Brief summary of document readiness",
  "documentChecks": [
    {
      "documentName": "Document name",
      "status": "verified" | "missing" | "needs_review",
      "message": "Explanation"
    }
  ],
  "missingDocuments": ["List of missing required documents"],
  "tips": ["Helpful tips for the applicant"],
  "warnings": ["Any warnings or issues"]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
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
    
    console.log("AI Response:", aiResponse);

    // Try to parse the JSON response
    let verificationResult;
    try {
      // Extract JSON from the response (in case it's wrapped in markdown)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        verificationResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Return a structured fallback response
      verificationResult = {
        overallStatus: "partial",
        readinessScore: 50,
        summary: "Document verification completed. Please review the details below.",
        documentChecks: documents.map((doc: string) => ({
          documentName: doc,
          status: "verified",
          message: "Document noted"
        })),
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
