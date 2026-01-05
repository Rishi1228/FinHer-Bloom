import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-warm" />
      
      {/* Decorative Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-30"
        style={{ background: "hsl(340 65% 70%)" }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20"
        style={{ background: "hsl(270 50% 75%)" }}
        animate={{
          scale: [1.2, 1, 1.2],
          y: [0, -40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full opacity-25"
        style={{ background: "hsl(25 85% 80%)" }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 badge-lavender mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Trusted by 50,000+ Women Across India
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Empowering Women Through{" "}
            <span className="text-gradient">Knowledge, Finance</span>
            {" "}& Community
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Discover government schemes tailored for you, learn smart money management, 
            and join a community of inspiring women building financial independence together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/schemes">
              <Button className="btn-primary-glow text-base px-8 py-6 gap-2 group">
                Explore Schemes
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/learn">
              <Button
                variant="outline"
                className="text-base px-8 py-6 rounded-xl border-2 hover:bg-secondary"
              >
                Start Learning
              </Button>
            </Link>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium">AI-Powered Guidance</span>
            </div>
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-secondary-foreground" />
              </div>
              <span className="text-sm font-medium">Financial Education</span>
            </div>
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Users className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium">Supportive Community</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
