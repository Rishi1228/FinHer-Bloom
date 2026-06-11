import PageLayout from "@/components/PageLayout";

const Cookies = () => (
  <PageLayout title="Cookie Policy" subtitle="Last updated: June 2026">
    <div className="max-w-3xl mx-auto space-y-5 text-muted-foreground leading-relaxed">
      <p>We use a small number of cookies and similar technologies to make Fin-Her work and to improve your experience.</p>
      <h2 className="font-serif text-xl font-bold text-foreground">Essential cookies</h2>
      <p>Required for sign-in, session security, and core features. These cannot be disabled.</p>
      <h2 className="font-serif text-xl font-bold text-foreground">Preference cookies</h2>
      <p>Remember your settings such as language and theme.</p>
      <h2 className="font-serif text-xl font-bold text-foreground">Analytics</h2>
      <p>Help us understand how the platform is used so we can improve it. Anonymous and aggregated.</p>
      <h2 className="font-serif text-xl font-bold text-foreground">Your choices</h2>
      <p>You can clear or block cookies in your browser settings. Some features may not work without them.</p>
    </div>
  </PageLayout>
);

export default Cookies;
