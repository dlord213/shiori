import { fetchMangaListByGenre } from "@/utils/manga";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page") || "1";
  const genre = url.searchParams.get("genre");

  if (!genre) {
    return NextResponse.json({ status: 400, message: "Genre query required!" });
  }

  try {
    const mangas = await fetchMangaListByGenre(genre, page);
    return NextResponse.json({ status: 200, mangas });
  } catch (err) {
    return NextResponse.json({ status: 400, error: err }, { status: 400 });
  }
}
