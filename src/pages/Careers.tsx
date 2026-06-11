import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const roles = [
  { title: "Frontend Engineer", type: "Full-time", location: "Remote, India" },
  { title: "Content Lead — Financial Education", type: "Full-time", location: "Bengaluru / Remote" },
  { title: "Community Manager", type: "Full-time", location: "Remote, India" },
  { title: "Product Designer", type: "Contract", location: "Remote" },
];

const Careers = () => (
  <PageLayout title="Careers at Fin-Her" subtitle="Help us build the future of financial empowerment for women in India.">
    <p className="text-center text-muted-foreground max-w-2xl mx-auto">
      We're a small, mission-driven team. If you care deeply about impact and craft, we'd love to talk.
    </p>
    <div className="grid md:grid-cols-2 gap-4 mt-8">
      {roles.map((r) => (
        <Card key={r.title} className="p-5 hover:shadow-lg transition">
          <h3 className="font-semibold text-lg mb-2">{r.title}</h3>
          <div className="flex gap-2 mb-3">
            <Badge variant="secondary">{r.type}</Badge>
            <Badge variant="outline">{r.location}</Badge>
          </div>
          <a href="/contact" className="text-sm text-primary hover:underline">Apply via Contact →</a>
        </Card>
      ))}
    </div>
  </PageLayout>
);

export default Careers;
