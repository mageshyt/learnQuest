"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-bounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { useEffect, useState } from "react";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  // ----------------------------------------- hooks-----------------------------------------
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategory = searchParams.get("category") || "";

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedSearch,
          category: currentCategory,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedSearch, currentCategory, router, pathname]);
  return (
    <div className="relative">
      <Search className="absolute  h-4 w-4 top-3 left-3 text-slate-600" />

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full   md:w-[400px] pl-9 rounded-md bg-slate-100 focus-visible:ring-slate-700"
        placeholder="Search for courses "
      />
    </div>
  );
};

export default Searchbar;
