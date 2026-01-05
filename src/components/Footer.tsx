import { Link } from "react-router-dom";
import { Sparkles, Heart } from "lucide-react";

const footerLinks = {
  Platform: [
    { name: "Schemes", path: "/schemes" },
    { name: "Learn", path: "/learn" },
    { name: "Community", path: "/community" },
    { name: "Blogs", path: "/blogs" },
  ],
  Resources: [
    { name: "Calculator", path: "/calculator" },
    { name: "FAQs", path: "/faqs" },
    { name: "Glossary", path: "/glossary" },
    { name: "Help Center", path: "/help" },
  ],
  Company: [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
    { name: "Partners", path: "/partners" },
  ],
  Legal: [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-2xl font-bold">Fin-Her</span>
            </Link>
            <p className="text-sm opacity-70 leading-relaxed">
              Empowering women through financial literacy, government scheme access, and a supportive community.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-70">
            © 2025 Fin-Her. All rights reserved.
          </p>
          <p className="text-sm opacity-70 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for women everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
