import axios from "axios";
import * as cheerio from "cheerio";

export const GENRES = [
  { name: "Comedy", url: "comedy" },
  {
    name: "Supernatural",
    url: "supernatural",
  },
  { name: "Drama", url: "drama" },
  { name: "Fantasy", url: "fantasy" },
  { name: "Action", url: "action" },
  { name: "Josei", url: "josei" },
  { name: "Adventure", url: "adventure" },
  { name: "Romance", url: "romance" },
  { name: "Smut", url: "smut" },
  { name: "Manhwa", url: "manhwa" },
  { name: "Tragedy", url: "tragedy" },
  {
    name: "Slice of life",
    url: "slice-of-life",
  },
  { name: "School life", url: "school-life" },
  { name: "Seinen", url: "seinen" },
  { name: "Historical", url: "historical" },
  { name: "Harem", url: "harem" },
  { name: "Horror", url: "horror" },
  {
    name: "Psychological",
    url: "psychological",
  },
  { name: "Mystery", url: "mystery" },
  { name: "Shounen", url: "shounen" },
  {
    name: "Martial arts",
    url: "martial-arts",
  },
  { name: "Manhua", url: "manhua" },
  { name: "Shoujo", url: "shoujo" },
  { name: "Isekai", url: "isekai" },
  {
    name: "Gender bender",
    url: "gender-bender",
  },
  { name: "Mature", url: "mature" },
  { name: "Webtoons", url: "webtoons" },
  { name: "Shoujo ai", url: "shoujo-ai" },
  { name: "Yaoi", url: "yaoi" },
  { name: "Yuri", url: "yuri" },
  { name: "Medical", url: "medical" },
  { name: "Mecha", url: "mecha" },
  { name: "Shounen ai", url: "shounen-ai" },
  { name: "Sports", url: "sports" },
  { name: "Cooking", url: "cooking" },
  { name: "Sci fi", url: "sci-fi" },
  { name: "One shot", url: "one-shot" },
  { name: "Ecchi", url: "ecchi" },
  { name: "Long Strip", url: "long-strip" },
  { name: "Survival", url: "survival" },
];

export async function fetchMangaList(path: string, page: string) {
  const { data } = await axios.get(
    `https://www.natomanga.com/manga-list/${path}?page=${page}`,
    {
      headers: { Referer: "https://www.natomanga.com/" },
    }
  );

  const $ = cheerio.load(data);
  const mangas = await $(".list-truyen-item-wrap")
    .map((_, el) => {
      const e = $(el);
      return {
        title: e.find("h3 a").text().trim(),
        mangaUrl: e.find("a.list-story-item").attr("href")?.split("/").pop(),
        imageUrl: e.find("img").attr("src"),
        latestChapter: e.find("a.list-story-item-wrap-chapter").text().trim(),
        chapterUrl: e.find("a.list-story-item-wrap-chapter").attr("href"),
        views: e.find(".aye_icon").text().trim(),
        description: e.find("p").text().trim(),
      };
    })
    .get();

  return mangas;
}

export async function fetchMangaListByGenre(genre: string, page: string) {
  const { data } = await axios.get(`https://www.natomanga.com/genre/${genre}?page=${page}`, {
    headers: { Referer: "https://www.natomanga.com/" },
  });

  const $ = cheerio.load(data);
  const mangas = await $(".list-truyen-item-wrap")
    .map((_, el) => {
      const e = $(el);
      return {
        title: e.find("h3 a").text().trim(),
        mangaUrl: e.find("a.list-story-item").attr("href")?.split("/").pop(),
        imageUrl: e.find("img").attr("src"),
        latestChapter: e.find("a.list-story-item-wrap-chapter").text().trim(),
        chapterUrl: e.find("a.list-story-item-wrap-chapter").attr("href"),
        views: e.find(".aye_icon").text().trim(),
        description: e.find("p").text().trim(),
      };
    })
    .get();

  return mangas;
}
