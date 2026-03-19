import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon";

interface CampaignGuidelineDownloadProps {
  guidelinePdfUrl: string | null;
}

const CampaignGuidelineDownload: React.FC<CampaignGuidelineDownloadProps> = (
  props,
) => {
  const { guidelinePdfUrl } = props;
  if (!guidelinePdfUrl) return null;
  return (
    <Button variant="outline" color="primary">
      <a
        href={guidelinePdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 font-medium"
      >
        Download Guideline
        <Icon name="ChevronRight" size="sm" className="text-current" />
      </a>
    </Button>
  );
};

export default CampaignGuidelineDownload;
