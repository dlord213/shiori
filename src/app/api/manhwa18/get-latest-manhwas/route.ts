import { NextResponse } from "next/server";
import { fetchManhwas, baseUrl } from "@/utils/manhwa";

export async function GET() {
  try {
    const results = await fetchManhwas(baseUrl);
    return NextResponse.json({ status: 200, manhwas: results });
  } catch (err) {
    return NextResponse.json(
      { status: 400, error: String(err) },
      { status: 400 }
    );
  }
}
