// app/upload/page.tsx
'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DefaultUser } from "next-auth";
import { FileDropZone } from "../../../components/FileDropZone";

// Extend session user type to include custom Cognito attributes
interface CustomUser extends DefaultUser {
  custom?: {
    tenant_id?: string;
  };
}

export default function UploadPage() {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;
  const tenantId = user?.custom?.tenant_id || 'unknown';

  const [files, setFiles] = useState<File[] | null>(null);
  const [uploading, setUploading] = useState(false);
  const [sensitivity, setSensitivity] = useState("internal");

  const handleUpload = async () => {
    if (!files || !tenantId) return;
    setUploading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("tenant_id", tenantId);
    formData.append("sensitivity_level", sensitivity);

    console.log("🚀 Uploading files:", files);
    console.log("🧾 Metadata:", { tenantId, sensitivity });

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setUploading(false);
    if (res.ok) {
      toast.success("Upload successful ✨");
    } else {
      toast.error("Upload failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-500">
          Upload Documents to SevAI
        </h1>
        <p className="text-gray-300 mb-4">
          Supported formats: <strong>PDF</strong>, <strong>DOCX</strong>. Files will be saved to <code>s3://sevaiapp/sourcefiles/</code> and processed for indexing.
        </p>

        <div className="border border-gray-700 p-6 rounded-lg bg-gray-900 space-y-4">
          <FileDropZone onFilesSelected={(f) => setFiles(f)} />

          <label className="block">
            <span className="block text-sm font-medium mb-2">Sensitivity Level</span>
            <input
              type="text"
              value={sensitivity}
              onChange={(e) => setSensitivity(e.target.value)}
              placeholder="e.g. internal, confidential"
              className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700"
            />
          </label>

          <Button onClick={handleUpload} disabled={uploading || !files} className="mt-2">
            {uploading ? <Loader2 className="animate-spin mr-2" /> : <UploadCloud className="mr-2" />} Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
