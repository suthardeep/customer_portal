import { Icon } from "@/components/base/icon/Icon";
import { useToggle } from "@/hooks/useToggle";
import SearchSheet from "../search/SearchSheet";

type Props = {
  className?: string;
};

export function HeaderSearchIcon({ className }: Props) {
  const searchSheet = useToggle();

  return (
    <>
      <button onClick={searchSheet.open} className={className}>
        <div className="fall flex-col gap-2 justify-between group cursor-pointer min-w-10">
          <Icon name="Search" size="lg" className={iconClassName} />
          <p className="font-medium text-n-900 group-hover:text-n-950 transition-colors text-[13px]!">
            Search
          </p>
        </div>
      </button>
      <SearchSheet isOpen={searchSheet.isOpen} onClose={searchSheet.close} />
    </>
  );
}

const iconClassName = "text-n-900 group-hover:text-n-950";
