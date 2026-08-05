import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
        <p className="text-gray-600">
          This is the main dashboard for your service.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/admin"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Go to Admin Panel
          </Link>
        </div>
      </div>
    </div>
  );
}
