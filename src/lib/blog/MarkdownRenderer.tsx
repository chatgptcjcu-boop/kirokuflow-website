import Link from 'next/link';

function inline(text: string) {
  const parts = text.split(/(\[.+?\]\(.+?\))/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[(.+?)\]\((.+?)\)$/);
    if (!match) return part;
    const href = match[2];
    if (href.startsWith('http')) {
      return (
        <a key={index} href={href} target="_blank" rel="noreferrer">
          {match[1]}
        </a>
      );
    }
    return (
      <Link key={index} href={href}>
        {match[1]}
      </Link>
    );
  });
}

export function MarkdownRenderer({ body }: { body: string }) {
  const blocks = body.split(/\n{2,}/);
  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        const text = block.trim();
        if (!text) return null;
        if (text.startsWith('# ')) return <h1 key={index}>{text.slice(2)}</h1>;
        if (text.startsWith('## ')) return <h2 key={index}>{text.slice(3)}</h2>;
        if (text.startsWith('### ')) return <h3 key={index}>{text.slice(4)}</h3>;
        if (text.includes('\n- ')) {
          const items = text
            .split('\n')
            .map((item) => item.replace(/^- /, '').trim())
            .filter(Boolean);
          return (
            <ul key={index}>
              {items.map((item) => (
                <li key={item}>{inline(item)}</li>
              ))}
            </ul>
          );
        }
        if (/^\d+\. /.test(text)) {
          const items = text
            .split('\n')
            .map((item) => item.replace(/^\d+\. /, '').trim())
            .filter(Boolean);
          return (
            <ol key={index}>
              {items.map((item) => (
                <li key={item}>{inline(item)}</li>
              ))}
            </ol>
          );
        }
        return <p key={index}>{inline(text)}</p>;
      })}
    </div>
  );
}
