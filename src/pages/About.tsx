import PageLayout from "@/components/PageLayout";

const About = () => (
  <PageLayout title="About Fin-Her" subtitle="Empowering Indian women through financial knowledge and access.">
    <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
      <p>
        Fin-Her is a financial empowerment platform built specifically for Indian women. We bring together
        government scheme discovery, financial literacy, AI-powered guidance, and a warm community — all in
        one trusted place.
      </p>
      <p>
        Our mission is simple: make financial independence accessible to every woman, regardless of her
        background, language, or starting point. We translate complex policies and products into clear,
        actionable steps so that you can make confident decisions about your money.
      </p>
      <h2 className="font-serif text-2xl font-bold text-foreground mt-8">What we believe</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Financial knowledge is a fundamental right, not a privilege.</li>
        <li>Every woman deserves a safe space to learn and ask questions.</li>
        <li>Technology should reduce complexity, not add to it.</li>
        <li>Community and mentorship multiply individual success.</li>
      </ul>
    </div>
  </PageLayout>
);

export default About;
