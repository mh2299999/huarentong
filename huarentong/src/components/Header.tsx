"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  PlusCircle,
  Newspaper,
  LayoutGrid,
} from "lucide-react";

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 hero-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">华</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              华人通
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 text-sm font-medium"
            >
              首页
            </Link>
            <Link
              href="/news"
              className="px-3 py-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 text-sm font-medium flex items-center gap-1"
            >
              <Newspaper className="w-4 h-4" />
              新闻资讯
            </Link>
            <Link
              href="/posts"
              className="px-3 py-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 text-sm font-medium flex items-center gap-1"
            >
              <LayoutGrid className="w-4 h-4" />
              分类信息
            </Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Link
                  href="/posts/create"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700"
                >
                  <PlusCircle className="w-4 h-4" />
                  发布信息
                </Link>
                <Link
                  href="/profile"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-gray-700 hover:text-red-600 text-sm font-medium"
                >
                  <User className="w-4 h-4" />
                  {session.user?.name || "个人中心"}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-gray-500 hover:text-red-600 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  退出
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-gray-700 hover:text-red-600 text-sm font-medium"
                >
                  登录
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700"
                >
                  注册
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 text-sm font-medium"
              >
                首页
              </Link>
              <Link
                href="/news"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 text-sm font-medium flex items-center gap-2"
              >
                <Newspaper className="w-4 h-4" />
                新闻资讯
              </Link>
              <Link
                href="/posts"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 text-sm font-medium flex items-center gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                分类信息
              </Link>
              <div className="border-t border-gray-100 mt-2 pt-2">
                {session ? (
                  <>
                    <Link
                      href="/posts/create"
                      onClick={() => setMenuOpen(false)}
                      className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 text-sm font-medium flex items-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      发布信息
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 text-sm font-medium flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      个人中心
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-gray-500 hover:bg-red-50 text-sm flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      退出登录
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setMenuOpen(false)}
                      className="px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 text-sm font-medium"
                    >
                      登录
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setMenuOpen(false)}
                      className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 text-sm font-medium"
                    >
                      注册
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
