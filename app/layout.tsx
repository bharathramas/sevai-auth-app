import './globals.css'; // ✅ Import Tailwind styles

export const metadata = {
  title: 'SevAI',
  description: 'AI-native Enterprise Assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
         {children}
         <div className="hidden force-styles" /> {/* 👈 force Tailwind to include these */}
      </body>
    </html>
  );
}
