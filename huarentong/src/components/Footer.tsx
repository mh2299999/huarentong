import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">华</span>
              </div>
              <span className="text-lg font-bold text-white">华人通</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              专为美国华人打造的一站式生活服务平台，连接华人社区，服务华人生活。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              快速链接
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/news"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  新闻资讯
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  分类信息
                </Link>
              </li>
              <li>
                <Link
                  href="/posts/create"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  发布信息
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              分类信息
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/posts?category=REAL_ESTATE"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  🏠 房产信息
                </Link>
              </li>
              <li>
                <Link
                  href="/posts?category=SECOND_HAND"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  🛒 二手闲置
                </Link>
              </li>
              <li>
                <Link
                  href="/posts?category=JOBS"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  💼 招工求职
                </Link>
              </li>
              <li>
                <Link
                  href="/posts?category=IMMIGRATION"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  📋 移民信息
                </Link>
              </li>
              <li>
                <Link
                  href="/posts?category=SOCIAL"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  💬 交友互动
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              联系我们
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📧 contact@huarentong.com</li>
              <li>📱 微信: HuaRenTong</li>
              <li>📍 服务全美华人社区</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} 华人通 HuaRenTong. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
