import Link from "next/link";

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; lines: string[] }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; lines: string[] }
  | { type: "code"; text: string };

export function MarkdownView({ content }: { content: string }) {
  const blocks = parseBlocks(content);
  return (
    <article className="space-y-5 text-ink/85">
      {blocks.map((block, index) => (
        <MarkdownBlock key={index} block={block} />
      ))}
    </article>
  );
}

function MarkdownBlock({ block }: { block: Block }) {
  if (block.type === "heading") {
    const text = renderInline(block.text);
    if (block.level === 1) return <h1 className="text-3xl font-semibold leading-tight text-ink">{text}</h1>;
    if (block.level === 2) return <h2 className="pt-3 text-2xl font-semibold leading-tight text-ink">{text}</h2>;
    return <h3 className="pt-2 text-xl font-semibold leading-snug text-ink">{text}</h3>;
  }
  if (block.type === "ul") {
    return (
      <ul className="list-disc space-y-2 pl-6 text-base leading-8">
        {block.items.map((item, index) => (
          <li key={index}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "ol") {
    return (
      <ol className="list-decimal space-y-2 pl-6 text-base leading-8">
        {block.items.map((item, index) => (
          <li key={index}>{renderInline(item.replace(/^\d+\.\s+/, ""))}</li>
        ))}
      </ol>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote className="border-l-4 border-clay/40 bg-paper px-5 py-4 text-lg leading-8 text-ink/75">
        {block.lines.map((line, index) => (
          <p key={index}>{renderInline(line.replace(/^>\s?/, ""))}</p>
        ))}
      </blockquote>
    );
  }
  if (block.type === "code") {
    return (
      <pre className="overflow-auto rounded-md border border-ink/10 bg-ink px-4 py-3 text-sm leading-6 text-linen">
        <code>{block.text}</code>
      </pre>
    );
  }
  return (
    <div className="space-y-3">
      {block.lines.map((line, index) => (
        <p key={index} className="text-base leading-8">
          {renderInline(line)}
        </p>
      ))}
    </div>
  );
}

function parseBlocks(content: string): Block[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      blocks.push({ type: "code", text: code.join("\n") });
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      blocks.push({ type: "heading", level: heading[1].length, text: heading[2] });
      index += 1;
      continue;
    }

    if (/^-\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^-\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^-\s+/, ""));
        index += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) {
        items.push(lines[index]);
        index += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quote.push(lines[index]);
        index += 1;
      }
      blocks.push({ type: "quote", lines: quote });
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
      paragraph.push(lines[index]);
      index += 1;
    }
    blocks.push({ type: "paragraph", lines: paragraph });
  }

  return blocks;
}

function isBlockStart(line: string) {
  return (
    line.startsWith("```") ||
    /^(#{1,6})\s+/.test(line) ||
    /^-\s+/.test(line) ||
    /^\d+\.\s+/.test(line) ||
    /^>\s?/.test(line)
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <Link key={index} href={link[2]} className="font-semibold text-clay underline decoration-clay/30 underline-offset-4">
          {link[1]}
        </Link>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="rounded bg-paper px-1.5 py-0.5 font-mono text-sm text-clay">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}
