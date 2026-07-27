import Link from "next/link";
import ContentPage from "./ContentPage";
import type { TrustPageContent, TrustText } from "@/lib/trust-content";

function RichText({ value }: { value: TrustText }) {
  return value.map((part, index) => {
    if (typeof part === "string") return <span key={index}>{part}</span>;

    if (part.href.startsWith("/")) {
      return (
        <Link key={index} href={part.href}>
          {part.text}
        </Link>
      );
    }

    const external = part.href.startsWith("http");
    return (
      <a
        key={index}
        href={part.href}
        rel={external ? "noopener noreferrer" : undefined}
        target={external ? "_blank" : undefined}
      >
        {part.text}
      </a>
    );
  });
}

export default function TrustContentPage({ content }: { content: TrustPageContent }) {
  return (
    <ContentPage
      locale={content.locale}
      pageKey={content.key}
      title={content.title}
      intro={content.intro}
    >
      {content.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>

          {section.paragraphs?.map((paragraph, index) => (
            <p key={index} className="mt-3">
              <RichText value={paragraph} />
            </p>
          ))}

          {section.bullets && (
            <ul className="mt-3">
              {section.bullets.map((bullet, index) => (
                <li key={index}>
                  <RichText value={bullet} />
                </li>
              ))}
            </ul>
          )}

          {section.table && (
            <div className="mt-4 overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    {section.table.headers.map((header) => (
                      <th key={header} scope="col">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}

      <p className="text-gray-500">
        {content.lastUpdatedLabel}: {content.lastUpdated}
      </p>
    </ContentPage>
  );
}
