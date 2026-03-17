import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where = category ? { category } : {};

    const news = await prisma.news.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json(news);
  } catch {
    return NextResponse.json(
      { error: "获取新闻失败" },
      { status: 500 }
    );
  }
}
