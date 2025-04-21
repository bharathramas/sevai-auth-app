import './globals.css'; // ✅ Import Tailwind styles
import ForceTailwind from './ForceTailwind';

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
         <ForceTailwind />
      </body>
    </html>
  );
}
