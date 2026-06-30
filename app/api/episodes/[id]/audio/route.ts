import { createReadStream } from "fs";
import { stat } from "fs/promises";
import { NextRequest } from "next/server";
import { Readable } from "stream";
import { readEpisodeConfig, resolveEpisodePath } from "@/lib/episodes";

export const runtime = "nodejs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const audioPath = request.nextUrl.searchParams.get("path");
  if (!audioPath) {
    return Response.json({ error: "Missing audio path." }, { status: 400 });
  }

  const config = await readEpisodeConfig(id);
  if (!config.audio.some((audio) => audio.path === audioPath)) {
    return Response.json({ error: "Audio path is not configured for this episode." }, { status: 404 });
  }

  const resolved = resolveEpisodePath(id, audioPath);
  const info = await stat(resolved);
  const stream = createReadStream(resolved);

  return new Response(Readable.toWeb(stream) as unknown as BodyInit, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Length": String(info.size)
    }
  });
}
