import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/edge";
import { getWeatherData } from "@/app/lib/utils";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  let location = req.nextUrl.searchParams.get("location");
  if (!location) {
    const { city } = geolocation(req);
    location = city || "Bordeaux";
  }

  const response = await getWeatherData(location);

  return NextResponse.json({
    ...response,
    infoLink: `https://weather-labs.vercel.app/${encodeURIComponent(location)}`,
  });
}
