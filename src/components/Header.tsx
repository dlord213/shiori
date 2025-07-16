"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HistoryIcon } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <header className="flex flex-col gap-4 p-4 bg-base-300 mb-6">
      <nav className="max-w-7xl mx-auto w-full flex flex-row items-center justify-between">
        <Link href={"/"} className="font-bold text-3xl tracking-wider">
          shiori
        </Link>
        <div className="flex flex-row gap-4 items-center">
          <label className="hidden lg:input rounded-3xl">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow"
              placeholder="Quick search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <Link href={"/history"}>
            <HistoryIcon className="cursor-pointer" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
