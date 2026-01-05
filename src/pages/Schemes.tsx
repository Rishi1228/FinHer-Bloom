import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight, ExternalLink, MapPin, Globe, IndianRupee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const schemes = [
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana",
    category: "Savings",
    description: "Government-backed savings scheme for girl child education and marriage expenses with tax benefits.",
    eligibility: "Girl child below 10 years",
    interestRate: "8.2%",
    minInvestment: "₹250",
    maxInvestment: "₹1.5 Lakh/year",
    online: true,
    popular: true,
  },
  {
    id: "mahila-samman",
    name: "Mahila Samman Savings Certificate",
    category: "Savings",
    description: "Special one-time savings scheme exclusively for women offering higher interest rates.",
    eligibility: "Women of any age",
    interestRate: "7.5%",
    minInvestment: "₹1,000",
    maxInvestment: "₹2 Lakh",
    online: true,
    popular: true,
  },
  {
    id: "mudra-yojana",
    name: "Pradhan Mantri Mudra Yojana",
    category: "Entrepreneurship",
    description: "Collateral-free loans up to ₹10 lakh for women entrepreneurs to start or expand businesses.",
    eligibility: "Women entrepreneurs",
    interestRate: "Varies",
    minInvestment: "₹50,000",
    maxInvestment: "₹10 Lakh",
    online: true,
    popular: true,
  },
  {
    id: "stand-up-india",
    name: "Stand Up India",
    category: "Entrepreneurship",
    description: "Bank loans for SC/ST and women entrepreneurs to set up greenfield enterprises.",
    eligibility: "Women above 18 years",
    interestRate: "Base Rate + 3%",
    minInvestment: "₹10 Lakh",
    maxInvestment: "₹1 Crore",
    online: false,
    popular: false,
  },
  {
    id: "matritva-vandana",
    name: "Pradhan Mantri Matru Vandana Yojana",
    category: "Maternity",
    description: "Direct cash transfer of ₹11,000 to pregnant and lactating mothers for first child.",
    eligibility: "Pregnant women (first child)",
    interestRate: "N/A",
    minInvestment: "N/A",
    maxInvestment: "₹11,000 benefit",
    online: true,
    popular: true,
  },
  {
    id: "atal-pension",
    name: "Atal Pension Yojana",
    category: "Pension",
    description: "Guaranteed pension scheme for unorganized sector workers with government co-contribution.",
    eligibility: "18-40 years",
    interestRate: "8-9%",
    minInvestment: "₹42/month",
    maxInvestment: "₹210/month",
    online: true,
    popular: false,
  },
];

const categories = ["All", "Savings", "Entrepreneurship", "Maternity", "Pension", "Education"];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Savings: "badge-lavender",
    Entrepreneurship: "badge-peach",
    Maternity: "badge-teal",
    Pension: "badge-gold",
    Education: "bg-primary/10 text-primary",
  };
  return colors[category] || "bg-muted text-muted-foreground";
};

const Schemes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-warm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="badge-gold inline-block mb-4">45+ Government Schemes</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Find Schemes <span className="text-gradient">Made For You</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover savings, education, business, and welfare schemes tailored for Indian women.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search schemes by name or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 rounded-2xl border-2 border-border focus:border-primary text-base"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Filter className="w-5 h-5 text-muted-foreground mr-2 self-center" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full ${selectedCategory === category ? "btn-primary-glow" : ""}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme, index) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-hover p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`${getCategoryColor(scheme.category)} px-3 py-1 rounded-full text-xs font-medium`}>
                    {scheme.category}
                  </span>
                  {scheme.popular && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                      Popular
                    </Badge>
                  )}
                </div>

                <h3 className="font-serif text-xl font-semibold mb-2">{scheme.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{scheme.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <IndianRupee className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Interest:</span>
                    <span className="font-medium">{scheme.interestRate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {scheme.online ? (
                      <Globe className="w-4 h-4 text-teal" />
                    ) : (
                      <MapPin className="w-4 h-4 text-accent-foreground" />
                    )}
                    <span className="text-muted-foreground">Apply:</span>
                    <span className="font-medium">{scheme.online ? "Online Available" : "Visit Branch"}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Link to={`/schemes/${scheme.id}`} className="flex-1">
                    <Button variant="outline" className="w-full rounded-xl gap-2">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  {scheme.online && (
                    <Button variant="ghost" size="icon" className="rounded-xl" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredSchemes.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No schemes found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Schemes;
