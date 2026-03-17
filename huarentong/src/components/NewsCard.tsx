import Link from "next/link";
import { Calendar } from "lucide-react";

interface NewsCardProps {
  id: string;
  title: string;
  summary: string;
  image?: string | null;
  category: string;
  author: string;
  createdAt: string | Date;
}

export default function NewsCard({
  id,
  title,
  summary,
  category,
  author,
  createdAt,
}: NewsCardProps) {
  const date = new Date(createdAt).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/news/${id}`} className="block">
      <div className="bg-white rounded-xl border border-gray-100 p-5 card-hover">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                {category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-red-600 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{summary}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>{author}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
