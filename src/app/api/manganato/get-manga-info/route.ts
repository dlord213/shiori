import axios from "axios";
import * as cheerio from "cheerio";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const u = new URL(req.url);
    const title = u.searchParams.get("title");
    if (!title)
      return NextResponse.json(
        { message: "Manga title is required", status: 400 },
        { status: 400 }
      );

    const { data } = await axios.get(
      `https://www.natomanga.com/manga/${title}`,
      {
        headers: { Referer: "https://www.natomanga.com/" },
      }
    );

    const $ = cheerio.load(data);
    const manga = {
      title: $(".manga-info-text h1").text().trim(),
      alternativeTitles: $(".story-alternative")
        .text()
        .replace("Alternative :", "")
        .trim(),
      authors: $('li:contains("Author(s)") a')
        .map((_, e) => $(e).text().trim())
        .get(),
      mangaStatus: $('li:contains("Status")')
        .text()
        .replace("Status :", "")
        .trim(),
      lastUpdated: $('li:contains("Last updated")')
        .text()
        .replace("Last updated :", "")
        .trim(),
      imageUrl: $(".manga-info-pic img").attr("src"),
      genres: $(".genres a")
        .map((_, e) => $(e).text().trim())
        .get(),
      rating: $("input.get_rate").val(),
      ratingVotes: parseInt(
        $("#rate_row_cmd")
          .text()
          .match(/- (\d+) votes/)?.[1] || "0",
        10
      ),
      summary: $("#contentBox")
        .clone()
        .find("h2,p")
        .remove()
        .end()
        .text()
        .trim(),
      mangaUrl: title,
    };

    const chapters = $(".chapter-list .row")
      .map((_, el) => {
        const r = $(el);
        return {
          title: r.find("a").text().trim(),
          link: r.find("a").attr("href")?.split("/").pop(),
          views: r.find("span").eq(1).text().trim(),
          uploadDate: r.find("span").eq(2).attr("title"),
        };
      })
      .get();

    return NextResponse.json({ status: 200, manga, chapters });
  } catch (err) {
    return NextResponse.json(
      { status: 400, error: String(err) },
      { status: 400 }
    );
  }
}
