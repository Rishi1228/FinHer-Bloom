import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Calculator = () => {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("8.2");
  const [years, setYears] = useState("5");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    if (isNaN(p) || isNaN(r) || isNaN(t)) return;
    const amount = p * Math.pow(1 + r, t);
    setResult(amount);
  };

  return (
    <PageLayout
      title="Savings Calculator"
      subtitle="Estimate how your savings can grow with compound interest."
    >
      <Card className="p-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <div>
            <Label htmlFor="principal">Initial Amount (₹)</Label>
            <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="rate">Interest Rate (% per year)</Label>
            <Input id="rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="years">Duration (years)</Label>
            <Input id="years" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          {result !== null && (
            <div className="mt-6 p-4 rounded-lg bg-primary/10 text-center">
              <p className="text-sm text-muted-foreground">Estimated Future Value</p>
              <p className="text-3xl font-bold text-primary">
                ₹{result.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </p>
            </div>
          )}
        </div>
      </Card>
    </PageLayout>
  );
};

export default Calculator;
