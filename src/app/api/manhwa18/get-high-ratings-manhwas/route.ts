import { NextResponse } from "next/server";
import { fetchManhwas, baseUrl } from "@/utils/manhwa";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page") || "";
  const path = page
    ? `${baseUrl}webtoons/${page}?orderby=rating`
    : `${baseUrl}webtoons?orderby=rating`;

  try {
    const results = await fetchManhwas(path);
    return NextResponse.json({ status: 200, manhwas: results });
  } catch (err) {
    return NextResponse.json(
      { status: 400, error: String(err) },
      { status: 400 }
    );
  }
}
