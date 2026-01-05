import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck, FileX, CheckCircle2, AlertCircle, Upload, Sparkles, Loader2, XCircle, AlertTriangle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { SchemeDetails } from "@/data/schemes";

interface DocumentChecklistProps {
  scheme: SchemeDetails;
}

interface VerificationResult {
  overallStatus: "ready" | "partial" | "not_ready";
  readinessScore: number;
  summary: string;
  documentChecks: {
    documentName: string;
    status: "verified" | "missing" | "needs_review";
    message: string;
  }[];
  missingDocuments: string[];
  tips: string[];
  warnings: string[];
}

const DocumentChecklist = ({ scheme }: DocumentChecklistProps) => {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const { toast } = useToast();

  const requiredDocs = scheme.documents.filter(d => d.required);
  const optionalDocs = scheme.documents.filter(d => !d.required);
  
  const checkedCount = Object.values(checkedDocs).filter(Boolean).length;
  const requiredCheckedCount = requiredDocs.filter(d => checkedDocs[d.name]).length;
  const progress = (checkedCount / scheme.documents.length) * 100;
  const allRequiredChecked = requiredDocs.every(d => checkedDocs[d.name]);

  const toggleDoc = (docName: string) => {
    setCheckedDocs(prev => ({ ...prev, [docName]: !prev[docName] }));
    setVerificationResult(null); // Reset verification when documents change
  };

  const verifyDocuments = async () => {
    const checkedDocNames = Object.entries(checkedDocs)
      .filter(([_, checked]) => checked)
      .map(([name]) => name);

    if (checkedDocNames.length === 0) {
      toast({
        title: "No documents selected",
        description: "Please select at least one document to verify.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('verify-documents', {
        body: {
          documents: checkedDocNames,
          schemeName: scheme.name,
          schemeRequirements: scheme.documents.map(d => ({
            name: d.name,
            required: d.required,
            description: d.description
          }))
        }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setVerificationResult(data);
      
      toast({
        title: "Verification Complete",
        description: data.summary,
      });
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Failed to verify documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="w-4 h-4 text-teal" />;
      case "missing":
        return <XCircle className="w-4 h-4 text-destructive" />;
      case "needs_review":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-teal/20 border-teal/30 text-teal";
      case "partial":
        return "bg-amber-100 border-amber-200 text-amber-800";
      case "not_ready":
        return "bg-destructive/10 border-destructive/30 text-destructive";
      default:
        return "bg-muted border-border";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-primary" />
          Document Checklist
        </h3>
        <span className="text-sm text-muted-foreground">
          {checkedCount}/{scheme.documents.length} ready
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{requiredCheckedCount}/{requiredDocs.length} required documents</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </div>

      {/* Status Banner */}
      {allRequiredChecked ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 rounded-xl bg-teal/20 border border-teal/30 mb-6"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal" />
            <span className="font-medium text-teal-foreground">All required documents ready! You can apply now.</span>
          </div>
        </motion.div>
      ) : (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 mb-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <span className="font-medium text-amber-800">
              {requiredDocs.length - requiredCheckedCount} required document(s) still needed
            </span>
          </div>
        </div>
      )}

      {/* Required Documents */}
      <div className="mb-6">
        <h4 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wide">
          Required Documents
        </h4>
        <div className="space-y-3">
          {requiredDocs.map((doc, index) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                checkedDocs[doc.name]
                  ? "bg-teal/10 border-teal/30"
                  : "bg-muted/30 border-border hover:bg-muted/50"
              }`}
              onClick={() => toggleDoc(doc.name)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={checkedDocs[doc.name] || false}
                  onCheckedChange={() => toggleDoc(doc.name)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {checkedDocs[doc.name] ? (
                      <CheckCircle2 className="w-4 h-4 text-teal" />
                    ) : (
                      <FileX className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className={`font-medium ${checkedDocs[doc.name] ? "text-teal-foreground" : ""}`}>
                      {doc.name}
                    </span>
                    <span className="badge-peach text-xs">Required</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Optional Documents */}
      {optionalDocs.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wide">
            Optional Documents
          </h4>
          <div className="space-y-3">
            {optionalDocs.map((doc, index) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (requiredDocs.length + index) * 0.05 }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  checkedDocs[doc.name]
                    ? "bg-secondary/50 border-secondary"
                    : "bg-muted/30 border-border hover:bg-muted/50"
                }`}
                onClick={() => toggleDoc(doc.name)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={checkedDocs[doc.name] || false}
                    onCheckedChange={() => toggleDoc(doc.name)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {checkedDocs[doc.name] ? (
                        <CheckCircle2 className="w-4 h-4 text-secondary-foreground" />
                      ) : (
                        <FileX className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="font-medium">{doc.name}</span>
                      <span className="badge-lavender text-xs">Optional</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* AI Verification Button */}
      <div className="p-4 rounded-xl gradient-warm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI Document Verification
            </h4>
            <p className="text-sm text-muted-foreground">
              Get instant AI-powered verification of your documents
            </p>
          </div>
        </div>
        <Button 
          onClick={verifyDocuments}
          disabled={isVerifying || checkedCount === 0}
          className="w-full btn-primary-glow rounded-xl gap-2"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing Documents...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Verify My Documents
            </>
          )}
        </Button>
      </div>

      {/* Verification Results */}
      <AnimatePresence>
        {verificationResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 space-y-4"
          >
            {/* Overall Status */}
            <div className={`p-4 rounded-xl border ${getStatusColor(verificationResult.overallStatus)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {verificationResult.overallStatus === "ready" && <CheckCircle2 className="w-5 h-5" />}
                  {verificationResult.overallStatus === "partial" && <AlertTriangle className="w-5 h-5" />}
                  {verificationResult.overallStatus === "not_ready" && <XCircle className="w-5 h-5" />}
                  <span className="font-semibold capitalize">
                    {verificationResult.overallStatus === "ready" && "Ready to Apply!"}
                    {verificationResult.overallStatus === "partial" && "Almost Ready"}
                    {verificationResult.overallStatus === "not_ready" && "More Documents Needed"}
                  </span>
                </div>
                <span className="text-2xl font-bold">{verificationResult.readinessScore}%</span>
              </div>
              <p className="text-sm">{verificationResult.summary}</p>
            </div>

            {/* Document Checks */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Document Status</h4>
              {verificationResult.documentChecks.map((check, index) => (
                <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-muted/30">
                  {getStatusIcon(check.status)}
                  <div className="flex-1">
                    <span className="font-medium text-sm">{check.documentName}</span>
                    <p className="text-xs text-muted-foreground">{check.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Missing Documents */}
            {verificationResult.missingDocuments.length > 0 && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                <h4 className="font-medium text-sm text-destructive mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Missing Documents
                </h4>
                <ul className="list-disc list-inside text-sm text-destructive/80 space-y-1">
                  {verificationResult.missingDocuments.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips */}
            {verificationResult.tips.length > 0 && (
              <div className="p-3 rounded-xl bg-teal/10 border border-teal/20">
                <h4 className="font-medium text-sm text-teal mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Helpful Tips
                </h4>
                <ul className="list-disc list-inside text-sm text-teal-foreground space-y-1">
                  {verificationResult.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {verificationResult.warnings.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <h4 className="font-medium text-sm text-amber-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Important Notes
                </h4>
                <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                  {verificationResult.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DocumentChecklist;
