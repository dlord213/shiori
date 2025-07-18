import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ title: string; chapter: string }>;
}) {
  const { title, chapter } = await params;

  const manga = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/manganato/get-manga-info?title=${title}`,
      {
        cache: "no-store",
      }
    )
  ).json();

  const images = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/manganato/get-manga-images?title=${title}&chapter=${chapter}`,
      {
        cache: "no-store",
      }
    )
  ).json();

  return (
    <main className="relative max-w-7xl mx-auto flex flex-col">
      {images.images.map((image: { alt: string; src: string }) => (
        <img
          key={image.alt}
          alt={image.alt}
          src={`${process.env.NEXT_PUBLIC_API_PATH}/manga-proxy?url=${image.src}`}
          className="w-full"
        />
      ))}
      <div className="w-full max-w-6xl self-center rounded-3xl fixed bottom-4 p-4 bg-base-300 grid grid-cols-5 gap-4">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Chapters</legend>
          <select defaultValue="Pick a browser" className="select">
            {manga.chapters.map(
              (chapter: {
                title: string;
                link: string;
                views: string;
                uploadDate: string;
              }) => (
                <option key={chapter.link}>{chapter.title}</option>
              )
            )}
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Zoom</legend>
          <select className="select">
            <option>Default</option>
            <option>Window Width</option>
            <option>Window Height</option>
            <option>768px</option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Load pages by</legend>
          <select className="select">
            <option>All pages</option>
            <option>One page</option>
          </select>
        </fieldset>
      </div>
    </main>
  );
}
