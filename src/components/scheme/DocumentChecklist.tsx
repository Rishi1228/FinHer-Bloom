import { useState } from "react";
import { motion } from "framer-motion";
import { FileCheck, FileX, CheckCircle2, AlertCircle, Upload, Sparkles } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { SchemeDetails } from "@/data/schemes";

interface DocumentChecklistProps {
  scheme: SchemeDetails;
}

const DocumentChecklist = ({ scheme }: DocumentChecklistProps) => {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const requiredDocs = scheme.documents.filter(d => d.required);
  const optionalDocs = scheme.documents.filter(d => !d.required);
  
  const checkedCount = Object.values(checkedDocs).filter(Boolean).length;
  const requiredCheckedCount = requiredDocs.filter(d => checkedDocs[d.name]).length;
  const progress = (checkedCount / scheme.documents.length) * 100;
  const allRequiredChecked = requiredDocs.every(d => checkedDocs[d.name]);

  const toggleDoc = (docName: string) => {
    setCheckedDocs(prev => ({ ...prev, [docName]: !prev[docName] }));
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
        <div>
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

      {/* AI Verification CTA */}
      <div className="mt-6 p-4 rounded-xl gradient-warm">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium flex items-center gap-2">
              <Upload className="w-4 h-4" />
              AI Document Verification
            </h4>
            <p className="text-sm text-muted-foreground">
              Upload documents to check completeness and format
            </p>
          </div>
          <Button variant="outline" className="rounded-xl">
            Coming Soon
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentChecklist;
