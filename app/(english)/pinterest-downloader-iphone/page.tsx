import ToolLandingPage from "@/components/ToolLandingPage";
import { TOOL_PAGES } from "@/lib/page-content";
import { getPageSeo } from "@/lib/seo";

export const metadata = getPageSeo("iphone");

export default function PinterestDownloaderIphonePage() {
  return <ToolLandingPage content={TOOL_PAGES.iphone} />;
}
