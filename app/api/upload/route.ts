// app/api/upload/route.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions"; // ✅ Make sure this is the correct shared config
import { v4 as uuidv4 } from "uuid";
import { getServerSession } from "next-auth/next";

const s3 = new S3Client({ region: "us-east-1" });
const BUCKET_NAME = "sevaiapp";

export async function POST(req: NextRequest) {
  console.log("📥 Incoming upload request");

  try {
    const formData = await req.formData();
    const tenant_id = formData.get("tenant_id")?.toString();
    const sensitivity_level = formData.get("sensitivity_level")?.toString();
    const files = formData.getAll("files") as File[];

    const session = await getServerSession(authOptions);
    const uploaded_by = session?.user?.email ?? "unknown@sevai.co";

    console.log("🧾 Form metadata:", { tenant_id, sensitivity_level, uploaded_by });
    console.log("📦 Files count:", files.length);

    if (!tenant_id || !sensitivity_level || !files.length) {
      console.warn("⚠️ Missing required fields or files");
      return NextResponse.json(
        { error: "Missing tenant_id, sensitivity_level or files" },
        { status: 400 }
      );
    }

    for (const file of files) {
      console.log(`📂 Uploading file: ${file.name}`);

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const key = `sourcefiles/${tenant_id}/${file.name}`;
      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
        Metadata: {
          tenant_id,
          uploaded_by,
          sensitivity_level,
          uploaded_at: new Date().toISOString(),
          file_id: uuidv4(),
        },
      };

      await s3.send(new PutObjectCommand(uploadParams));
      console.log(`✅ Uploaded ${file.name} to ${key}`);
    }

    return NextResponse.json({ status: "success" }, { status: 200 });

  } catch (err) {
    console.error("❌ Upload error:", err);
    return NextResponse.json({ error: "Upload failed", details: err }, { status: 500 });
  }
}
