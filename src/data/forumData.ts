export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  category: 'general' | 'visa' | 'jobs' | 'housing' | 'culture';
  tags: string[];
  createdAt: string;
  likes: number;
  replies: number;
}

export const mockPosts: ForumPost[] = [
  {
    id: "p1",
    title: "Tips for Skills Assessment with ACS",
    content: "I recently completed my skills assessment with ACS. Here's what I learned...",
    author: {
      name: "Rajesh Sharma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh"
    },
    category: "visa",
    tags: ["skills-assessment", "ACS", "IT"],
    createdAt: "2024-02-15",
    likes: 24,
    replies: 12
  },
  {
    id: "p2",
    title: "Finding accommodation in Sydney",
    content: "Looking for advice on finding affordable housing in Sydney...",
    author: {
      name: "Priya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
    },
    category: "housing",
    tags: ["sydney", "accommodation", "rental"],
    createdAt: "2024-02-14",
    likes: 15,
    replies: 8
  },
  {
    id: "p3",
    title: "PTE vs IELTS - My Experience",
    content: "I took both PTE and IELTS. Here's a detailed comparison...",
    author: {
      name: "Arun KC",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arun"
    },
    category: "general",
    tags: ["english-test", "PTE", "IELTS"],
    createdAt: "2024-02-13",
    likes: 32,
    replies: 18
  }
];