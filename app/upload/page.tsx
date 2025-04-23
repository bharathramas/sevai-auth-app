'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // ✅ Toast library

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

  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!files || !tenantId) return;
    setUploading(true);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("tenant_id", tenantId);

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

        <div className="border border-gray-700 p-6 rounded-lg bg-gray-900">
          <label className="block mb-4">
            <span className="block text-sm font-medium mb-2">Choose documents</span>
            <input
              type="file"
              multiple
              accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="block w-full text-white file:bg-blue-600 file:text-white file:rounded file:px-4 file:py-2 file:border-none"
            />
          </label>

          <Button onClick={handleUpload} disabled={uploading || !files} className="mt-4">
            {uploading ? <Loader2 className="animate-spin mr-2" /> : <UploadCloud className="mr-2" />} Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
