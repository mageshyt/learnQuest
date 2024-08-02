"use client";

import React, { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons/lib";

import { cn } from "@/lib";
import qs from "query-string";

interface CategoriesItemProps {
  label: string;
  value?: string;
  icon: IconType;
}

const CategoriesItem: FC<CategoriesItemProps> = ({
  label,
  value,
  icon: Icon,
}) => {
  // ------------------------------ hooks------------------------------
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  // ------------------------------ state------------------------------
  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");
  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: isSelected ? null : value,
          title: currentTitle,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border   border-slate-200 rounded-2xl bg-white dark:bg-neutral-900 flex items-center gap-x-1 hover:border-emerald-500 transition",
        isSelected && "border-emerald-500 bg-emerald-100  dark:text-emerald-900"
      )}
    >
      {Icon && <Icon className="w-6 h-6" />}
      <span className="truncate">{label}</span>
    </button>
  );
};

export default CategoriesItem;
