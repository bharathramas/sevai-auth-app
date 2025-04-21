
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <a href="/api/auth/signin" className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">
        Login with Cognito
      </a>
    </div>
  );
}
