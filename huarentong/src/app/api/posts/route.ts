import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const userId = searchParams.get("userId");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: Record<string, unknown> = { isActive: true };
    if (category) where.category = category;
    if (userId) where.userId = userId;

    const posts = await prisma.post.findMany({
      where,
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json(posts);
  } catch {
    return NextResponse.json(
      { error: "获取信息失败" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "请先登录" },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { title, content, category, price, location, contactInfo } = data;

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: "标题、内容和分类不能为空" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        category,
        price: price || null,
        location: location || null,
        contactInfo: contactInfo || null,
        userId: session.user.id,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(post);
  } catch {
    return NextResponse.json(
      { error: "发布失败，请稍后重试" },
      { status: 500 }
    );
  }
}
