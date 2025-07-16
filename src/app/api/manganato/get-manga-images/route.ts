import axios from "axios";
import * as cheerio from "cheerio";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const u = new URL(req.url);
  const title = u.searchParams.get("title");
  const chapter = u.searchParams.get("chapter");
  if (!title || !chapter) {
    return NextResponse.json(
      { status: 400, message: "Title and chapter are required" },
      { status: 400 }
    );
  }

  try {
    const { data } = await axios.get(
      `https://www.natomanga.com/manga/${title}/${chapter}`,
      {
        headers: {
          Referer: "https://www.natomanga.com/",
        },
      }
    );
    const $ = cheerio.load(data);
    const images = $(".container-chapter-reader img")
      .map((_, img) => ({
        src: $(img).attr("src"),
        alt: $(img).attr("alt"),
      }))
      .get();
    return NextResponse.json({ images });
  } catch (err) {
    return NextResponse.json(
      { status: 400, error: String(err) },
      { status: 400 }
    );
  }
}
