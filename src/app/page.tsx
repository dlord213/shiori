import Link from "next/link";

import {
  Book,
  ChevronRight,
  Grid3X3,
  Table,
  TableProperties,
} from "lucide-react";
import { GENRES } from "../utils/manga";

export default async function Home() {
  const latestReleases = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/manganato/get-latest-mangas`,
      {
        cache: "no-store",
      }
    )
  ).json();

  const hotReleases = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/manganato/get-hottest-mangas`,
      {
        cache: "no-store",
      }
    )
  ).json();

  return (
    <main className="flex flex-col gap-4">
      <div className="flex flex-col xl:grid xl:grid-cols-[1fr_0.3fr] gap-8 max-w-7xl mx-auto w-full mb-6">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 xl:p-0 px-4">
            <div className="flex flex-row items-center justify-between">
              <h1 className="font-bold text-2xl">Latest releases</h1>
              <div className="flex flex-row gap-4 items-center">
                <TableProperties className="shrink-0 cursor-pointer hidden xl:block" />
                <Table className="shrink-0 cursor-pointer hidden xl:block" />
                <Grid3X3 className="shrink-0 cursor-pointer hidden xl:block" />
                <Link href={"/mangas/latest-manga"} className="btn rounded-xl">
                  View all
                  <ChevronRight />
                </Link>
              </div>
            </div>
            <div className="divider divider-vertical m-0" />
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {latestReleases.mangas.map(async (manga) => (
                <Link
                  href={`/read/${manga.mangaUrl}`}
                  className="flex flex-col gap-2 relative transition-all delay-0 duration-200 hover:scale-105"
                  key={manga.chapterUrl}
                >
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_API_PATH
                    }/manga-proxy?url=${encodeURIComponent(manga.imageUrl)}`}
                    alt={manga.title}
                    className="h-full object-cover rounded-xl"
                  />
                  <div className="absolute w-full bottom-0 p-2 text-white bg-black/75 rounded-xl">
                    <h1 className="font-bold text-lg text-ellipsis">
                      {manga.title}
                    </h1>
                    <p>{manga.latestChapter}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 xl:p-0 px-4">
            <div className="flex flex-row items-center justify-between">
              <h1 className="font-bold text-2xl">Popular releases</h1>
              <div className="flex flex-row gap-4 items-center">
                <TableProperties className="shrink-0 cursor-pointer hidden xl:block" />
                <Table className="shrink-0 cursor-pointer hidden xl:block" />
                <Grid3X3 className="shrink-0 cursor-pointer hidden xl:block" />
                <Link href={"/mangas/hot-manga"} className="btn rounded-xl">
                  View all
                  <ChevronRight />
                </Link>
              </div>
            </div>
            <div className="divider divider-vertical m-0" />
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {hotReleases.mangas.map(async (manga) => (
                <Link
                  href={`/read/${manga.mangaUrl}`}
                  className="flex flex-col gap-2 relative transition-all delay-0 duration-200 hover:scale-105"
                  key={manga.chapterUrl}
                >
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_API_PATH
                    }/manga-proxy?url=${encodeURIComponent(manga.imageUrl)}`}
                    alt={manga.title}
                    className="h-full object-cover rounded-xl"
                  />
                  <div className="absolute w-full bottom-0 p-2 text-white bg-black/75 rounded-xl">
                    <h1 className="font-bold text-lg text-ellipsis">
                      {manga.title}
                    </h1>
                    <p>{manga.latestChapter}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* LEFT SIDE */}

        {/* RIGHT SIDE */}
        <aside className="hidden  lg:flex flex-col gap-8">
          {/* GENRE ROW */}
          <div>
            <div className="flex flex-row gap-2">
              <Book />
              <p>Genres</p>
            </div>
            <div className="divider divider-vertical m-0" />
            <div className="flex flex-col gap-4">
              {GENRES.map((genre) => (
                <Link href={`/genre/${genre.url}`} key={genre.url}>
                  {genre.name}
                </Link>
              ))}
            </div>
          </div>
          {/* GENRE ROW */}
        </aside>
        {/* RIGHT SIDE */}
      </div>
    </main>
  );
}
