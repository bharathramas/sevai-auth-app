import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust this path to your actual auth config
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({ region: "us-east-1" });
const BUCKET_NAME = "sevaiapp";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const tenant_id = formData.get("tenant_id")?.toString();
  const sensitivity_level = formData.get("sensitivity_level")?.toString();

  const session = await getServerSession(authOptions);
  const uploaded_by = session?.user?.email ?? "unknown@sevai.co";

  if (!tenant_id || !sensitivity_level) {
    return NextResponse.json({ error: "Missing tenant_id or sensitivity_level" }, { status: 400 });
  }

  const files = formData.getAll("files") as File[];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const key = `sourcefiles/${tenant_id}/${file.name}`;

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      Metadata: {
        tenant_id,
        uploaded_by,
        sensitivity_level,
        uploaded_at: new Date().toISOString(),
        file_id: uuidv4(),
      },
    };

    try {
      await s3.send(new PutObjectCommand(uploadParams));
    } catch (err) {
      console.error("Upload failed:", err);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ status: "success" }, { status: 200 });
}
