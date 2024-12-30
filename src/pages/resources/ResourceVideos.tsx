import { Video } from 'lucide-react';
import ResourceCard from '@/components/ResourceCard';

const videos = [
  {
    title: 'Visa Interview Tips',
    description: 'Expert advice for your visa interview',
    icon: Video,
    link: 'https://youtube.com/watch?v=example1',
    type: 'video' as const
  },
  {
    title: 'Job Search Strategies',
    description: 'How to find work in Australia',
    icon: Video,
    link: 'https://youtube.com/watch?v=example2',
    type: 'video' as const
  }
];

export default function ResourceVideos() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Relevant Videos</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <ResourceCard
            key={video.title}
            {...video}
            delay={0.1 + index * 0.1}
          />
        ))}
      </div>
    </div>
  );
}