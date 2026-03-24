import ShortActionIconButton from "./ShortActionIconButton";

interface ShortViewsProps {
  views: number;
}

const ShortViews: React.FC<ShortViewsProps> = (props) => {
  const { views } = props;
  return (
    <ShortActionIconButton
      name="Eye"
      aria-label="views-short-icon"
      label={views}
      enableLightMode
    />
  );
};

export default ShortViews;
