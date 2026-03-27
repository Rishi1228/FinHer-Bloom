import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileCheck, FileX, CheckCircle2, AlertCircle, Upload, Sparkles, 
  Loader2, XCircle, AlertTriangle, Image, Trash2, Eye, FileImage 
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { SchemeDetails } from "@/hooks/useSchemes";

interface DocumentChecklistProps {
  scheme: SchemeDetails;
}

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  documentType: string;
  base64?: string;
}

interface DocumentAnalysis {
  fileName: string;
  detectedType: string;
  quality: "good" | "fair" | "poor";
  status: "verified" | "needs_review" | "rejected";
  feedback: string;
  extractedInfo?: string;
}

interface VerificationResult {
  overallStatus: "ready" | "partial" | "not_ready";
  readinessScore: number;
  summary: string;
  documentChecks: {
    documentName: string;
    status: "verified" | "missing" | "needs_review";
    message: string;
    isUploaded?: boolean;
  }[];
  uploadedDocumentAnalysis?: DocumentAnalysis[];
  missingDocuments: string[];
  tips: string[];
  warnings: string[];
}

const DocumentChecklist = ({ scheme }: DocumentChecklistProps) => {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [selectedDocType, setSelectedDocType] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const requiredDocs = scheme.documents.filter(d => d.required);
  const optionalDocs = scheme.documents.filter(d => !d.required);
  
  const checkedCount = Object.values(checkedDocs).filter(Boolean).length;
  const requiredCheckedCount = requiredDocs.filter(d => checkedDocs[d.name]).length;
  const progress = ((checkedCount + uploadedFiles.length) / (scheme.documents.length + uploadedFiles.length || 1)) * 100;
  const allRequiredChecked = requiredDocs.every(d => checkedDocs[d.name] || uploadedFiles.some(f => f.documentType === d.name));

  const toggleDoc = (docName: string) => {
    setCheckedDocs(prev => ({ ...prev, [docName]: !prev[docName] }));
    setVerificationResult(null);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image (JPEG, PNG, WebP) or PDF file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    // Create preview and base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = (event.target?.result as string)?.split(',')[1];
      
      const newFile: UploadedFile = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview: file.type.startsWith('image/') 
          ? URL.createObjectURL(file) 
          : '/placeholder.svg',
        documentType: selectedDocType || "Unspecified Document",
        base64
      };

      setUploadedFiles(prev => [...prev, newFile]);
      setVerificationResult(null);
      
      toast({
        title: "Document uploaded",
        description: `${file.name} has been added for verification.`,
      });
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setSelectedDocType("");
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => {
      const file = prev.find(f => f.id === fileId);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
    setVerificationResult(null);
  };

  const verifyDocuments = async () => {
    const checkedDocNames = Object.entries(checkedDocs)
      .filter(([_, checked]) => checked)
      .map(([name]) => name);

    if (checkedDocNames.length === 0 && uploadedFiles.length === 0) {
      toast({
        title: "No documents selected",
        description: "Please select or upload at least one document to verify.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      // Prepare uploaded files data for AI
      const uploadedFilesData = uploadedFiles.map(f => ({
        fileName: f.file.name,
        documentType: f.documentType,
        mimeType: f.file.type,
        base64: f.base64
      }));

      const { data, error } = await supabase.functions.invoke('verify-documents', {
        body: {
          documents: checkedDocNames,
          schemeName: scheme.name,
          schemeRequirements: scheme.documents.map(d => ({
            name: d.name,
            required: d.required,
            description: d.description
          })),
          uploadedFiles: uploadedFilesData
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

  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case "good":
        return "badge-teal";
      case "fair":
        return "badge-gold";
      case "poor":
        return "bg-destructive/20 text-destructive";
      default:
        return "badge-lavender";
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
          {checkedCount + uploadedFiles.length} documents ready
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{requiredCheckedCount}/{requiredDocs.length} required • {uploadedFiles.length} uploaded</span>
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

      {/* Document Upload Section */}
      <div className="mb-6 p-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5">
        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
          <Upload className="w-4 h-4 text-primary" />
          Upload Documents for AI Verification
        </h4>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {scheme.documents.map((doc) => (
            <button
              key={doc.name}
              onClick={() => {
                setSelectedDocType(doc.name);
                fileInputRef.current?.click();
              }}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                selectedDocType === doc.name
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary hover:bg-primary/5"
              }`}
            >
              <FileImage className="w-3 h-3 inline mr-1" />
              {doc.name}
            </button>
          ))}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={handleFileSelect}
          className="hidden"
        />

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedDocType("");
            fileInputRef.current?.click();
          }}
          className="w-full rounded-xl border-dashed"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Any Document
        </Button>
        
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Supports JPEG, PNG, WebP, PDF (max 5MB)
        </p>
      </div>

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wide">
            Uploaded Documents ({uploadedFiles.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {uploadedFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group rounded-xl border border-border overflow-hidden bg-muted/30"
              >
                <div className="aspect-[4/3] relative">
                  {file.file.type.startsWith('image/') ? (
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <FileImage className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                      className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-2">
                  <p className="text-xs font-medium truncate">{file.documentType}</p>
                  <p className="text-xs text-muted-foreground truncate">{file.file.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Required Documents */}
      <div className="mb-6">
        <h4 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wide">
          Required Documents
        </h4>
        <div className="space-y-3">
          {requiredDocs.map((doc, index) => {
            const hasUpload = uploadedFiles.some(f => f.documentType === doc.name);
            return (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  checkedDocs[doc.name] || hasUpload
                    ? "bg-teal/10 border-teal/30"
                    : "bg-muted/30 border-border hover:bg-muted/50"
                }`}
                onClick={() => toggleDoc(doc.name)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={checkedDocs[doc.name] || hasUpload}
                    onCheckedChange={() => toggleDoc(doc.name)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {checkedDocs[doc.name] || hasUpload ? (
                        <CheckCircle2 className="w-4 h-4 text-teal" />
                      ) : (
                        <FileX className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={`font-medium ${checkedDocs[doc.name] || hasUpload ? "text-teal-foreground" : ""}`}>
                        {doc.name}
                      </span>
                      <span className="badge-peach text-xs">Required</span>
                      {hasUpload && (
                        <span className="badge-teal text-xs flex items-center gap-1">
                          <Image className="w-3 h-3" /> Uploaded
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Optional Documents */}
      {optionalDocs.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wide">
            Optional Documents
          </h4>
          <div className="space-y-3">
            {optionalDocs.map((doc, index) => {
              const hasUpload = uploadedFiles.some(f => f.documentType === doc.name);
              return (
                <motion.div
                  key={doc.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (requiredDocs.length + index) * 0.05 }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    checkedDocs[doc.name] || hasUpload
                      ? "bg-secondary/50 border-secondary"
                      : "bg-muted/30 border-border hover:bg-muted/50"
                  }`}
                  onClick={() => toggleDoc(doc.name)}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={checkedDocs[doc.name] || hasUpload}
                      onCheckedChange={() => toggleDoc(doc.name)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {checkedDocs[doc.name] || hasUpload ? (
                          <CheckCircle2 className="w-4 h-4 text-secondary-foreground" />
                        ) : (
                          <FileX className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className="font-medium">{doc.name}</span>
                        <span className="badge-lavender text-xs">Optional</span>
                        {hasUpload && (
                          <span className="badge-teal text-xs flex items-center gap-1">
                            <Image className="w-3 h-3" /> Uploaded
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
              {uploadedFiles.length > 0 
                ? `Analyze ${uploadedFiles.length} uploaded document(s) with AI vision`
                : "Select or upload documents to verify"
              }
            </p>
          </div>
        </div>
        <Button 
          onClick={verifyDocuments}
          disabled={isVerifying || (checkedCount === 0 && uploadedFiles.length === 0)}
          className="w-full btn-primary-glow rounded-xl gap-2"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {uploadedFiles.length > 0 ? "Analyzing Documents with AI Vision..." : "Verifying..."}
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Verify Documents with AI
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

            {/* Uploaded Document Analysis */}
            {verificationResult.uploadedDocumentAnalysis && verificationResult.uploadedDocumentAnalysis.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  AI Document Analysis
                </h4>
                {verificationResult.uploadedDocumentAnalysis.map((analysis, index) => (
                  <div key={index} className="p-3 rounded-xl bg-muted/50 border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(analysis.status)}
                        <span className="font-medium text-sm">{analysis.fileName}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getQualityBadge(analysis.quality)}`}>
                        {analysis.quality} quality
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      <strong>Detected:</strong> {analysis.detectedType}
                    </p>
                    <p className="text-xs text-muted-foreground">{analysis.feedback}</p>
                    {analysis.extractedInfo && (
                      <p className="text-xs mt-1 p-2 bg-background rounded">
                        <strong>Extracted Info:</strong> {analysis.extractedInfo}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Document Checks */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Document Status</h4>
              {verificationResult.documentChecks.map((check, index) => (
                <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-muted/30">
                  {getStatusIcon(check.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{check.documentName}</span>
                      {check.isUploaded && (
                        <span className="text-xs badge-teal">Uploaded</span>
                      )}
                    </div>
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
