import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, IndianRupee, Calendar, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { SchemeDetails } from "@/hooks/useSchemes";

interface EarningsCalculatorProps {
  scheme: SchemeDetails;
}

interface YearlyData {
  year: number;
  principal: number;
  interest: number;
  total: number;
}

const EarningsCalculator = ({ scheme }: EarningsCalculatorProps) => {
  const [investment, setInvestment] = useState(scheme.minInvestment);
  const [tenure, setTenure] = useState(scheme.tenure.min);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const calculations = useMemo(() => {
    const rate = scheme.interestRate / 100;
    const yearlyData: YearlyData[] = [];
    
    let totalPrincipal = 0;
    let totalAmount = 0;

    // Calculate year by year (assuming yearly contribution)
    for (let year = 1; year <= tenure; year++) {
      totalPrincipal += investment;
      // Compound interest calculation
      totalAmount = (totalAmount + investment) * (1 + rate);
      
      yearlyData.push({
        year,
        principal: totalPrincipal,
        interest: totalAmount - totalPrincipal,
        total: totalAmount
      });
    }

    const totalInterest = totalAmount - totalPrincipal;
    const maturityAmount = totalAmount;
    const effectiveReturn = ((maturityAmount - totalPrincipal) / totalPrincipal) * 100;

    return {
      yearlyData,
      totalPrincipal,
      totalInterest,
      maturityAmount,
      effectiveReturn
    };
  }, [investment, tenure, scheme.interestRate]);

  const maxBarHeight = Math.max(...calculations.yearlyData.map(d => d.total));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <h3 className="font-serif text-xl font-semibold mb-6 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-primary" />
        Earnings Calculator
      </h3>

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <Label className="text-sm font-medium mb-2 flex items-center gap-2">
            <IndianRupee className="w-4 h-4" />
            Yearly Investment
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-3 h-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Amount you'll invest each year
              </TooltipContent>
            </Tooltip>
          </Label>
          <Input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Math.max(scheme.minInvestment, Math.min(scheme.maxInvestment, parseInt(e.target.value) || scheme.minInvestment)))}
            className="rounded-xl mb-2"
          />
          <Slider
            value={[investment]}
            onValueChange={(v) => setInvestment(v[0])}
            min={scheme.minInvestment}
            max={scheme.maxInvestment}
            step={scheme.minInvestment < 1000 ? 100 : 1000}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Min: {formatCurrency(scheme.minInvestment)}</span>
            <span>Max: {formatCurrency(scheme.maxInvestment)}</span>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Investment Period (Years)
          </Label>
          <div className="text-2xl font-bold text-primary mb-2">{tenure} years</div>
          <Slider
            value={[tenure]}
            onValueChange={(v) => setTenure(v[0])}
            min={scheme.tenure.min}
            max={scheme.tenure.max}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{scheme.tenure.min} years</span>
            <span>{scheme.tenure.max} years</span>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-muted/50 text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Investment</p>
          <p className="font-bold text-lg">{formatCurrency(calculations.totalPrincipal)}</p>
        </div>
        <div className="p-4 rounded-xl bg-teal/10 text-center">
          <p className="text-xs text-muted-foreground mb-1">Interest Earned</p>
          <p className="font-bold text-lg text-teal">{formatCurrency(calculations.totalInterest)}</p>
        </div>
        <div className="p-4 rounded-xl gradient-warm text-center">
          <p className="text-xs text-muted-foreground mb-1">Maturity Amount</p>
          <p className="font-bold text-xl text-primary">{formatCurrency(calculations.maturityAmount)}</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/50 text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Returns</p>
          <p className="font-bold text-lg text-secondary-foreground">
            {calculations.effectiveReturn.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Year-by-Year Timeline Chart */}
      <div className="mb-4">
        <h4 className="font-medium text-sm mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Year-by-Year Growth Timeline
        </h4>
        
        <div className="relative">
          {/* Chart */}
          <div className="flex items-end gap-1 h-48 mb-2">
            {calculations.yearlyData.map((data, index) => {
              const principalHeight = (data.principal / maxBarHeight) * 100;
              const interestHeight = (data.interest / maxBarHeight) * 100;
              
              return (
                <Tooltip key={data.year}>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="flex-1 flex flex-col justify-end cursor-pointer group"
                    >
                      <div
                        className="bg-teal/60 rounded-t transition-all group-hover:bg-teal"
                        style={{ height: `${interestHeight}%` }}
                      />
                      <div
                        className="bg-primary/70 transition-all group-hover:bg-primary"
                        style={{ height: `${principalHeight}%` }}
                      />
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm">
                      <p className="font-semibold">Year {data.year}</p>
                      <p>Principal: {formatCurrency(data.principal)}</p>
                      <p>Interest: {formatCurrency(data.interest)}</p>
                      <p className="font-bold">Total: {formatCurrency(data.total)}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>

          {/* X-Axis Labels */}
          <div className="flex gap-1">
            {calculations.yearlyData.map((data) => (
              <div key={data.year} className="flex-1 text-center">
                <span className="text-xs text-muted-foreground">
                  {data.year % Math.ceil(tenure / 10) === 0 || data.year === 1 || data.year === tenure
                    ? `Y${data.year}`
                    : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary/70" />
            <span className="text-sm text-muted-foreground">Principal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-teal/60" />
            <span className="text-sm text-muted-foreground">Interest Earned</span>
          </div>
        </div>
      </div>

      {/* Key Milestones */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-teal/5 border border-primary/10">
        <h4 className="font-medium text-sm mb-3">Key Milestones</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { year: Math.ceil(tenure / 4), label: "25%" },
            { year: Math.ceil(tenure / 2), label: "50%" },
            { year: tenure, label: "Maturity" }
          ].map(({ year, label }) => {
            const data = calculations.yearlyData[Math.min(year - 1, calculations.yearlyData.length - 1)];
            return (
              <div key={label}>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-semibold text-sm">{formatCurrency(data?.total || 0)}</p>
                <p className="text-xs text-teal">Year {year}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default EarningsCalculator;
