import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const imageUrl = url.searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json(
      { status: 400, error: "Image URL required" },
      { status: 400 }
    );
  }

  try {
    const resp = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      headers: {
        Referer: "https://www.natomanga.com/",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
    });

    return new NextResponse(Buffer.from(resp.data), {
      status: 200,
      headers: {
        "Content-Type": resp.headers["content-type"] || "image/jpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { status: 500, error: "Failed to fetch image", errors: err },
      { status: 500 }
    );
  }
}
