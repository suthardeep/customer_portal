import { useCreateUgcShareLinkMutation } from "@/features/affiliate/affiliateMutations";
import { useShareLink } from "@/features/affiliate/hooks/useShareLink";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";
import ShortActionIconButton from "./ShortActionIconButton";

interface ShortShareProps {
  shares: number;
  postId: string;
  caption?: string;
  thumbnail?: string;
}

const ShortShare: React.FC<ShortShareProps> = (props) => {
  const { shares, postId, caption, thumbnail } = props;
  const { isAuthenticated } = useAuth();
  const loginDialog = useLoginDialog();
  const shareLink = useCreateUgcShareLinkMutation();
  const { share } = useShareLink();

  const handleShareClick = async () => {
    if (!isAuthenticated) {
      loginDialog.open();
      return;
    }
    const link = await shareLink.mutateAsync({ targetId: postId, title: caption, imageUrl: thumbnail });
    await share(link);
  };

  return (
    <ShortActionIconButton
      name="Share"
      aria-label="share-short-icon"
      label={shares}
      iconClassName="mr-0.5"
      enableLightMode
      onClick={handleShareClick}
    />
  );
};

export default ShortShare;
