import { motion } from "framer-motion";
import { ArrowRight, Wallet, GraduationCap, Baby, Landmark, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const schemeCategories = [
  {
    icon: Wallet,
    name: "Savings",
    count: 12,
    color: "primary",
    schemes: ["Sukanya Samriddhi Yojana", "Mahila Samman Savings"],
  },
  {
    icon: GraduationCap,
    name: "Education",
    count: 8,
    color: "lavender",
    schemes: ["CBSE Udaan Scheme", "Post-Matric Scholarship"],
  },
  {
    icon: Briefcase,
    name: "Entrepreneurship",
    count: 15,
    color: "peach",
    schemes: ["Mudra Yojana", "Stand Up India"],
  },
  {
    icon: Baby,
    name: "Maternity",
    count: 6,
    color: "teal",
    schemes: ["Matritva Vandana Yojana", "Janani Suraksha"],
  },
  {
    icon: Landmark,
    name: "Pension",
    count: 4,
    color: "gold",
    schemes: ["Atal Pension Yojana", "NPS Vatsalya"],
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; border: string; icon: string }> = {
    primary: { bg: "bg-primary/10", border: "border-primary/20", icon: "text-primary" },
    lavender: { bg: "bg-secondary", border: "border-secondary-foreground/10", icon: "text-secondary-foreground" },
    peach: { bg: "bg-accent", border: "border-accent-foreground/10", icon: "text-accent-foreground" },
    teal: { bg: "bg-teal/20", border: "border-teal/30", icon: "text-teal" },
    gold: { bg: "bg-gold/20", border: "border-gold/30", icon: "text-gold" },
  };
  return colors[color] || colors.primary;
};

const SchemesPreview = () => {
  return (
    <section className="py-24 gradient-warm">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="badge-gold inline-block mb-4"
            >
              Government Schemes
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl font-bold"
            >
              Schemes Designed <span className="text-gradient">For You</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/schemes">
              <Button className="btn-primary-glow gap-2 group">
                View All Schemes
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {schemeCategories.map((category, index) => {
            const colorClasses = getColorClasses(category.color);
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card-hover p-5 border ${colorClasses.border}`}
              >
                <div
                  className={`w-10 h-10 rounded-lg ${colorClasses.bg} flex items-center justify-center mb-3`}
                >
                  <category.icon className={`w-5 h-5 ${colorClasses.icon}`} />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {category.count} schemes available
                </p>
                <div className="space-y-1">
                  {category.schemes.map((scheme) => (
                    <p key={scheme} className="text-xs text-muted-foreground truncate">
                      • {scheme}
                    </p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 glass-card p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-gradient">45+</p>
            <p className="text-sm text-muted-foreground mt-1">Active Schemes</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-gradient">₹2.5Cr+</p>
            <p className="text-sm text-muted-foreground mt-1">Benefits Disbursed</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-gradient">50K+</p>
            <p className="text-sm text-muted-foreground mt-1">Women Helped</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-gradient">28</p>
            <p className="text-sm text-muted-foreground mt-1">States Covered</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SchemesPreview;
