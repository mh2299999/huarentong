import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "登录 - 华人通",
  description: "登录华人通账号",
};

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 hero-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">华</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">登录华人通</h1>
          <p className="text-sm text-gray-500 mt-1">欢迎回来，请登录您的账号</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <AuthForm mode="login" />
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          还没有账号？{" "}
          <Link
            href="/auth/register"
            className="text-red-600 hover:text-red-700 font-medium"
          >
            立即注册
          </Link>
        </p>
      </div>
    </div>
  );
}
