import AdminSidebar from '@/app/components/admin/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="md:ml-64 min-h-screen">
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
