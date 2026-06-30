import { NextRequest } from "next/server";
import { generateAudio, readEpisodeConfig } from "@/lib/episodes";

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const config = await readEpisodeConfig(id);
    const audio = await generateAudio(config);
    return Response.json({ audio });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Audio generation failed." },
      { status: 500 }
    );
  }
}
