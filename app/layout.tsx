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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
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
