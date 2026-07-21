/**
 * Device-specific tutorials — PRD §8.3.6: Mobile and Desktop each get their
 * own 3 steps ("icon + Step N + title + short text"). Mobile steps are framed
 * in lightweight CSS phone mockups; desktop steps in a browser chrome frame.
 * Pure CSS/SVG — no screenshots, no heavy images.
 */

function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-36 rounded-[1.75rem] border-[6px] border-gray-900 bg-white shadow-sm">
      <div className="mx-auto mt-1.5 h-1.5 w-10 rounded-full bg-gray-900" />
      <div className="flex h-52 flex-col items-center justify-center gap-2 px-2 py-3">{children}</div>
    </div>
  );
}

function BrowserMockup({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
        <span className="ml-2 h-5 flex-1 truncate rounded-md bg-white px-2 text-left text-[10px] leading-5 text-gray-400 ring-1 ring-gray-200">
          {url}
        </span>
      </div>
      <div className="flex h-36 flex-col items-center justify-center gap-2 px-3">{children}</div>
    </div>
  );
}

const MOBILE_STEPS = [
  {
    title: "Copy the link in the Pinterest app",
    body: "Open the Pin, tap the share icon, then “Copy link”.",
    mockup: (
      <>
        <div className="h-20 w-24 rounded-lg bg-gray-100" aria-hidden="true" />
        <div className="flex w-full items-center justify-center gap-1 rounded-lg bg-gray-900 px-2 py-1.5 text-[10px] font-medium text-white">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="M12 3v12m0-12 4 4m-4-4-4 4" />
          </svg>
          Share · Copy link
        </div>
      </>
    ),
  },
  {
    title: "Paste it into SavePinner",
    body: "Back in your browser, tap Paste — the link fills in automatically.",
    mockup: (
      <>
        <div className="w-full rounded-md bg-gray-50 px-2 py-1.5 text-[9px] text-gray-400 ring-1 ring-gray-200">
          https://pin.it/…
        </div>
        <div className="flex gap-1">
          <span className="rounded-md border border-gray-300 px-2 py-1 text-[9px] font-semibold text-gray-600">Paste</span>
          <span className="rounded-md bg-brand px-2 py-1 text-[9px] font-semibold text-white">Download</span>
        </div>
      </>
    ),
  },
  {
    title: "Tap Download to save",
    body: "Choose the version you want — it lands in your downloads/photos.",
    mockup: (
      <>
        <div className="h-16 w-24 rounded-lg bg-gray-100" aria-hidden="true" />
        <div className="w-full rounded-md bg-brand px-2 py-1.5 text-center text-[9px] font-semibold text-white">
          Download · 736 × 1104 · JPG
        </div>
      </>
    ),
  },
];

const DESKTOP_STEPS = [
  {
    title: "Copy the Pin URL",
    body: "Open the Pin on pinterest.com and copy the address from the address bar (or Share → Copy link).",
    url: "pinterest.com/pin/123456789/",
    mockup: (
      <div className="w-full space-y-1.5">
        <div className="h-14 rounded-lg bg-gray-100" aria-hidden="true" />
        <div className="rounded-md bg-gray-900 px-2 py-1 text-center text-[10px] text-white">Ctrl + C</div>
      </div>
    ),
  },
  {
    title: "Paste it on SavePinner",
    body: "Click into the input and press Ctrl+V — or click the Paste button.",
    url: "savepinner.com",
    mockup: (
      <div className="w-full space-y-1.5">
        <div className="rounded-md bg-gray-50 px-2 py-1.5 text-[10px] text-gray-400 ring-1 ring-gray-200">
          https://www.pinterest.com/pin/…
        </div>
        <div className="flex justify-center gap-1">
          <span className="rounded-md border border-gray-300 px-2 py-1 text-[10px] font-semibold text-gray-600">Paste</span>
          <span className="rounded-md bg-brand px-2 py-1 text-[10px] font-semibold text-white">Download</span>
        </div>
      </div>
    ),
  },
  {
    title: "Save the file",
    body: "Pick a verified version — the file downloads straight to your computer.",
    url: "savepinner.com",
    mockup: (
      <div className="w-full space-y-1.5">
        <div className="h-14 rounded-lg bg-gray-100" aria-hidden="true" />
        <div className="rounded-md bg-brand px-2 py-1.5 text-center text-[10px] font-semibold text-white">
          Download · MP4 · 720 × 1280
        </div>
      </div>
    ),
  },
];

export default function HowToUseSteps() {
  return (
    <section aria-labelledby="how-to-use" className="bg-gray-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-12">
        <h2 id="how-to-use" className="text-center text-2xl font-bold tracking-tight">
          How to use SavePinner
        </h2>

        <h3 className="mt-10 text-center text-sm font-semibold uppercase tracking-wide text-gray-500">
          On mobile
        </h3>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          {MOBILE_STEPS.map((step, index) => (
            <li key={step.title} className="text-center">
              <PhoneMockup>{step.mockup}</PhoneMockup>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand">
                Step {index + 1}
              </p>
              <h4 className="mt-0.5 text-sm font-semibold">{step.title}</h4>
              <p className="mx-auto mt-1 max-w-xs text-sm text-gray-600">{step.body}</p>
            </li>
          ))}
        </ol>

        <h3 className="mt-12 text-center text-sm font-semibold uppercase tracking-wide text-gray-500">
          On desktop
        </h3>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          {DESKTOP_STEPS.map((step, index) => (
            <li key={step.title} className="text-center">
              <BrowserMockup url={step.url}>{step.mockup}</BrowserMockup>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand">
                Step {index + 1}
              </p>
              <h4 className="mt-0.5 text-sm font-semibold">{step.title}</h4>
              <p className="mx-auto mt-1 max-w-xs text-sm text-gray-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
