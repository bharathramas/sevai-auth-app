
export default function Landing() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-6 relative">
      <div className="absolute top-6 right-6">
        <a
          href="/api/auth/signin"
          className="text-sm bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
        >
          Login
        </a>
      </div>
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          Meet <span className="text-blue-500">SevAI</span> <br /> Your AI-native IT Assistant
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          Built on a modern stack — SevAI helps enterprises intelligently navigate operations,
          support, and decision-making. Launching soon.
        </p>
        <div className="inline-block bg-white text-black text-sm px-5 py-3 rounded-full shadow hover:bg-gray-200 transition">
          <span className="font-semibold">Coming Soon at</span>{" "}
          <a href="https://app.sevai.co" className="underline">app.sevai.co</a>
        </div>
      </div>
    </div>
  );
}
