import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { S3Client, ListObjectsV2Command, HeadObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });
const BUCKET_NAME = 'sevaiapp';

export async function GET() {
  const session = await getServerSession();
  const tenant_id = session?.user?.tenant_id || '';
  const role = session?.user?.role || '';
  const email = session?.user?.email || '';

  if (!tenant_id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const prefix = `sourcefiles/${tenant_id}/`;
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: prefix,
    });
    const data = await s3.send(listCommand);

    const files = await Promise.all(
      (data.Contents || []).map(async (obj) => {
        const key = obj.Key!;
        const head = await s3.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: key }));
        const meta = head.Metadata || {};
        const uploaded_by = meta.uploaded_by || 'unknown';
        const sensitivity_level = meta.sensitivity_level || 'N/A';

        if (role !== 'customer_admin' && uploaded_by !== email) return null;

        return {
          name: key.replace(prefix, ''),
          uploaded_by,
          sensitivity_level,
        };
      })
    );

    const filtered = files.filter(Boolean);
    return NextResponse.json({ files: filtered });
  } catch (err) {
    console.error('[S3 list error]', err);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
