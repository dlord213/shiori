import axios from "axios";
import * as cheerio from "cheerio";

export const baseUrl = "https://manhwa18.cc/";
export const commonHeaders = {
  Referer: baseUrl,
};

export async function fetchManhwas(path: string) {
  const { data } = await axios.get(path, { headers: commonHeaders });
  const $ = cheerio.load(data);

  const results = $(".manga-lists .manga-item")
    .map((_, el) => {
      const e = $(el);
      const title = e.find("h3 a").text().trim();
      const link = e.find("h3 a").attr("href")?.split("/").pop();
      const img =
        e.find(".thumb img").attr("data-src") ||
        e.find(".thumb img").attr("src");
      const rating = e.find(".my-rating").attr("data-rating") || "N/A";
      const chapters = e
        .find(".chapter-item")
        .map((_, ch) => {
          const ce = $(ch);
          return {
            title: ce.find(".chapter a").text().trim(),
            url: ce.find(".chapter a").attr("href")?.replace("/webtoon/", ""),
            date: ce.find(".post-on").text().trim() || "N/A",
          };
        })
        .get();
      return {
        title,
        url: link,
        img,
        rating,
        chapters,
        last_updated: chapters.find((c) => c.date !== "N/A")?.date || "N/A",
      };
    })

    .get();

  return results;
}
