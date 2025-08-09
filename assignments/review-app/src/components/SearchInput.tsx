"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onInputChange = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      const params = new URLSearchParams(searchParams);

      if (!value.trim()) {
        params.delete("search");
      } else {
        params.set("search", value.trim());
      }

      router.replace(`?${params.toString()}`);
    },
    500
  );

  return (
    <div className="flex items-center gap-1">
      <input
        name="shopName"
        className={`border border-gray-300 rounded-xl p-1.5 block w-full resize-none placeholder:text-sm  focus:outline-indigo-500 `}
        placeholder="Search by shop name"
        onChange={onInputChange}
        defaultValue={searchParams.get("search") || ""}
      />
      <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
    </div>
  );
};

export default SearchInput;
