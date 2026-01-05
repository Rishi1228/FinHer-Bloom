import { motion } from "framer-motion";
import { MessageCircle, Heart, Star, Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Entrepreneur, Mumbai",
    content: "Fin-Her helped me discover Mudra Yojana. I got ₹5 lakh for my boutique business. The step-by-step guidance was invaluable!",
    badge: "First Investment",
  },
  {
    name: "Anita Devi",
    role: "Teacher, Jaipur",
    content: "I enrolled my daughter in Sukanya Samriddhi. The earnings calculator showed me exactly how much she'll have for her education.",
    badge: "Super Saver",
  },
  {
    name: "Fatima Khan",
    role: "Homemaker, Delhi",
    content: "The community here is so supportive! I learned budgeting basics and now I manage our family finances confidently.",
    badge: "Community Star",
  },
];

const badges = [
  { icon: Star, name: "First Investment", color: "bg-gold/20 text-gold" },
  { icon: Trophy, name: "Finance Guru", color: "bg-primary/10 text-primary" },
  { icon: Heart, name: "Community Helper", color: "bg-accent text-accent-foreground" },
  { icon: Sparkles, name: "Quick Learner", color: "bg-secondary text-secondary-foreground" },
];

const CommunitySection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Community Info */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="badge-lavender inline-block mb-4"
            >
              Community & Rewards
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl font-bold mb-6"
            >
              Grow Together,{" "}
              <span className="text-gradient">Earn Together</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Join a thriving community of women sharing experiences, asking questions, 
              and celebrating each other's wins. Earn badges and rewards as you learn and contribute.
            </motion.p>

            {/* Badges Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {badges.map((badge) => (
                <div
                  key={badge.name}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full ${badge.color}`}
                >
                  <badge.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{badge.name}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/community">
                <Button className="btn-primary-glow gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Join the Community
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Testimonials */}
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="glass-card-hover p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center text-white font-serif font-bold flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <span className="badge-peach text-xs">{testimonial.badge}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {testimonial.role}
                    </p>
                    <p className="text-sm leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
