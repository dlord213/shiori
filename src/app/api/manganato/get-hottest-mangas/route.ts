import { fetchMangaList } from "@/utils/manga";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || "1";
    const mangas = await fetchMangaList("hot-manga", page);
    return NextResponse.json({ status: 200, mangas });
  } catch (err) {
    return NextResponse.json(
      { status: 400, error: String(err) },
      { status: 400 }
    );
  }
}
