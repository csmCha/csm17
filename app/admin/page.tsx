import AdminPanel from './panel';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#F7F5EE] text-[#1C2826] font-sans p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex justify-between items-center border-b border-[#1C2826]/10 pb-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight">LTE Table Maker Admin</h1>
            <p className="text-xs text-[#1C2826]/60">Manage participant registrations and table allocations</p>
          </div>
          <a
            href="/"
            className="text-xs font-semibold px-3 py-1.5 bg-[#1C2826]/10 rounded hover:bg-[#1C2826]/20 transition-colors"
          >
            ← Back to Main Page
          </a>
        </header>

        <AdminPanel />
      </div>
    </main>
  );
}
