import Header from "./Header";
import Footer from "./Footer";

/**
 * Shared skeleton for legal/help content pages. Keeps Header/Footer and
 * typography consistent; every page supplies its own metadata and H1.
 */
export default function ContentPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
          {intro && <p className="mt-3 text-base text-gray-600">{intro}</p>}
          <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-700 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h3]:font-semibold [&_h3]:text-gray-900 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_a]:text-brand [&_a]:underline [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-gray-200 [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
