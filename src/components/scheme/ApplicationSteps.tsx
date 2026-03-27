import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, ArrowRight, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SchemeDetails } from "@/hooks/useSchemes";

interface ApplicationStepsProps {
  scheme: SchemeDetails;
}

const ApplicationSteps = ({ scheme }: ApplicationStepsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <h3 className="font-serif text-xl font-semibold mb-6 flex items-center gap-2">
        <ArrowRight className="w-5 h-5 text-primary" />
        Step-by-Step Application Guide
      </h3>

      {/* Application Mode */}
      <div className="flex gap-4 mb-8">
        {scheme.online && (
          <div className="flex-1 p-4 rounded-xl bg-teal/10 border border-teal/30">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-teal" />
              <span className="font-medium">Online Application</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Apply from the comfort of your home
            </p>
            {scheme.onlineLink && (
              <Button asChild size="sm" className="btn-primary-glow w-full rounded-xl">
                <a href={scheme.onlineLink} target="_blank" rel="noopener noreferrer">
                  Apply Online
                </a>
              </Button>
            )}
          </div>
        )}
        
        {scheme.offlineLocations && scheme.offlineLocations.length > 0 && (
          <div className="flex-1 p-4 rounded-xl bg-secondary/50 border border-secondary">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-secondary-foreground" />
              <span className="font-medium">Visit in Person</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Available at:
            </p>
            <div className="flex flex-wrap gap-1">
              {scheme.offlineLocations.slice(0, 3).map((loc) => (
                <span key={loc} className="text-xs badge-lavender">
                  {loc}
                </span>
              ))}
              {scheme.offlineLocations.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{scheme.offlineLocations.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Timeline Steps */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-lavender to-teal" />

        <div className="space-y-6">
          {scheme.applicationSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex gap-4"
            >
              {/* Step Number Circle */}
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-primary shadow-md">
                <span className="font-serif font-bold text-primary">{step.step}</span>
              </div>

              {/* Step Content */}
              <div className="flex-1 pb-6">
                <div className="glass-card p-4 hover:bg-white/90 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{step.title}</h4>
                    {step.duration && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {step.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Estimated Total Time */}
      <div className="mt-6 p-4 rounded-xl bg-muted/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm">
            <strong>Estimated total time:</strong>{" "}
            {scheme.applicationSteps.some(s => s.duration?.includes("week"))
              ? "2-4 weeks"
              : "1-3 days"}
          </span>
        </div>
        <Button variant="outline" size="sm" className="rounded-xl">
          Download Guide PDF
        </Button>
      </div>
    </motion.div>
  );
};

export default ApplicationSteps;
