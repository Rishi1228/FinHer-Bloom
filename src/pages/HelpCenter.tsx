import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, MessageCircle, Mail, HelpCircle } from "lucide-react";

const sections = [
  { icon: BookOpen, title: "Getting Started", desc: "Learn how to create an account, explore schemes, and use the dashboard.", to: "/learn" },
  { icon: HelpCircle, title: "FAQs", desc: "Quick answers to the most common questions.", to: "/faqs" },
  { icon: MessageCircle, title: "Ask Saheli", desc: "Our AI companion answers your financial questions instantly.", to: "/" },
  { icon: Mail, title: "Contact Support", desc: "Reach our team for personal help.", to: "/contact" },
];

const HelpCenter = () => (
  <PageLayout title="Help Center" subtitle="We're here to help you on your financial journey.">
    <div className="grid md:grid-cols-2 gap-6">
      {sections.map((s) => (
        <Link key={s.title} to={s.to}>
          <Card className="p-6 hover:shadow-lg transition h-full">
            <s.icon className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </Card>
        </Link>
      ))}
    </div>
  </PageLayout>
);

export default HelpCenter;
