import { ActivityDashboard } from '../components/ActivityDashboard';

export function MainPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Your Coding Activity</h1>
      <ActivityDashboard />
    </div>
  );
}
