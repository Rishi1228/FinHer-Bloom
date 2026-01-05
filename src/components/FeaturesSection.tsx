import { motion } from "framer-motion";
import { 
  FileSearch, 
  GraduationCap, 
  PiggyBank, 
  Users, 
  Award, 
  Bell,
  Calculator,
  Shield
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Smart Scheme Discovery",
    description: "AI-powered matching to find government schemes perfectly suited to your profile and needs.",
    color: "primary",
  },
  {
    icon: Shield,
    title: "Document Verification",
    description: "Upload and verify your documents instantly. Know exactly what you need before applying.",
    color: "lavender",
  },
  {
    icon: Calculator,
    title: "Earnings Calculator",
    description: "Visualize your returns with interactive calculators and year-by-year growth timelines.",
    color: "peach",
  },
  {
    icon: GraduationCap,
    title: "Financial Education",
    description: "Bite-sized courses on saving, investing, budgeting — all explained in simple language.",
    color: "teal",
  },
  {
    icon: PiggyBank,
    title: "Investment Tracking",
    description: "Track all your schemes and investments in one dashboard. Watch your wealth grow.",
    color: "gold",
  },
  {
    icon: Users,
    title: "Women's Community",
    description: "Connect with like-minded women. Share experiences, ask questions, grow together.",
    color: "primary",
  },
  {
    icon: Award,
    title: "Rewards & Badges",
    description: "Earn points for learning and participating. Unlock rewards from women-owned businesses.",
    color: "lavender",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Never miss a deadline. Get reminders for applications, renewals, and maturity dates.",
    color: "peach",
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; icon: string }> = {
    primary: { bg: "bg-primary/10", icon: "text-primary" },
    lavender: { bg: "bg-secondary", icon: "text-secondary-foreground" },
    peach: { bg: "bg-accent", icon: "text-accent-foreground" },
    teal: { bg: "bg-teal/20", icon: "text-teal" },
    gold: { bg: "bg-gold/20", icon: "text-gold" },
  };
  return colors[color] || colors.primary;
};

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge-peach inline-block mb-4"
          >
            Why Fin-Her?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl font-bold mb-4"
          >
            Everything You Need for{" "}
            <span className="text-gradient">Financial Freedom</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            From discovering schemes to tracking investments, we've got you covered at every step.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const colorClasses = getColorClasses(feature.color);
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-hover p-6"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${colorClasses.bg} flex items-center justify-center mb-4`}
                >
                  <feature.icon className={`w-6 h-6 ${colorClasses.icon}`} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
