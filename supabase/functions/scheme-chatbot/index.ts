import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const schemesContext = `
You are Saheli, a friendly and knowledgeable AI assistant helping Indian women discover government schemes and benefits. You speak in a warm, encouraging tone and use simple language.

AVAILABLE SCHEMES:

1. SUKANYA SAMRIDDHI YOJANA (Savings)
- For: Parents of girl children below 10 years
- Benefits: 8.2% interest rate, tax-free returns, up to ₹1.5 lakh/year investment
- Eligibility: Girl child under 10, Indian resident, max 2 accounts per family
- Documents: Birth certificate, Aadhaar (child & parent), address proof, photos

2. MAHILA SAMMAN SAVINGS CERTIFICATE (Savings)
- For: All women and girls
- Benefits: 7.5% interest, 2-year tenure, partial withdrawal after 1 year
- Eligibility: Any woman, Indian resident, up to ₹2 lakh total
- Documents: Aadhaar, PAN (for >₹50,000), address proof, photo

3. PRADHAN MANTRI MUDRA YOJANA (Entrepreneurship)
- For: Women entrepreneurs starting/expanding business
- Benefits: Collateral-free loans up to ₹10 lakh, lower interest for women, free accident insurance
- Categories: Shishu (≤₹50K), Kishore (₹50K-5L), Tarun (₹5L-10L)
- Eligibility: 18+, viable business plan, women get priority
- Documents: Aadhaar, PAN, business plan, bank statements

4. STAND UP INDIA (Entrepreneurship)
- For: SC/ST or women first-time entrepreneurs
- Benefits: Loans ₹10 lakh to ₹1 crore for greenfield enterprises
- Eligibility: 18+, first-time entrepreneur, 51% ownership required
- Documents: Identity proof, project report, bank statements, ITR

5. PRADHAN MANTRI MATRU VANDANA YOJANA (Maternity)
- For: Pregnant and lactating mothers
- Benefits: ₹11,000 cash transfer for first child in 3 installments
- Eligibility: 19+, first living child, not govt employee
- Documents: Aadhaar, bank account, MCP card

6. ATAL PENSION YOJANA (Pension)
- For: Unorganized sector workers
- Benefits: Guaranteed pension ₹1,000-5,000/month after 60
- Eligibility: Age 18-40, savings account with Aadhaar link
- Documents: Aadhaar, bank account, mobile number, nominee details

GUIDELINES:
- Ask about the user's age, family situation, employment, and goals to recommend suitable schemes
- Explain eligibility criteria clearly
- Mention required documents when asked
- Be encouraging and supportive
- If unsure, suggest visiting the official portal or local office
- Use examples and simple language
- Always be respectful and empathetic
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chatbot request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: schemesContext },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error) {
    console.error("Chatbot error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
