export type PostCategory =
  | "REAL_ESTATE"
  | "SECOND_HAND"
  | "JOBS"
  | "IMMIGRATION"
  | "SOCIAL";

export const CATEGORY_MAP: Record<
  PostCategory,
  { label: string; emoji: string; color: string }
> = {
  REAL_ESTATE: { label: "房产", emoji: "🏠", color: "bg-blue-100 text-blue-800" },
  SECOND_HAND: { label: "二手闲置", emoji: "🛒", color: "bg-green-100 text-green-800" },
  JOBS: { label: "招工求职", emoji: "💼", color: "bg-purple-100 text-purple-800" },
  IMMIGRATION: { label: "移民信息", emoji: "📋", color: "bg-orange-100 text-orange-800" },
  SOCIAL: { label: "交友", emoji: "💬", color: "bg-pink-100 text-pink-800" },
};

export const NEWS_CATEGORIES = [
  "社区新闻",
  "移民政策",
  "生活指南",
  "文化活动",
  "教育资讯",
];

export interface PostWithUser {
  id: string;
  title: string;
  content: string;
  category: string;
  price: string | null;
  location: string | null;
  contactInfo: string | null;
  images: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}
