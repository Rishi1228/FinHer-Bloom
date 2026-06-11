import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Handshake } from "lucide-react";

const partnerTypes = [
  { title: "NGOs & Non-Profits", desc: "Extend financial literacy to your communities through our learning hub and Saheli AI." },
  { title: "Financial Institutions", desc: "Reach motivated women savers and entrepreneurs ready to apply for products and schemes." },
  { title: "Government Bodies", desc: "Improve scheme awareness, eligibility matching, and document readiness for women applicants." },
  { title: "Educators & Mentors", desc: "Contribute courses, host AMAs, or mentor women in our community." },
];

const Partners = () => (
  <PageLayout title="Partner with Fin-Her" subtitle="Together we can accelerate financial inclusion for women across India.">
    <div className="grid md:grid-cols-2 gap-6">
      {partnerTypes.map((p) => (
        <Card key={p.title} className="p-6">
          <Handshake className="w-8 h-8 text-primary mb-3" />
          <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
          <p className="text-sm text-muted-foreground">{p.desc}</p>
        </Card>
      ))}
    </div>
    <p className="text-center mt-10">
      Interested? <a href="/contact" className="text-primary hover:underline font-medium">Get in touch with us.</a>
    </p>
  </PageLayout>
);

export default Partners;
