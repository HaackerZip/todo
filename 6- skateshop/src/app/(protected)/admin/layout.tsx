import type { Metadata } from 'next';
import { Sidebar } from '@/modules/admin/layout/Sidebar';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Skateboard Admin Dashboard',
  description: 'Admin dashboard for skateboard e-commerce',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#0F172A] text-white">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
      <Toaster />
    </div>
  );
}