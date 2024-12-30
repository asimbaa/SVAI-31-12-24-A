export interface BlogPost {
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  path?: string;
}