import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 600);
  };

  return (
    <PageLayout title="Contact Us" subtitle="We'd love to hear from you.">
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Card className="p-5 text-center"><Mail className="w-6 h-6 mx-auto mb-2 text-primary" /><p className="font-medium">hello@finher.in</p></Card>
        <Card className="p-5 text-center"><Phone className="w-6 h-6 mx-auto mb-2 text-primary" /><p className="font-medium">+91 80000 00000</p></Card>
        <Card className="p-5 text-center"><MapPin className="w-6 h-6 mx-auto mb-2 text-primary" /><p className="font-medium">Bengaluru, India</p></Card>
      </div>
      <Card className="p-6 max-w-2xl mx-auto">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" required maxLength={100} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required maxLength={255} />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" required maxLength={1000} rows={5} />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Card>
    </PageLayout>
  );
};

export default Contact;
