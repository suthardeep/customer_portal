import ShortActionIconButton from "./ShortActionIconButton";

interface ShortShareProps {
  shares: number;
}

const ShortShare: React.FC<ShortShareProps> = (props) => {
  const { shares } = props;
  return (
    <ShortActionIconButton
      name="Share"
      aria-label="share-short-icon"
      label={shares}
      iconClassName="mr-0.5"
      enableLightMode
    />
  );
};

export default ShortShare;
