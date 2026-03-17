import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, DollarSign, Phone, User } from "lucide-react";
import { CATEGORY_MAP, PostCategory } from "@/types";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });

  if (!post || !post.isActive) {
    notFound();
  }

  const categoryInfo = CATEGORY_MAP[post.category as PostCategory];
  const date = post.createdAt.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/posts"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        返回分类信息
      </Link>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Category & Price */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                categoryInfo?.color || "bg-gray-100 text-gray-800"
              }`}
            >
              {categoryInfo?.emoji} {categoryInfo?.label || post.category}
            </span>
            {post.price && (
              <span className="inline-flex items-center gap-1 text-lg font-bold text-amber-600">
                <DollarSign className="w-5 h-5" />
                {post.price}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6 pb-6 border-b border-gray-100">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.user.name || post.user.email.split("@")[0]}
            </span>
            {post.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {post.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {date}
            </span>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none mb-6">
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-3">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Contact Info */}
          {post.contactInfo && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-800 mb-1 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                联系方式
              </h3>
              <p className="text-amber-700 text-sm">{post.contactInfo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
