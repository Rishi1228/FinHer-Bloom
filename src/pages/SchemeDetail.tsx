import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, MapPin, Star, Heart, Share2, Bell, CheckCircle2, IndianRupee, Percent, Calendar, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EligibilityChecker from "@/components/scheme/EligibilityChecker";
import DocumentChecklist from "@/components/scheme/DocumentChecklist";
import ApplicationSteps from "@/components/scheme/ApplicationSteps";
import EarningsCalculator from "@/components/scheme/EarningsCalculator";
import { useSchemeById, convertToSchemeDetails } from "@/hooks/useSchemes";

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Savings: "badge-lavender",
    Entrepreneurship: "badge-peach",
    Maternity: "badge-teal",
    Pension: "badge-gold",
    Education: "bg-primary/10 text-primary",
    Insurance: "bg-teal/10 text-teal",
  };
  return colors[category] || "bg-muted text-muted-foreground";
};

const SchemeDetail = () => {
  const { schemeId } = useParams<{ schemeId: string }>();
  const { data: schemeFromDB, isLoading } = useSchemeById(schemeId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-16 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading scheme details...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!schemeFromDB) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Scheme Not Found</h1>
          <p className="text-muted-foreground mb-8">The scheme you're looking for doesn't exist.</p>
          <Link to="/schemes">
            <Button className="btn-primary-glow rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Schemes
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Convert to legacy format for existing components
  const scheme = convertToSchemeDetails(schemeFromDB);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(0)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-28 pb-12 gradient-warm">
        <div className="container mx-auto px-4">
          <Link to="/schemes" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to all schemes
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className={`${getCategoryColor(scheme.category)} px-3 py-1 rounded-full text-sm font-medium`}>
                    {scheme.category}
                  </span>
                  {scheme.popular && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <Star className="w-3 h-3 mr-1" /> Popular
                    </Badge>
                  )}
                  {scheme.online && (
                    <Badge variant="outline" className="border-teal text-teal">
                      <Globe className="w-3 h-3 mr-1" /> Online Available
                    </Badge>
                  )}
                </div>

                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{scheme.name}</h1>
                <p className="text-lg text-muted-foreground mb-6">{scheme.overview}</p>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="rounded-xl gap-2">
                    <Heart className="w-4 h-4" /> Save
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl gap-2">
                    <Share2 className="w-4 h-4" /> Share
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl gap-2">
                    <Bell className="w-4 h-4" /> Set Reminder
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Quick Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h3 className="font-semibold mb-4">Quick Overview</h3>
              <div className="space-y-4">
                {scheme.interestRate > 0 && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Percent className="w-5 h-5 text-primary" />
                      <span className="text-sm">Interest Rate</span>
                    </div>
                    <span className="font-bold text-primary">{scheme.interestRate}%</span>
                  </div>
                )}
                {scheme.minInvestment > 0 && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-teal" />
                      <span className="text-sm">Min Investment</span>
                    </div>
                    <span className="font-bold">{formatCurrency(scheme.minInvestment)}</span>
                  </div>
                )}
                {scheme.maxInvestment > 0 && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-secondary-foreground" />
                      <span className="text-sm">Max Investment</span>
                    </div>
                    <span className="font-bold">{formatCurrency(scheme.maxInvestment)}</span>
                  </div>
                )}
                {schemeFromDB.tenure && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-accent-foreground" />
                      <span className="text-sm">Tenure</span>
                    </div>
                    <span className="font-bold">{schemeFromDB.tenure}</span>
                  </div>
                )}
              </div>

              {scheme.online && scheme.onlineLink && (
                <Button asChild className="w-full mt-4 btn-primary-glow rounded-xl">
                  <a href={scheme.onlineLink} target="_blank" rel="noopener noreferrer">
                    Apply Now <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-xl font-semibold mb-4">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {scheme.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-2 p-3 rounded-xl bg-teal/5"
              >
                <CheckCircle2 className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                <span className="text-sm">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <EligibilityChecker scheme={scheme} />
              <DocumentChecklist scheme={scheme} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <ApplicationSteps scheme={scheme} />
              {scheme.interestRate > 0 && <EarningsCalculator scheme={scheme} />}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SchemeDetail;
