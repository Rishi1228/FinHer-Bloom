import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";

const terms = [
  { term: "Aadhaar", def: "A 12-digit unique identity number issued by UIDAI to residents of India." },
  { term: "Compound Interest", def: "Interest calculated on the initial principal as well as on accumulated interest from previous periods." },
  { term: "EMI", def: "Equated Monthly Installment — a fixed monthly payment toward a loan." },
  { term: "Fixed Deposit (FD)", def: "A savings instrument where money is locked for a fixed term at a guaranteed interest rate." },
  { term: "KYC", def: "Know Your Customer — a process to verify a customer's identity." },
  { term: "Mutual Fund", def: "A pool of money from many investors used to buy a diversified portfolio of securities." },
  { term: "PAN", def: "Permanent Account Number — a 10-character ID issued by the Income Tax Department." },
  { term: "PPF", def: "Public Provident Fund — a long-term tax-saving government savings scheme." },
  { term: "SIP", def: "Systematic Investment Plan — investing a fixed amount in a mutual fund at regular intervals." },
  { term: "Sukanya Samriddhi", def: "A government savings scheme for the girl child with high interest and tax benefits." },
];

const Glossary = () => (
  <PageLayout title="Financial Glossary" subtitle="Simple definitions for common financial terms.">
    <div className="grid md:grid-cols-2 gap-4">
      {terms.map((t) => (
        <Card key={t.term} className="p-5">
          <h3 className="font-semibold text-lg mb-1 text-primary">{t.term}</h3>
          <p className="text-sm text-muted-foreground">{t.def}</p>
        </Card>
      ))}
    </div>
  </PageLayout>
);

export default Glossary;
