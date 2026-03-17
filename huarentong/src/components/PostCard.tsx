import Link from "next/link";
import { MapPin, Calendar, DollarSign } from "lucide-react";
import { CATEGORY_MAP, PostCategory } from "@/types";

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  category: string;
  price?: string | null;
  location?: string | null;
  createdAt: string | Date;
  user: {
    name?: string | null;
    email: string;
  };
}

export default function PostCard({
  id,
  title,
  content,
  category,
  price,
  location,
  createdAt,
  user,
}: PostCardProps) {
  const categoryInfo = CATEGORY_MAP[category as PostCategory];
  const date = new Date(createdAt).toLocaleDateString("zh-CN", {
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/posts/${id}`} className="block">
      <div className="bg-white rounded-xl border border-gray-100 p-5 card-hover">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              categoryInfo?.color || "bg-gray-100 text-gray-800"
            }`}
          >
            {categoryInfo?.emoji} {categoryInfo?.label || category}
          </span>
          {price && (
            <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-medium">
              <DollarSign className="w-3 h-3" />
              {price}
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-red-600 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{content}</p>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-3">
            {location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
          </div>
          <span>{user.name || user.email.split("@")[0]}</span>
        </div>
      </div>
    </Link>
  );
}
