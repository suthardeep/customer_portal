import {
  Add01Icon,
  AlertCircleIcon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  Award01Icon,
  Cancel01Icon,
  Cash02Icon,
  DeliveryReturn01Icon,
  DeliveryTruck01Icon,
  FavouriteIcon,
  FlashIcon,
  FolderOpenIcon,
  ImageNotFound01Icon,
  Link01Icon,
  Location01Icon,
  PackageRemoveIcon,
  Remove01Icon,
  Search01Icon,
  Share08Icon,
  ShieldBlockchainIcon,
  ShoppingBag01Icon,
  ShoppingBasket02Icon,
  StarHalfIcon,
  StarIcon,
  Store01Icon,
  Tick01Icon,
  Tick02Icon,
  UserIcon,
  ViewIcon,
  ViewOffIcon
} from "@hugeicons/core-free-icons";

export const iconRegistry = {
  // Select icons
  Check: Tick02Icon,
  ChevronDown: ArrowDown01Icon,
  ChevronUp: ArrowUp01Icon,
  ChevronRight: ArrowRight01Icon,
  ChevronLeft: ArrowLeft01Icon,
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
  Remove: Remove01Icon,
  PackageRemove: PackageRemoveIcon,
  // Product detail page icons
  Star: StarIcon,
  StarHalf: StarHalfIcon,
  Share: Share08Icon,
  Cart: ShoppingBag01Icon,
  Flash: FlashIcon,
  Link: Link01Icon,
  Award: Award01Icon,
  Location: Location01Icon,
  CheckCircle: Tick01Icon,
  Truck: DeliveryTruck01Icon,
  DeliveryReturn: DeliveryReturn01Icon,
  Cash: Cash02Icon,
  ShieldBlockchain: ShieldBlockchainIcon,
  ImageNotFound: ImageNotFound01Icon,
  // Header navigation icons
  ShoppingCart: ShoppingBasket02Icon,
  User: UserIcon,
} as const;


export type IconName = keyof typeof iconRegistry;
