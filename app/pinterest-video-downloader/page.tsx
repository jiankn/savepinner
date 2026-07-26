import ToolLandingPage from "@/components/ToolLandingPage";
import { TOOL_PAGES } from "@/lib/page-content";
import { getPageSeo } from "@/lib/seo";

export const metadata = getPageSeo("video");

export default function PinterestVideoDownloaderPage() {
  return <ToolLandingPage content={TOOL_PAGES.video} />;
}
