import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowRight, ExternalLink, MapPin, Globe, IndianRupee, Scale, Plus, X, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemeCompare from "@/components/scheme/SchemeCompare";
import { Link } from "react-router-dom";
import { useSchemes, useSchemeCategories } from "@/hooks/useSchemes";

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Savings: "badge-lavender",
    Entrepreneurship: "badge-peach",
    Maternity: "badge-teal",
    Pension: "badge-gold",
    Education: "bg-primary/10 text-primary",
    Insurance: "bg-teal/10 text-teal",
    "Skill Development": "bg-accent text-accent-foreground",
  };
  return colors[category] || "bg-muted text-muted-foreground";
};

const formatCurrency = (amount: number | null) => {
  if (!amount) return 'N/A';
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(0)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};

const Schemes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showComparePanel, setShowComparePanel] = useState(false);

  const { data: schemes = [], isLoading } = useSchemes();
  const { data: categories = ['All'] } = useSchemeCategories();

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSchemeForCompare = (schemeId: string) => {
    if (selectedForCompare.includes(schemeId)) {
      setSelectedForCompare(selectedForCompare.filter(id => id !== schemeId));
    } else if (selectedForCompare.length < 3) {
      setSelectedForCompare([...selectedForCompare, schemeId]);
    }
  };

  const startComparison = () => {
    if (selectedForCompare.length >= 2) {
      setShowComparePanel(true);
      setCompareMode(false);
    }
  };

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
            <span className="badge-gold inline-block mb-4">{schemes.length}+ Government Schemes</span>
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
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
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

            {/* Compare Mode Toggle */}
            <Button
              variant={compareMode ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setCompareMode(!compareMode);
                if (compareMode) {
                  setSelectedForCompare([]);
                }
              }}
              className={`rounded-full gap-2 ${compareMode ? "btn-primary-glow" : ""}`}
            >
              <Scale className="w-4 h-4" />
              {compareMode ? "Exit Compare" : "Compare Schemes"}
            </Button>
          </div>

          {/* Compare Mode Instructions */}
          <AnimatePresence>
            {compareMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Scale className="w-5 h-5 text-primary" />
                    <span className="text-sm">
                      Select 2-3 schemes to compare • <strong>{selectedForCompare.length}/3</strong> selected
                    </span>
                  </div>
                  {selectedForCompare.length >= 2 && (
                    <Button
                      size="sm"
                      onClick={startComparison}
                      className="btn-primary-glow rounded-xl gap-2"
                    >
                      Compare Now
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading schemes...</span>
            </div>
          )}

          {/* Results Grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchemes.map((scheme, index) => (
                <motion.div
                  key={scheme.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`glass-card-hover p-6 flex flex-col relative ${
                    compareMode && selectedForCompare.includes(scheme.scheme_id) 
                      ? "ring-2 ring-primary" 
                      : ""
                  }`}
                >
                  {/* Compare Checkbox */}
                  {compareMode && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3"
                    >
                      <button
                        onClick={() => toggleSchemeForCompare(scheme.scheme_id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          selectedForCompare.includes(scheme.scheme_id)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        {selectedForCompare.includes(scheme.scheme_id) ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </button>
                    </motion.div>
                  )}

                  <div className="flex items-start justify-between mb-3">
                    <span className={`${getCategoryColor(scheme.category)} px-3 py-1 rounded-full text-xs font-medium`}>
                      {scheme.category}
                    </span>
                    {scheme.interest_rate && scheme.interest_rate > 7 && !compareMode && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-serif text-xl font-semibold mb-2">{scheme.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
                    {scheme.short_description || scheme.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Interest:</span>
                      <span className="font-medium">
                        {scheme.interest_rate ? `${scheme.interest_rate}%` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {scheme.online_apply ? (
                        <Globe className="w-4 h-4 text-teal" />
                      ) : (
                        <MapPin className="w-4 h-4 text-accent-foreground" />
                      )}
                      <span className="text-muted-foreground">Apply:</span>
                      <span className="font-medium">
                        {scheme.online_apply ? "Online Available" : "Visit Branch"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Link to={`/schemes/${scheme.scheme_id}`} className="flex-1">
                      <Button variant="outline" className="w-full rounded-xl gap-2">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    {scheme.online_apply && scheme.official_link && !compareMode && (
                      <Button variant="ghost" size="icon" className="rounded-xl" asChild>
                        <a href={scheme.official_link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && filteredSchemes.length === 0 && (
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

      {/* Comparison Panel */}
      <AnimatePresence>
        {showComparePanel && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="py-12 bg-muted/30"
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold">Scheme Comparison</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowComparePanel(false);
                    setSelectedForCompare([]);
                  }}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Close
                </Button>
              </div>
              <SchemeCompare initialSchemes={selectedForCompare} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Floating Compare Bar */}
      <AnimatePresence>
        {compareMode && selectedForCompare.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="glass-card px-6 py-4 flex items-center gap-4 shadow-lg">
              <div className="flex -space-x-2">
                {selectedForCompare.map((id) => {
                  const scheme = schemes.find(s => s.scheme_id === id);
                  return (
                    <div
                      key={id}
                      className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center"
                    >
                      <span className="text-xs font-bold text-primary">
                        {scheme?.name.charAt(0)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <span className="text-sm font-medium">
                {selectedForCompare.length} scheme{selectedForCompare.length !== 1 ? 's' : ''} selected
              </span>
              <Button
                size="sm"
                onClick={startComparison}
                disabled={selectedForCompare.length < 2}
                className="btn-primary-glow rounded-xl"
              >
                Compare
              </Button>
              <button
                onClick={() => setSelectedForCompare([])}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Schemes;
