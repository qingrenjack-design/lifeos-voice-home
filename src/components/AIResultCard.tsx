import type { AIResult } from "../types";

interface AIResultCardProps {
  result: AIResult;
}

export function AIResultCard({ result }: AIResultCardProps) {
  return (
    <article className="ai-result-card" aria-label={result.title}>
      <div className="ai-result-header">
        <span className="ai-result-dot" />
        <h2>{result.title}</h2>
      </div>
      <p>{result.summary}</p>
      <div className="ai-result-sections">
        {result.sections.map((section) => (
          <section key={section.title}>
            <h3>{section.title}</h3>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
