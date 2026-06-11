import PageLayout from "@/components/PageLayout";

const Privacy = () => (
  <PageLayout title="Privacy Policy" subtitle="Last updated: June 2026">
    <div className="max-w-3xl mx-auto space-y-5 text-muted-foreground leading-relaxed">
      <p>Fin-Her ("we", "us") respects your privacy. This policy explains what data we collect and how we use it.</p>
      <h2 className="font-serif text-xl font-bold text-foreground">Information we collect</h2>
      <p>Account details you provide (name, email, phone, location, date of birth), usage data, and documents you upload for AI verification.</p>
      <h2 className="font-serif text-xl font-bold text-foreground">How we use it</h2>
      <p>To personalize scheme recommendations, power the Saheli AI assistant, and improve the platform. We never sell your data.</p>
      <h2 className="font-serif text-xl font-bold text-foreground">Storage and security</h2>
      <p>Data is stored in encrypted databases with strict row-level security. Only you can access your private records.</p>
      <h2 className="font-serif text-xl font-bold text-foreground">Your rights</h2>
      <p>You can request access, correction, or deletion of your data at any time by contacting us.</p>
      <h2 className="font-serif text-xl font-bold text-foreground">Contact</h2>
      <p>For privacy questions, email hello@finher.in.</p>
    </div>
  </PageLayout>
);

export default Privacy;
