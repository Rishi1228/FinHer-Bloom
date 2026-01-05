import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Scale, CheckCircle2, XCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllSchemes, type SchemeDetails } from "@/data/schemes";

interface SchemeCompareProps {
  initialSchemes?: string[];
}

const SchemeCompare = ({ initialSchemes = [] }: SchemeCompareProps) => {
  const [selectedSchemes, setSelectedSchemes] = useState<SchemeDetails[]>(
    initialSchemes.map(id => getAllSchemes().find(s => s.id === id)).filter(Boolean) as SchemeDetails[]
  );
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const allSchemes = getAllSchemes();

  const addScheme = (scheme: SchemeDetails) => {
    if (selectedSchemes.length < 3 && !selectedSchemes.find(s => s.id === scheme.id)) {
      setSelectedSchemes([...selectedSchemes, scheme]);
    }
    setIsSelectOpen(false);
  };

  const removeScheme = (schemeId: string) => {
    setSelectedSchemes(selectedSchemes.filter(s => s.id !== schemeId));
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Savings: "badge-lavender",
      Entrepreneurship: "badge-peach",
      Maternity: "badge-teal",
      Pension: "badge-gold",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  const comparisonRows = [
    { 
      label: "Category", 
      getValue: (s: SchemeDetails) => (
        <span className={`${getCategoryColor(s.category)} px-2 py-1 rounded-full text-xs`}>
          {s.category}
        </span>
      )
    },
    { 
      label: "Interest Rate", 
      getValue: (s: SchemeDetails) => (
        <span className="font-bold text-primary text-lg">{s.interestRate}%</span>
      ),
      highlight: true
    },
    { 
      label: "Min Investment", 
      getValue: (s: SchemeDetails) => formatCurrency(s.minInvestment)
    },
    { 
      label: "Max Investment", 
      getValue: (s: SchemeDetails) => formatCurrency(s.maxInvestment)
    },
    { 
      label: "Tenure", 
      getValue: (s: SchemeDetails) => s.tenure.min === s.tenure.max 
        ? `${s.tenure.min} years` 
        : `${s.tenure.min}-${s.tenure.max} years`
    },
    { 
      label: "Online Application", 
      getValue: (s: SchemeDetails) => s.online ? (
        <CheckCircle2 className="w-5 h-5 text-teal mx-auto" />
      ) : (
        <XCircle className="w-5 h-5 text-muted-foreground mx-auto" />
      )
    },
    { 
      label: "Age Eligibility", 
      getValue: (s: SchemeDetails) => (
        <span className="text-sm">{s.eligibility.age || "Any age"}</span>
      )
    },
    { 
      label: "Documents Required", 
      getValue: (s: SchemeDetails) => (
        <span className="text-sm">{s.documents.filter(d => d.required).length} required</span>
      )
    },
    { 
      label: "Application Steps", 
      getValue: (s: SchemeDetails) => (
        <span className="text-sm">{s.applicationSteps.length} steps</span>
      )
    },
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary" />
          Compare Schemes
        </h3>
        <span className="text-sm text-muted-foreground">
          Select up to 3 schemes
        </span>
      </div>

      {/* Selected Schemes Header */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="font-medium text-muted-foreground text-sm">Features</div>
        
        {selectedSchemes.map((scheme) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            <div className="glass-card p-3 text-center">
              <button
                onClick={() => removeScheme(scheme.id)}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:scale-110 transition-transform"
              >
                <X className="w-3 h-3" />
              </button>
              <h4 className="font-semibold text-sm leading-tight">{scheme.name}</h4>
            </div>
          </motion.div>
        ))}

        {/* Add Scheme Button */}
        {selectedSchemes.length < 3 && (
          <Dialog open={isSelectOpen} onOpenChange={setIsSelectOpen}>
            <DialogTrigger asChild>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all min-h-[80px]"
              >
                <Plus className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Add Scheme</span>
              </motion.button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Select a Scheme to Compare</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[400px] pr-4">
                <div className="space-y-2">
                  {allSchemes
                    .filter(s => !selectedSchemes.find(sel => sel.id === s.id))
                    .map((scheme) => (
                      <button
                        key={scheme.id}
                        onClick={() => addScheme(scheme)}
                        className="w-full p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className={`${getCategoryColor(scheme.category)} px-2 py-0.5 rounded-full text-xs`}>
                              {scheme.category}
                            </span>
                            <h4 className="font-medium mt-1">{scheme.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {scheme.interestRate}% interest • {formatCurrency(scheme.minInvestment)} min
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </button>
                    ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        )}

        {/* Empty slots */}
        {Array.from({ length: Math.max(0, 2 - selectedSchemes.length) }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-3 min-h-[80px]"
          />
        ))}
      </div>

      {/* Comparison Table */}
      {selectedSchemes.length > 0 ? (
        <div className="space-y-1">
          {comparisonRows.map((row, index) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`grid grid-cols-4 gap-4 p-3 rounded-xl ${
                row.highlight ? "bg-primary/5" : index % 2 === 0 ? "bg-muted/30" : ""
              }`}
            >
              <div className="text-sm font-medium text-muted-foreground flex items-center">
                {row.label}
              </div>
              {selectedSchemes.map((scheme) => (
                <div key={scheme.id} className="text-center flex items-center justify-center">
                  {row.getValue(scheme)}
                </div>
              ))}
              {/* Empty cells for alignment */}
              {Array.from({ length: 3 - selectedSchemes.length }).map((_, i) => (
                <div key={`empty-cell-${i}`} className="text-center text-muted-foreground">
                  —
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <Scale className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>Select schemes above to start comparing</p>
        </div>
      )}

      {/* Recommendation */}
      {selectedSchemes.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl gradient-warm"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold mb-1">Quick Insight</h4>
              <p className="text-sm text-muted-foreground">
                {(() => {
                  const highest = selectedSchemes.reduce((a, b) => a.interestRate > b.interestRate ? a : b);
                  const lowest = selectedSchemes.reduce((a, b) => a.minInvestment < b.minInvestment ? a : b);
                  return `${highest.name} offers the highest interest rate at ${highest.interestRate}%. ${lowest.name} has the lowest entry point at ${formatCurrency(lowest.minInvestment)}.`;
                })()}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SchemeCompare;
