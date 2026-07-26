import type { GuideSection } from "@/lib/page-content";

/**
 * Long-form prose for the device pages, sitting between the How-to steps and
 * the FAQ. Headings are h2 so the page keeps one h1 and a flat, scannable
 * outline — these sections are the substance a device page needs in order not
 * to read as a rewrite of the home page.
 */
export default function Guide({ sections }: { sections: GuideSection[] }) {
  return (
    <section aria-labelledby="guide-heading" className="bg-brand-blush/60">
      <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
        <h2 id="guide-heading" className="sr-only">
          Guide
        </h2>
        {sections.map((section, index) => (
          <div key={section.heading} className={index === 0 ? undefined : "mt-14"}>
            <h3 className="text-2xl font-semibold tracking-[-0.02em] text-brand-ink text-balance sm:text-3xl">
              {section.heading}
            </h3>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-base leading-7 text-gray-700 text-pretty">
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-5 space-y-2.5">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="relative pl-6 text-base leading-7 text-gray-700 before:absolute before:left-0 before:top-3 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
