import axios from "axios";
import * as cheerio from "cheerio";

import { commonHeaders, baseUrl } from "@/utils/manhwa";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const title = url.searchParams.get("title");
  
  if (!title)
    return NextResponse.json(
      { status: 400, error: "Title required" },
      { status: 400 }
    );

  try {
    const { data } = await axios.get(`${baseUrl}webtoon/${title}`, {
      headers: commonHeaders,
    });
    const $ = cheerio.load(data);
    const t = $(".tab-summary");
    const result = {
      title: t.find("a[title]").attr("title"),
      image:
        t.find(".summary_image img").attr("data-src") ||
        t.find(".summary_image img").attr("src"),
      url: t.find(".summary_image a").attr("href"),
      rating: {
        value: t.find("#averagerate").text().trim(),
        count: t.find("#countrate").text().trim(),
      },
      alternativeTitles: t
        .find(".post-content_item")
        .filter((_, el) => $(el).find("h5").text().trim() === "Alternative:")
        .find(".summary-content")
        .text()
        .trim(),
      author: t.find(".author-content a").text().trim(),
      artist: t.find(".artist-content a").text().trim(),
      genres: t
        .find(".genres-content a")
        .map((_, el) => $(el).text().trim())
        .get(),
      release: t
        .find(".post-content_item")
        .filter((_, el) => $(el).find("h5").text().trim() === "Release")
        .find(".summary-content")
        .text()
        .trim(),
      status: t
        .find(".post-content_item")
        .filter((_, el) => $(el).find("h5").text().trim() === "Status")
        .find(".summary-content")
        .text()
        .trim(),
      type: t
        .find(".post-content_item")
        .filter((_, el) => $(el).find("h5").text().trim() === "Type")
        .find(".summary-content")
        .text()
        .trim(),
      summary: $(".panel-story-description p").text().trim(),
      chapters: $("#chapterlist li.a-h")
        .map((_, el) => {
          const ce = $(el).find("a.chapter-name");
          return {
            title: ce.text().trim(),
            url: ce.attr("href")?.split("/").pop(),
            date: $(el).find(".chapter-time").text().trim(),
          };
        })
        .get(),
    };
    return NextResponse.json({ status: 200, manhwa: result });
  } catch (err) {
    return NextResponse.json(
      { status: 400, error: String(err) },
      { status: 400 }
    );
  }
}
