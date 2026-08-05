import AdminPanel from "./panel";

export const metadata = {
  title: "Admin Dashboard",
  description: "Management system for administrators",
};

export default function AdminPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <AdminPanel />
    </main>
  );
}
