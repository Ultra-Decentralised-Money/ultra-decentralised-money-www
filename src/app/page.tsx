import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/components/layout/Dashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Dashboard />
    </div>
  );
}