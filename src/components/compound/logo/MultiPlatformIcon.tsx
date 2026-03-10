import { useToggle } from "@/hooks/useToggle";
import { AavakLogoIcon } from "./AavakLogoIcon";
import { AavakFinTechLogo } from "./AavakFinTechLogo";
import { AavakProtectLogo } from "./AavakProtectLogo";

const PLATFORMS = [
  {
    label: "Fintech",
    icon: <AavakFinTechLogo />,
    style: { transitionDelay: "0ms" },
    offset: "-translate-y-[360%]",
    bg: "bg-white",
    labelColor: "text-n-900",
    border: "border border-n-500",
  },
  {
    label: "Protect",
    icon: <AavakProtectLogo />,
    style: { transitionDelay: "60ms" },
    offset: "-translate-y-[250%]",
    bg: "bg-white",
    labelColor: "text-n-900",
    border: "border border-n-500",
  },
  {
    label: "EGC",
    icon: <AavakLogoIcon />,
    style: { transitionDelay: "120ms" },
    offset: "-translate-y-[140%]",
    bg: "bg-black",
    labelColor: "text-white",
    border: "",
  },
];

const MultiPlatformIcon = () => {
  const open = useToggle();

  return (
    <div className="relative shrink-0 size-14 shadow-lg rounded-full">
      {PLATFORMS.map(
        ({ label, icon, style, offset, bg, labelColor, border }) => (
          <div
            key={label}
            style={style}
            className={`absolute inset-0 transition-all duration-300 ease-out shadow-xl rounded-full ${
              open.isOpen
                ? `${offset} opacity-100 scale-100`
                : "translate-y-0 translate-x-0 opacity-0 scale-50 pointer-events-none"
            }`}
          >
            <div
              className={`size-14 rounded-full ${bg} ${border} flex items-center justify-center flex-col gap-1 cursor-pointer`}
            >
              {icon}
              <span
                className={`${labelColor} text-[9px] font-medium leading-none`}
              >
                {label}
              </span>
            </div>
          </div>
        ),
      )}

      <button
        onClick={open.toggle}
        className={`size-14 shrink-0 bg-black rounded-full flex items-center justify-center transition-transform duration-300 ${open.isOpen ? "rotate-45" : "rotate-0"}`}
      >
        <MainIcon />
      </button>
    </div>
  );
};

export default MultiPlatformIcon;

function MainIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 6.5C15.5 8.433 13.933 10 12 10C10.067 10 8.5 8.433 8.5 6.5C8.5 4.567 10.067 3 12 3C13.933 3 15.5 4.567 15.5 6.5Z"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M22 17.5C22 19.433 20.433 21 18.5 21C16.567 21 15 19.433 15 17.5C15 15.567 16.567 14 18.5 14C20.433 14 22 15.567 22 17.5Z"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M9 17.5C9 19.433 7.433 21 5.5 21C3.567 21 2 19.433 2 17.5C2 15.567 3.567 14 5.5 14C7.433 14 9 15.567 9 17.5Z"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
}
