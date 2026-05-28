import type {
  BaseApiResponse,
  PaginatedResponse,
} from "@/types/baseApi.types";
import type {
  ActionTypeEnum,
  AppStylingEnum,
  BannerRatioEnum,
  BannerTypeEnum,
  CoinTypeEnum,
  CtaTypeEnum,
  DisplayTypeEnum,
  FontStyleEnum,
  GradientDirectionEnum,
  PlatformEnum,
  ScreenTypeEnum,
  SectionTypeEnum,
  SelectionTypeEnum,
  SourceTypeEnum,
  TextAlignEnum,
} from "./enums";

// --- Shared primitives ---

export interface GradientColor {
  color: string;
  opacity: number;
}

export interface GradientConfig {
  direction: GradientDirectionEnum;
  colors: GradientColor[];
}

// --- Hero styling ---

export interface HeroStyling {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  hasGradient?: boolean;
  gradientColors?: GradientColor[];
  backgroundImageUrl?: string;
  heroImage?: string;
}

// --- Homepage (list endpoint) ---

export interface HomeScreen {
  id: string;
  platform: PlatformEnum;
  version: string;
  sections: Section[];
  isActive: boolean;
  published: boolean;
  versionName: string | null;
  appStyling: AppStylingEnum;
  heroStyling: HeroStyling;
  coinType: CoinTypeEnum | null;
  coinBadgeColor: string | null;
  coinBackgroundColor: string | null;
  searchTextColor: string | null;
  searchBackgroundColor: string | null;
  searchForegroundColor: string | null;
  searchIconColor: string | null;
  notificationIconColor: string | null;
  notificationIconDotColor: string | null;
  notificationBackgroundColor: string | null;
  locationIconColor: string | null;
  locationTypeColor: string | null;
  locationAddressColor: string | null;
  createdAt: string;
  updatedAt: string;
}

// --- Section detail ---

export interface TextDecoration {
  color: string;
  align: TextAlignEnum;
  size: number;
  fontStyle: FontStyleEnum;
}

export interface SelectedItem {
  id: string;
  name: string;
}

export interface ContentCondition {
  field: string;
  operator: string;
  value: number | string | string[];
}

export interface ContentConfig {
  sourceType: SourceTypeEnum;
  selectionType: SelectionTypeEnum;
  selectedItems: SelectedItem[];
  conditions: ContentCondition[];
  limit: number;
  sort: string;
}

// --- Display settings (discriminated union on displayType) ---

export interface SimpleDisplaySettings {
  displayType: DisplayTypeEnum;
  autoPlay?: boolean;
}

export interface SliderDisplaySettings {
  displayType: DisplayTypeEnum.SLIDER;
  interval?: number;
  autoPlay?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
}

export interface HorizontalListDisplaySettings {
  displayType: DisplayTypeEnum.HORIZONTAL_LIST;
  numberOfLines?: number;
  spacing?: number;
  itemWidth?: number;
}

export interface GridDisplaySettings {
  displayType: DisplayTypeEnum.GRID;
  columnsMax?: number;
  rowsMax?: number;
  gridSpacing?: number;
}

export interface SingleSlideDisplaySettings {
  displayType: DisplayTypeEnum.SINGLE_SLIDE;
}

export type DisplaySettings =
  | SimpleDisplaySettings
  | SliderDisplaySettings
  | HorizontalListDisplaySettings
  | GridDisplaySettings
  | SingleSlideDisplaySettings;

// --- Section styling (discriminated union on hasTransparentBackground) ---

export interface TransparentSectionStyling {
  hasTransparentBackground: true;
  roundness: number;
  hasGradient: boolean;
}

export interface NonTransparentSectionStyling {
  hasTransparentBackground: false;
  backgroundColor: string;
  hasGradient: boolean;
  gradientColors: GradientColor[];
  gradientConfig?: GradientConfig;
  roundness: number;
  backgroundImageUrl: string;
}

export type SectionStyling =
  | TransparentSectionStyling
  | NonTransparentSectionStyling;

// --- CTA ---

export interface CtaTarget {
  id: string;
  name: string;
}

export interface CtaConfig {
  ctaType?: CtaTypeEnum;
  label?: string;
  actionType?: ActionTypeEnum;
  targets?: CtaTarget[];
}

// --- Full section (from /api/v1/section/{id}) ---

export interface Section {
  id: string;
  title: string;
  hideTitle: boolean;
  subtitle: string | null;
  sectionType: SectionTypeEnum;
  logoUrl: string;
  titleDecoration: TextDecoration | null;
  subtitleDecoration: TextDecoration | null;
  contentConfig: ContentConfig;
  actionApi: string;
  displaySettings: DisplaySettings;
  sectionStyling: SectionStyling;
  hasCta: boolean;
  ctaConfig?: CtaConfig;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Banner (from actionApi for BANNER source type) ---

export interface Banner {
  id: string;
  title: string;
  bannerType: BannerTypeEnum;
  screenType: ScreenTypeEnum;
  displayIndex: number;
  stateIds: string[];
  startTime: string;
  endTime: string;
  ratio: BannerRatioEnum;
  roundness: number;
  mediaUrl: string;
  mediaType: string;
  ctaConfig: CtaConfig | null;
  rank: number;
  active: boolean;
  note: string;
  createdAt: string;
  updatedAt: string;
}

// --- API response types ---

export type HomepageResponse = BaseApiResponse<HomeScreen>;
export type SectionResponse = BaseApiResponse<Section>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SectionContentResponse = BaseApiResponse<PaginatedResponse<any>>;
