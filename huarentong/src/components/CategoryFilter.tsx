"use client";

import { CATEGORY_MAP, PostCategory } from "@/types";

interface CategoryFilterProps {
  currentCategory: string | null;
  onChange: (category: string | null) => void;
}

export default function CategoryFilter({
  currentCategory,
  onChange,
}: CategoryFilterProps) {
  const categories = Object.entries(CATEGORY_MAP) as [
    PostCategory,
    { label: string; emoji: string; color: string }
  ][];

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          currentCategory === null
            ? "bg-red-600 text-white"
            : "bg-white text-gray-700 border border-gray-200 hover:border-red-300 hover:text-red-600"
        }`}
      >
        全部
      </button>
      {categories.map(([key, { label, emoji }]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentCategory === key
              ? "bg-red-600 text-white"
              : "bg-white text-gray-700 border border-gray-200 hover:border-red-300 hover:text-red-600"
          }`}
        >
          {emoji} {label}
        </button>
      ))}
    </div>
  );
}
