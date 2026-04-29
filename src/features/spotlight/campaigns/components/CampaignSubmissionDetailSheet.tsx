import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Sheet from "@/components/base/sheet/Sheet";
import { TabSelector } from "@/components/base/TabSelector";
import { Icon } from "@/components/base/icon/Icon";
import { Chip } from "@/components/base/chip/Chip";
import { Button } from "@/components/base/button/Button";
import { CampaignSubmissionStatus } from "../types/enums";
import type { CampaignSubmission } from "../types/submission.types";
import {
  getSubmissionStatusLabel,
  getSubmissionStatusChipColor,
} from "../utils";
import { prettyDate } from "@/utils/formatDateTime";
import { useEditCampaignSubmissionMutation } from "../campaignsMutations";
import {
  submissionSchema,
  socialLinksSchema,
  type SubmissionFormValues,
  type SocialLinksFormValues,
} from "../submit/submissionSchema";
import SubmissionPostMedia from "./SubmissionPostMedia";
import {
  SubmissionCaptionTagsView,
  SubmissionCaptionTagsEdit,
} from "./SubmissionCaptionTags";
import SubmissionTaggedProducts from "./SubmissionTaggedProducts";
import SubmissionPostStats from "./SubmissionPostStats";
import {
  SubmissionSocialLinksView,
  SubmissionSocialLinksForm,
  SubmissionSocialLinksPending,
} from "./SubmissionSocialLinks";

interface CampaignSubmissionDetailSheetProps {
  submission: CampaignSubmission | null;
  campaignId: string;
  isOpen: boolean;
  onClose: () => void;
}

const EDITABLE_STATUSES = [
  CampaignSubmissionStatus.PENDING_REVIEW,
  CampaignSubmissionStatus.NEEDS_UPDATING,
];

export default function CampaignSubmissionDetailSheet({
  submission,
  campaignId,
  isOpen,
  onClose,
}: CampaignSubmissionDetailSheetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"post" | "social">("post");

  const editMutation = useEditCampaignSubmissionMutation(campaignId);

  const socialLinksForm = useForm<SocialLinksFormValues>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: {
      instagramShareUrl: "",
      youtubeShareUrl: "",
      facebookShareUrl: "",
    },
  });

  const form = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    values: {
      caption: submission?.post.caption ?? "",
      tagInput: "",
      tags: submission?.post.tags ?? [],
    },
  });

  if (!submission) return null;
  console.log(submission, "submission");

  const {
    post,
    status,
    products,
    createdAt,
    reviewedAt,
    reviewTitle,
    reviewDescription,
  } = submission;
  const canEdit = EDITABLE_STATUSES.includes(status);
  const isApproved = status === CampaignSubmissionStatus.CONTENT_APPROVED;
  const linksAlreadySubmitted = !!submission.linksSubmittedAt;

  const handleSocialLinksSubmit = socialLinksForm.handleSubmit(
    ({ instagramShareUrl, youtubeShareUrl, facebookShareUrl }) => {
      editMutation.mutate(
        {
          postId: post.id,
          instagramShareUrl: instagramShareUrl || undefined,
          youtubeShareUrl: youtubeShareUrl || undefined,
          facebookShareUrl: facebookShareUrl || undefined,
        },
        { onSuccess: onClose },
      );
    },
  );

  const handleEditToggle = () => {
    if (isEditing) {
      form.reset({
        caption: post.caption ?? "",
        tagInput: "",
        tags: post.tags,
      });
    }
    setIsEditing((prev) => !prev);
  };

  const handleSave = form.handleSubmit(({ caption, tags }) => {
    editMutation.mutate(
      {
        postId: post.id,
        caption: caption || undefined,
        tags: tags.length > 0 ? tags : undefined,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          onClose();
        },
      },
    );
  });

  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => {
        setIsEditing(false);
        onClose();
      }}
      title="Submission Details"
      size="lg"
      trailingTitleComponent={
        canEdit && activeTab === "post" ? (
          <Button
            size="sm"
            variant={isEditing ? "outline" : "ghost"}
            color="neutral"
            startIcon={isEditing ? "X" : "Edit"}
            onClick={handleEditToggle}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        ) : undefined
      }
      actions={
        isEditing && activeTab === "post"
          ? [
              {
                label: "Save Changes",
                onClick: handleSave,
                isLoading: editMutation.isPending,
                disabled: editMutation.isPending,
                fullWidth: true,
              },
            ]
          : undefined
      }
    >
      <div>
        <TabSelector
          items={[
            { value: "post", label: "Post Details" },
            { value: "social", label: "Social Links" },
          ]}
          value={activeTab}
          onChange={(v) => setActiveTab(v as "post" | "social")}
          className="w-full mb-5"
        />

        <div className="space-y-5">
          {activeTab === "post" && (
            <>
              <div className="flex items-center justify-between">
                <Chip color={getSubmissionStatusChipColor(status)} size="sm">
                  {getSubmissionStatusLabel(status)}
                </Chip>
                <span className="text-n-600">
                  {reviewedAt
                    ? `Reviewed ${prettyDate(reviewedAt)}`
                    : `Submitted ${prettyDate(createdAt)}`}
                </span>
              </div>

              <SubmissionPostMedia type={post.type} media={post.media} />

              {isEditing ? (
                <SubmissionCaptionTagsEdit
                  form={form}
                  disabled={editMutation.isPending}
                />
              ) : (
                <SubmissionCaptionTagsView post={post} />
              )}

              <SubmissionTaggedProducts products={products} />

              {submission.rewardPaid && submission.rewardAmount && (
                <div className="flex items-center gap-2 rounded-lg bg-success-50 border border-success-200 p-3">
                  <Icon
                    name="Wallet"
                    size="sm"
                    className="text-success-600 shrink-0"
                  />
                  <div>
                    <p className="font-medium text-success-700">Reward Paid</p>
                    <p className="text-success-600">
                      ₹{submission.rewardAmount}
                    </p>
                  </div>
                </div>
              )}

              {(reviewTitle || reviewDescription) && (
                <div className="rounded-lg bg-n-100 border border-n-300 p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon name="Feedback" size="xs" className="text-n-600" />
                    <p className="font-medium text-n-800">
                      {reviewTitle ?? "Review Feedback"}
                    </p>
                  </div>
                  {reviewDescription && (
                    <p className="text-n-800">{reviewDescription}</p>
                  )}
                </div>
              )}

              <SubmissionPostStats stats={post.stats} />
            </>
          )}

          {activeTab === "social" && (
            <>
              {linksAlreadySubmitted ? (
                <SubmissionSocialLinksView submission={submission} />
              ) : isApproved ? (
                <SubmissionSocialLinksForm
                  form={socialLinksForm}
                  onSubmit={handleSocialLinksSubmit}
                  isLoading={editMutation.isPending}
                />
              ) : (
                <SubmissionSocialLinksPending />
              )}
            </>
          )}
        </div>
      </div>
    </Sheet>
  );
}
