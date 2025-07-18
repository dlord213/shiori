import { fetchMangaList } from "@/utils/manga";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const type = url.searchParams.get("type") || "latest-manga";
    const page = url.searchParams.get("page") || "1";
    const mangas = await fetchMangaList(type, page);
    return NextResponse.json({ status: 200, mangas });
  } catch (err) {
    return NextResponse.json({ status: 400, error: err }, { status: 400 });
  }
}
