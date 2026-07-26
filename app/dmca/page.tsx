import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: { absolute: "DMCA Policy — SavePinner" },
  description: "SavePinner copyright ownership statement and DMCA complaint process.",
  alternates: { canonical: "/dmca/" },
};

export default function DmcaPage() {
  return (
    <ContentPage
      title="DMCA Policy"
      intro="SavePinner respects copyright and responds to complete infringement notices."
    >
      <section>
        <h2>Copyright ownership</h2>
        <p>
          All images, videos, GIFs and other content downloaded through SavePinner remain the
          property of their original authors and copyright owners. SavePinner does not host or
          store Pinterest media; files are requested from Pinterest&apos;s CDN in real time.
        </p>
      </section>

      <section>
        <h2>Personal use only</h2>
        <p>
          SavePinner is provided for personal, non-commercial use. You may only download content
          you own, have permission to use, or are otherwise legally entitled to use.
        </p>
      </section>

      <section>
        <h2>Submit a complaint</h2>
        <p>
          Copyright owners or authorized representatives can email{" "}
          <a href="mailto:contact@savepinner.com">contact@savepinner.com</a> with:
        </p>
        <ol>
          <li>Your name and contact information.</li>
          <li>Identification of the copyrighted work.</li>
          <li>The exact Pinterest Pin URL involved.</li>
          <li>A statement that you have a good-faith belief the use is not authorized.</li>
          <li>A statement that the information in the notice is accurate and that you are authorized to act.</li>
        </ol>
        <p>We aim to review complete complaints within 48 hours.</p>
      </section>

      <section>
        <h2>Source removal</h2>
        <p>
          Restricting a Pin in SavePinner does not remove it from Pinterest. Contact Pinterest or
          the original publisher to request removal at the source.
        </p>
      </section>
    </ContentPage>
  );
}
