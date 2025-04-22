// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-24 py-8 text-sm text-zinc-400 border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© 2025 SevAI Inc. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="mailto:hello@sevai.co" className="hover:text-white">Contact Us</a>
          <span>|</span>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Docs</a>
        </div>
      </div>
    </footer>
  );
}
