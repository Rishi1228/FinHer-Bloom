import PageLayout from "@/components/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What is Fin-Her?", a: "Fin-Her is a financial empowerment platform for Indian women, offering government scheme discovery, financial learning, AI guidance through Saheli, and a supportive community." },
  { q: "Is Fin-Her free to use?", a: "Yes, all core features including scheme discovery, learning hub, community access, and the Saheli AI chatbot are completely free." },
  { q: "How do I find schemes I am eligible for?", a: "Visit the Schemes page, use filters or the eligibility checker on each scheme detail page to see if you qualify." },
  { q: "Is my personal data safe?", a: "Yes. We use encrypted storage, strict access controls, and never share your personal information with third parties." },
  { q: "How does the document verification work?", a: "Upload images of your documents and our AI checks readability, type, and completeness before you apply for a scheme." },
  { q: "Can I talk to a financial advisor?", a: "Saheli, our AI companion, can answer most questions. For complex queries you can connect with mentors via the community." },
];

const FAQs = () => (
  <PageLayout title="Frequently Asked Questions" subtitle="Answers to the questions we hear most often.">
    <Accordion type="single" collapsible className="max-w-3xl mx-auto">
      {faqs.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </PageLayout>
);

export default FAQs;
