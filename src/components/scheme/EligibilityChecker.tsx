import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, User, Briefcase, Wallet, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SchemeDetails } from "@/data/schemes";

interface EligibilityCheckerProps {
  scheme: SchemeDetails;
}

interface EligibilityResult {
  eligible: boolean;
  checks: { label: string; passed: boolean; message: string }[];
}

const EligibilityChecker = ({ scheme }: EligibilityCheckerProps) => {
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [employment, setEmployment] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const checkEligibility = () => {
    const checks: { label: string; passed: boolean; message: string }[] = [];
    const ageNum = parseInt(age);

    // Age check
    if (scheme.eligibility.age) {
      const ageMatch = scheme.eligibility.age.match(/(\d+)/g);
      if (ageMatch) {
        if (scheme.eligibility.age.includes("below")) {
          const maxAge = parseInt(ageMatch[0]);
          checks.push({
            label: "Age Requirement",
            passed: ageNum < maxAge,
            message: ageNum < maxAge ? `You meet the age requirement (below ${maxAge} years)` : `Age must be below ${maxAge} years`
          });
        } else if (ageMatch.length === 2) {
          const minAge = parseInt(ageMatch[0]);
          const maxAge = parseInt(ageMatch[1]);
          checks.push({
            label: "Age Requirement",
            passed: ageNum >= minAge && ageNum <= maxAge,
            message: ageNum >= minAge && ageNum <= maxAge ? `You meet the age requirement (${minAge}-${maxAge} years)` : `Age must be between ${minAge} and ${maxAge} years`
          });
        } else {
          const minAge = parseInt(ageMatch[0]);
          checks.push({
            label: "Age Requirement",
            passed: ageNum >= minAge,
            message: ageNum >= minAge ? `You meet the minimum age requirement (${minAge}+ years)` : `Must be at least ${minAge} years old`
          });
        }
      }
    }

    // Income check (if applicable)
    if (scheme.eligibility.income && scheme.eligibility.income !== "No income limit" && scheme.eligibility.income !== "Not applicable") {
      checks.push({
        label: "Income Requirement",
        passed: true,
        message: scheme.eligibility.income
      });
    } else {
      checks.push({
        label: "Income Requirement",
        passed: true,
        message: "No income restrictions apply"
      });
    }

    // Employment check
    if (scheme.eligibility.employment && scheme.eligibility.employment !== "Not applicable") {
      const employmentMatch = employment.toLowerCase().includes("self") || 
                              employment.toLowerCase().includes("entrepreneur") ||
                              employment === "self-employed";
      checks.push({
        label: "Employment Status",
        passed: employment !== "" ? employmentMatch || scheme.eligibility.employment === "Not applicable" : false,
        message: employment !== "" ? `Status: ${employment}` : "Please select employment status"
      });
    }

    // General eligibility
    checks.push({
      label: "Residency",
      passed: true,
      message: "Must be an Indian resident"
    });

    const eligible = checks.every(c => c.passed);
    setResult({ eligible, checks });
    setShowResult(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <h3 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-primary" />
        Check Your Eligibility
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="age" className="text-sm font-medium mb-2 block">
            Your Age (years)
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div>
          <Label htmlFor="income" className="text-sm font-medium mb-2 block">
            Annual Income (₹)
          </Label>
          <Input
            id="income"
            type="number"
            placeholder="Enter annual income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">
            <Briefcase className="w-4 h-4 inline mr-1" />
            Employment Status
          </Label>
          <Select value={employment} onValueChange={setEmployment}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employed">Employed</SelectItem>
              <SelectItem value="self-employed">Self-Employed</SelectItem>
              <SelectItem value="homemaker">Homemaker</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">
            <Heart className="w-4 h-4 inline mr-1" />
            Marital Status
          </Label>
          <Select value={maritalStatus} onValueChange={setMaritalStatus}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        onClick={checkEligibility}
        className="w-full btn-primary-glow rounded-xl"
        disabled={!age}
      >
        Check Eligibility
      </Button>

      {showResult && result && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-6"
        >
          <div className={`p-4 rounded-xl mb-4 ${
            result.eligible 
              ? "bg-teal/20 border border-teal/30" 
              : "bg-destructive/10 border border-destructive/30"
          }`}>
            <div className="flex items-center gap-2">
              {result.eligible ? (
                <CheckCircle2 className="w-6 h-6 text-teal" />
              ) : (
                <XCircle className="w-6 h-6 text-destructive" />
              )}
              <span className="font-semibold">
                {result.eligible 
                  ? "You appear to be eligible for this scheme!" 
                  : "You may not meet all eligibility criteria"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {result.checks.map((check, index) => (
              <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50">
                {check.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <span className="font-medium text-sm">{check.label}</span>
                  <p className="text-xs text-muted-foreground">{check.message}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EligibilityChecker;
