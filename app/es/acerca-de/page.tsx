import TrustContentPage from "@/components/TrustContentPage";
import { getTrustPageSeo } from "@/lib/seo";
import { TRUST_PAGES } from "@/lib/trust-content";

const content = TRUST_PAGES.es.about;

export const metadata = getTrustPageSeo(content);

export default function AboutPage() {
  return <TrustContentPage content={content} />;
}
