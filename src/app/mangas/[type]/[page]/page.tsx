import Link from "next/link";

import { GENRES } from "@/utils/manga";
import { ChevronRight, Book } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ type: string; page: string }>;
}) {
  const { type, page } = await params;
  const typeReleases = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/manganato/get-mangas?type=${type}&page=${page}`,
      {
        cache: "no-store",
      }
    )
  ).json();

  return (
    <main>
      <div className="flex flex-col xl:grid xl:grid-cols-[1fr_0.3fr] gap-8 max-w-7xl mx-auto w-full mb-6">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 my-8">
          <div className="flex flex-row items-end justify-between">
            <div>
              <p>Releases by</p>
              <h1 className="text-4xl font-bold">
                {type == "hot-manga"
                  ? "POPULAR RELEASES"
                  : type.toUpperCase().replace("-", " ")}
              </h1>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Link href={`/mangas/${type}/2`} className="btn rounded-xl">
                <ChevronRight /> Next
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 xl:p-0 px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {typeReleases.mangas.map(
                async (manga: {
                  mangaUrl: string;
                  chapterUrl: string;
                  imageUrl: string;
                  title: string;
                  latestChapter: string;
                }) => (
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
                )
              )}
            </div>
          </div>

          <div className="flex flex-row items-center gap-2 self-end">
            <Link href={`/mangas/${type}/2`} className="btn rounded-xl">
              <ChevronRight /> Next
            </Link>
          </div>
        </div>
        {/* LEFT SIDE */}

        {/* RIGHT SIDE */}
        <aside className="hidden my-4 lg:flex flex-col gap-8">
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
