import '../index.css'; // ✅ Import Tailwind styles

export const metadata = {
  title: 'SevAI',
  description: 'AI-native IT Assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
