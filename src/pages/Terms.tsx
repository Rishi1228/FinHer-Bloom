import PageLayout from "@/components/PageLayout";

const Terms = () => (
  <PageLayout title="Terms of Service" subtitle="Last updated: June 2026">
    <div className="max-w-3xl mx-auto space-y-5 text-muted-foreground leading-relaxed">
      <p>By using Fin-Her, you agree to these terms.</p>
      <h2 className="font-serif text-xl font-bold text-foreground">Use of the service</h2>
      <p>Fin-Her provides educational and informational content. We are not a financial advisor; please verify scheme details with the official source before applying.</p>
      <h2 className="font-serif text-xl font-bold text-foreground">Accounts</h2>
      <p>You are responsible for keeping your login credentials secure and for activity on your account.</p>
      <h2 className="font-serif text-xl font-bold text-foreground">Acceptable use</h2>
      <p>Do not misuse the service, attempt unauthorized access, or upload harmful content.</p>
      <h2 className="font-serif text-xl font-bold text-foreground">Limitation of liability</h2>
      <p>Fin-Her is provided "as is". We are not liable for decisions made based on platform content.</p>
      <h2 className="font-serif text-xl font-bold text-foreground">Changes</h2>
      <p>We may update these terms; we'll notify you of material changes.</p>
    </div>
  </PageLayout>
);

export default Terms;
