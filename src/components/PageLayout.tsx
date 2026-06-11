import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const PageLayout = ({ title, subtitle, children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-10 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">{title}</h1>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </header>
        <div className="prose-content space-y-6">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
