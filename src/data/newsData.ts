export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: 'policy' | 'announcement' | 'event' | 'guide';
  date: string;
  source?: string;
  sourceUrl?: string;
  importance: 'high' | 'medium' | 'low';
  tags: string[];
}

export const mockNews: NewsItem[] = [
  {
    id: "n1",
    title: "Changes to Skilled Migration Points Test",
    content: "The Department of Home Affairs has announced updates to the points test for skilled migration visas...",
    category: "policy",
    date: "2024-02-20",
    source: "Department of Home Affairs",
    sourceUrl: "https://immi.homeaffairs.gov.au",
    importance: "high",
    tags: ["points-test", "skilled-migration", "visa-189"]
  },
  {
    id: "n2",
    title: "New English Language Test Requirements",
    content: "Starting from July 2024, there will be changes to English language test requirements...",
    category: "announcement",
    date: "2024-02-18",
    source: "Department of Home Affairs",
    sourceUrl: "https://immi.homeaffairs.gov.au",
    importance: "high",
    tags: ["english-test", "requirements", "PTE", "IELTS"]
  },
  {
    id: "n3",
    title: "Upcoming Immigration Information Session",
    content: "Join our online session about recent changes to skilled migration visas...",
    category: "event",
    date: "2024-02-15",
    importance: "medium",
    tags: ["information-session", "webinar", "skilled-migration"]
  }
];