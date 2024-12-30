import { Outlet } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { ResourceNav } from '@/components/ui/ResourceNav';
import { Card } from '@/components/ui/Card';

export default function Resources() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Resources"
        description="Access guides, videos, and useful resources to help with your immigration journey."
      />
      <ResourceNav />

      <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10">
        <Outlet />
      </div>

      {/* Newsletter Signup */}
      <section className="mt-12">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
          <p className="text-white/80 mb-6">
            Subscribe to our newsletter for the latest immigration updates and resources.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/20"
            />
            <button
              type="submit"
              className="bg-[hsl(var(--gold))] text-[hsl(var(--navy))] px-6 py-3 rounded-lg hover:bg-[hsl(var(--gold))]/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </Card>
      </section>
    </div>
  );
}