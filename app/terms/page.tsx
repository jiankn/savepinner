import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The rules for using SavePinner: permitted use, content rights, prohibited conduct, disclaimers and limitation of liability.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <ContentPage
      title="Terms of Service"
      intro="By using SavePinner you agree to these terms. If you do not agree, please do not use the service."
    >
      <section>
        <h2>1. What SavePinner is</h2>
        <p>
          SavePinner is an independent utility that resolves a public Pinterest Pin link you provide
          and lets you download the media versions it can verify. SavePinner is{" "}
          <strong>not affiliated with, sponsored, or endorsed by Pinterest, Inc.</strong> and does not
          host any Pinterest content.
        </p>
      </section>

      <section>
        <h2>2. Permitted use</h2>
        <ul>
          <li>You may only download content you own or have permission or a legal right to use.</li>
          <li>You are responsible for how you use downloaded files, including copyright compliance.</li>
          <li>You must be able to form a binding contract in your jurisdiction to use the service.</li>
        </ul>
      </section>

      <section>
        <h2>3. Prohibited conduct</h2>
        <ul>
          <li>Using the service to infringe intellectual property or privacy rights.</li>
          <li>Attempting to use the download endpoint as a general proxy or to attack third parties.</li>
          <li>Scraping, bulk-automating or otherwise abusing the service beyond normal use.</li>
          <li>Circumventing rate limits, token controls or other protective measures.</li>
        </ul>
        <p>We may throttle or block traffic that violates these rules.</p>
      </section>

      <section>
        <h2>4. Content rights</h2>
        <p>
          Media available through Pinterest belongs to its respective owners. SavePinner does not
          grant you any rights to that content. Showing a downloadable version does not mean the
          content is free to reuse — when in doubt, ask the creator.
        </p>
      </section>

      <section>
        <h2>5. No warranties</h2>
        <p>
          The service is provided “as is” and “as available”. We do not guarantee that any particular
          Pin will resolve, that resolutions will match the original upload, or that the service will
          be uninterrupted or error-free.
        </p>
      </section>

      <section>
        <h2>6. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, SavePinner and its operators are not liable for
          indirect, incidental or consequential damages, or for claims arising from your use of
          downloaded content.
        </p>
      </section>

      <section>
        <h2>7. Changes</h2>
        <p>
          We may update these terms from time to time; the current version is always on this page.
          Continued use after a change means you accept the updated terms.
        </p>
        <p className="text-gray-500">Last updated: 2026-07-20</p>
      </section>
    </ContentPage>
  );
}
