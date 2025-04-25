'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { toast } from 'sonner';

export default function IngestPage() {
  const { data: session } = useSession();
  const role = session?.user?.role || 'customer_user';
  const email = session?.user?.email || '';
  const tenant_id = session?.user?.tenant_id || 'unknown';

  const [search, setSearch] = useState('');
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tenant_id !== 'unknown') fetchFiles();
  }, [tenant_id]);

  async function fetchFiles() {
    try {
      const res = await fetch('/api/files');
      const data = await res.json();
      setFiles(data.files || []);
    } catch (err) {
      toast.error('Failed to load files');
    }
  }

  const filteredFiles = files.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) &&
    (role === 'customer_admin' || f.uploaded_by === email)
  );

  const handleProcessSelected = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success(`${selectedFiles.length} files queued for ingestion.`);
      setLoading(false);
      setSelectedFiles([]);
    }, 1500);
  };

  const handleAutoIngest = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success(role === 'customer_admin' ? 'All files processed.' : 'Your files processed.');
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col font-sans">
      <Header />

      <div className="flex-grow pt-28 pb-16 px-6 bg-gradient-to-br from-black via-zinc-900 to-zinc-950">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="select" className="w-full">
            <TabsList className="flex space-x-4 justify-center">
              <TabsTrigger value="select">Select Files to Ingest</TabsTrigger>
              <TabsTrigger value="auto">Auto Ingest All</TabsTrigger>
            </TabsList>

            <TabsContent value="select" className="mt-8">
              <Input
                placeholder="Search files..."
                className="mb-4 w-full bg-zinc-800 text-white border-zinc-700"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Select</TableCell>
                    <TableCell>Filename</TableCell>
                    <TableCell>Sensitivity</TableCell>
                    <TableCell>Uploaded By</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredFiles.map((file, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.name)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedFiles([...selectedFiles, file.name]);
                            else setSelectedFiles(selectedFiles.filter(n => n !== file.name));
                          }}
                        />
                      </TableCell>
                      <TableCell>{file.name}</TableCell>
                      <TableCell>{file.sensitivity_level}</TableCell>
                      <TableCell>{file.uploaded_by}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button className="mt-6" onClick={handleProcessSelected} disabled={loading || selectedFiles.length === 0}>
                {loading ? 'Processing...' : 'Process Selected Files'}
              </Button>
            </TabsContent>

            <TabsContent value="auto" className="mt-8 text-center">
              <p className="text-zinc-400 mb-6">
                {role === 'customer_admin' ? 'Ingest all unprocessed files in your tenant.' : 'Ingest your uploaded unprocessed files.'}
              </p>
              <Button onClick={handleAutoIngest} disabled={loading}>
                {loading ? 'Processing...' : 'Start Auto Ingest'}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </main>
  );
}
