import dayjs from "dayjs";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;

  const manga = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/manganato/get-manga-info?title=${title}`,
      {
        cache: "no-store",
      }
    )
  ).json();

  return (
    <main>
      <div className="max-w-7xl mx-auto mt-8 mb-4 flex flex-col xl:grid xl:grid-cols-[0.2fr_1fr] gap-6 xl:px-0 px-8">
        <img
          src={`${
            process.env.NEXT_PUBLIC_API_PATH
          }/manga-proxy?url=${encodeURIComponent(manga.manga.imageUrl)}`}
          alt={manga.title}
          className="w-full object-cover rounded-xl hidden xl:block"
        />
        <div className="flex flex-col gap-4">
          <div className="grid xl:grid-cols-3 gap-4">
            <div className="grid grid-cols-2 xl:flex xl:flex-col gap-4">
              <img
                src={`${
                  process.env.NEXT_PUBLIC_API_PATH
                }/manga-proxy?url=${encodeURIComponent(manga.manga.imageUrl)}`}
                alt={manga.title}
                className="h-full md:w-full object-cover rounded-xl xl:hidden block"
              />
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold">{manga.manga.title}</h1>
                <div className="flex flex-row gap-2">
                  {manga.manga.authors.map((author: string) => (
                    <p
                      key={author}
                      className="px-4 py-1 bg-base-300 rounded-3xl"
                    >
                      {author}
                    </p>
                  ))}
                </div>
                <div className="flex xl:hidden flex-col gap-4">
                  <div>
                    <h1 className="text-base-content/50">Status</h1>
                    <p className="lg:text-lg font-bold px-4 py-1 bg-base-300 rounded-3xl w-fit">
                      {manga.manga.mangaStatus}
                    </p>
                  </div>
                  <div>
                    <h1 className="text-base-content/50">Last updated</h1>
                    <p className="lg:text-lg font-bold px-4 py-1 bg-base-300 rounded-3xl w-fit">
                      {dayjs(manga.manga.lastUpdated)
                        .format("MMMM DD, YYYY / hh:mm A")
                        .toString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex xl:hidden flex-col gap-1">
                <h1 className="text-base-content/50">Genres</h1>
                <div className="flex flex-row flex-nowrap lg:flex-wrap gap-2">
                  {manga.manga.genres.map((genre: string) => (
                    <p
                      key={genre}
                      className="lg:text-lg font-bold px-4 py-1 bg-base-300 rounded-3xl w-fit"
                    >
                      {genre}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden xl:flex flex-col gap-4">
              <div>
                <h1 className="text-base-content/50">Status</h1>
                <p className="text-lg font-bold px-4 py-1 bg-base-300 rounded-3xl w-fit">
                  {manga.manga.mangaStatus}
                </p>
              </div>
              <div>
                <h1 className="text-base-content/50">Last updated</h1>
                <p className="text-lg font-bold px-4 py-1 bg-base-300 rounded-3xl w-fit">
                  {dayjs(manga.manga.lastUpdated)
                    .format("MMMM DD, YYYY / hh:mm A")
                    .toString()}
                </p>
              </div>
            </div>
            <div className="hidden xl:flex flex-col gap-1">
              <h1 className="text-base-content/50">Genres</h1>
              <div className="flex flex-row flex-wrap gap-2">
                {manga.manga.genres.map((genre: string) => (
                  <p
                    key={genre}
                    className="text-lg font-bold px-4 py-1 bg-base-300 rounded-3xl w-fit"
                  >
                    {genre}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <p>
            {manga.manga.summary
              .replace(/You are reading[^]+?\n\n/, "")
              .replace(/mangabuddy[^]+$/, "")
              .replace(
                /\s*\b(mangabuddy|read manga online|top manga site)[^]+/gi,
                ""
              )
              .trim()}
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col gap-4 xl:px-0 px-8 xl:mb-0 mb-4">
        <div className="flex flex-row items-center justify-between">
          <h1 className="font-bold text-2xl">Chapters</h1>
          <Link
            href={`/read/${manga.manga.mangaUrl}/${manga.chapters.at(-1).link}`}
            className="btn btn-neutral rounded-xl"
          >
            Start reading {manga.chapters.at(-1).title}
          </Link>
        </div>
        <div className="max-h-[28rem] overflow-y-scroll bg-base-300 p-4 rounded-3xl flex flex-col gap-4">
          {manga.chapters.map(
            (chapter: {
              title: string;
              link: string;
              views: string;
              uploadDate: string;
            }) => (
              <Link
                href={`/read/${manga.manga.mangaUrl}/${chapter.link}`}
                className="flex flex-col p-4 hover:bg-base-200 rounded-xl"
                key={chapter.link}
              >
                <h1 className="font-bold">{chapter.title}</h1>
                <p className="text-sm">
                  {dayjs(chapter.uploadDate).format("MMMM DD, YYYY / hh:mm A")}
                </p>
              </Link>
            )
          )}
        </div>
      </div>
    </main>
  );
}
