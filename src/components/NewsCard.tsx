import { NewsItem } from '../data/newsData';
import { Calendar, ExternalLink, AlertTriangle } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  const getCategoryStyle = (category: NewsItem['category']) => {
    const styles = {
      policy: 'bg-blue-100 text-blue-800',
      announcement: 'bg-purple-100 text-purple-800',
      event: 'bg-green-100 text-green-800',
      guide: 'bg-yellow-100 text-yellow-800'
    };
    return styles[category];
  };

  const getImportanceIcon = (importance: NewsItem['importance']) => {
    if (importance === 'high') {
      return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs ${getCategoryStyle(news.category)}`}>
              {news.category}
            </span>
            {getImportanceIcon(news.importance)}
          </div>
          <h3 className="text-xl font-semibold">{news.title}</h3>
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Calendar className="w-4 h-4 mr-2" />
        {news.date}
      </div>

      <p className="text-gray-600 mb-4">{news.content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {news.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
          >
            #{tag}
          </span>
        ))}
      </div>

      {news.source && (
        <a
          href={news.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-primary hover:text-primary/80"
        >
          <span className="mr-2">Source: {news.source}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}