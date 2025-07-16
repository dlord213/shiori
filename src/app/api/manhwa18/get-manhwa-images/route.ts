import axios from "axios";
import * as cheerio from "cheerio";

import { NextResponse } from "next/server";
import { commonHeaders, baseUrl } from "@/app/utils/manhwa";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const title = url.searchParams.get("title");
  const chapter = url.searchParams.get("chapter");
  if (!title || !chapter)
    return NextResponse.json(
      { status: 400, error: "title & chapter required" },
      { status: 400 }
    );
  try {
    const { data } = await axios.get(`${baseUrl}webtoon/${title}/${chapter}`, {
      headers: commonHeaders,
    });
    const $ = cheerio.load(data);
    const images = $(".read-content img")
      .map((_, el) => ({
        src: $(el).attr("src"),
        alt: $(el).attr("alt"),
      }))
      .get();
    return NextResponse.json({ status: 200, images });
  } catch (err) {
    return NextResponse.json(
      { status: 400, error: String(err) },
      { status: 400 }
    );
  }
}
