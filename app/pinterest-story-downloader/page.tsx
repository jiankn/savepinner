import ToolLandingPage from "@/components/ToolLandingPage";
import { TOOL_PAGES } from "@/lib/page-content";
import { getPageSeo } from "@/lib/seo";

export const metadata = getPageSeo("story");

export default function PinterestStoryDownloaderPage() {
  return <ToolLandingPage content={TOOL_PAGES.story} />;
}
