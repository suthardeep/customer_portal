import { Icon } from "@/components/base/icon/Icon";
import { Image } from "@/components/base/Image";
import FallbackView from "@/components/empty-states/FallbackView";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import { useCreateReferralShareLinkMutation } from "@/features/affiliate/affiliateMutations";
import { useShareLink } from "@/features/affiliate/hooks/useShareLink";
import { useAuth } from "@/features/auth/hooks/useAuth";
import AccountPageWrapper from "@/features/account/components/AccountPageWrapper";
import { cn } from "@/utils/cssHelpers";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/account/refer-and-earn")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isLoading } = useAuth();
  const shareLink = useCreateReferralShareLinkMutation();
  const { share, copied } = useShareLink();
  const referralCode = user?.referralCode ?? "";
  const referredByCode = user?.referredByCode;
  const referralCount = user?.referralCount ?? 0;

  const handleCopyClick = async () => {
    if (!referralCode) return;
    const link = await shareLink.mutateAsync({ targetId: referralCode });
    await share(link, "Join me on Aavak!");
  };

  return (
    <AccountPageWrapper>
      <AccountPageHeader title="Refer & Earn" />
      <div className="lg:max-w-2xl mx-auto mt-6">
        <div className="w-full lg:max-w-sm mx-auto">
          <Image alt="gift-box-alt" src="/gift-box.webp" />
        </div>
        <h2 className="text-n-1000 font-bold text-center mt-8 text-2xl lg:text-3xl">
          Invite friends and earn rewards
        </h2>
        <p className="text-n-800 font-medium text-center mt-4">
          Refer a friend to Aavak and earn 100 coins.When they sign up & makeup
          their first deposit, you will both get a 100 bonus
        </p>

        <div className="mt-6">
          {isLoading ? (
            <div className="w-full h-13.5 shimmer" />
          ) : !referralCode ? (
            <FallbackView
              version="compact"
              title="No user referral code found"
              color="danger"
              classname="text-center"
            />
          ) : (
            <div className="border border-n-500 rounded-2xl px-3 py-2 flex items-center justify-between">
              <p className="text-p-900 ml-2 font-bold">{referralCode}</p>
              <div className="max-h-9 overflow-hidden duration-1000">
                <div
                  className={cn(
                    "transition-transform",
                    copied.isOpen ? "-translate-y-1/2" : "translate-y-0",
                  )}
                >
                  <button
                    className="flex items-center gap-1.5 text-p-700 font-medium hover:bg-p-50 rounded-lg py-2 cursor-pointer px-3 disabled:opacity-50"
                    onClick={handleCopyClick}
                    disabled={shareLink.isPending}
                  >
                    <Icon name="Copy" size="lg" className="text-p-700" />
                    <span>Copy link</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-success-700 font-medium rounded-lg py-2 cursor-pointer px-3">
                    <Icon name="Check" size="lg" className="text-current" />
                    <span>Copied</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="border border-n-500 rounded-2xl px-4 py-3">
            <p className="text-n-700 font-medium">Referral Count</p>
            {isLoading ? (
              <div className="mt-1 h-7 w-12 shimmer rounded" />
            ) : (
              <p className="text-p-900 font-bold text-xl mt-1">
                {referralCount}
              </p>
            )}
          </div>
          <div className="border border-n-500 rounded-2xl px-4 py-3">
            <p className="text-n-700 font-medium">Referred By</p>
            {isLoading ? (
              <div className="mt-1 h-7 w-20 shimmer rounded" />
            ) : (
              <p className="text-p-900 font-bold text-base mt-1">
                {referredByCode ?? (
                  <span className="text-n-700 text-base font-medium">None</span>
                )}
              </p>
            )}
          </div>
        </div>

        <ul className="mt-10 space-y-3 list-disc list-outside pl-5">
          {HOW_IT_WORKS.map((item) => (
            <li key={item} className="text-n-900">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </AccountPageWrapper>
  );
}

const HOW_IT_WORKS = [
  "Earnings: You earned coins from various activities completing the monthly challenge, making purchases, daily logins, referrals, and festive events.",
  "Redemptions: Coins were redeemed for gift cards, special coupons, and discounts on orders.",
  "Summary: A few coins expired, but overall your Aavak Coin balance continues to grow through active participation and regular engagement.",
];
