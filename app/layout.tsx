import './globals.css';
import ForceTailwind from './ForceTailwind';
import SessionWrapper from "../components/SessionWrapper";
import { Toaster } from 'sonner'; // ✅ Add this line

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
        <SessionWrapper>
          {children}
        </SessionWrapper>
        <Toaster richColors position="top-right" /> {/* ✅ Add this line */}
        <ForceTailwind />
      </body>
    </html>
  );
}
