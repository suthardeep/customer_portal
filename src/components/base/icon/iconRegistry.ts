import {
  Tick02Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  Cancel01Icon,
  ViewIcon,
  ViewOffIcon,
  Store01Icon,
  Search01Icon,
  FolderOpenIcon,
  AlertCircleIcon,
  FavouriteIcon,
  Add01Icon,
  PackageRemoveIcon,
  StarIcon,
  Share01Icon,
  ShoppingBag01Icon,
  FlashIcon,
  Link01Icon,
  Award01Icon,
  Location01Icon,
} from "@hugeicons/core-free-icons";

export const iconRegistry = {
  // Select icons
  Check: Tick02Icon,
  ChevronDown: ArrowDown01Icon,
  ChevronUp: ArrowUp01Icon,
  // Dialog icons
  X: Cancel01Icon,
  // Input icons
  Eye: ViewIcon,
  EyeOff: ViewOffIcon,
  // Dynamic usage icons
  Store: Store01Icon,
  Search: Search01Icon,
  FolderOpen: FolderOpenIcon,
  AlertCircle: AlertCircleIcon,
  // ProductCard icons
  Heart: FavouriteIcon,
  Add: Add01Icon,
  PackageRemove: PackageRemoveIcon,
  // Product detail page icons
  Star: StarIcon,
  StarHalf: StarIcon,
  Share: Share01Icon,
  Cart: ShoppingBag01Icon,
  Flash: FlashIcon,
  Link: Link01Icon,
  Award: Award01Icon,
  Location: Location01Icon,
} as const;

export type IconName = keyof typeof iconRegistry;
