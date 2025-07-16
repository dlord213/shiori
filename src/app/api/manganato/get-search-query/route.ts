import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(req: Request) {
  const u = new URL(req.url);
  const q = u.searchParams.get("q");
  const page = u.searchParams.get("page") || "1";
  if (!q)
    return NextResponse.json(
      { status: 400, error: "Search query required!" },
      { status: 400 }
    );

  try {
    const { data } = await axios.get(
      `https://www.natomanga.com/search/story/${q}?page=${page}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
          Referer: "https://www.natomanga.com/",
        },
      }
    );

    const $ = cheerio.load(data);

    const mangas = $(".panel_story_list .story_item")
      .map((_, el) => {
        const s = $(el);
        return {
          title: s.find(".story_item_right .story_name a").text().trim(),
          imageUrl: s.find("img").attr("src"),
          mangaUrl: s.find("a").attr("href")?.split("/").pop(),
          chapters: s
            .find(".story_item_right .story_chapter a")
            .map((i, a) => ({
              title: $(a).text().trim(),
              url: $(a).attr("href")?.split("/").pop(),
            }))
            .get(),
          author: s
            .find('.story_item_right span:contains("Author(s)")')
            .text()
            .replace("Author(s) : ", ""),
          lastUpdated: s
            .find('.story_item_right span:contains("Updated")')
            .text()
            .replace("Updated : ", ""),
        };
      })
      .get();

    return NextResponse.json({ status: 200, mangas, query: q });
  } catch (err) {
    return NextResponse.json({ status: 400, error: err }, { status: 400 });
  }
}
