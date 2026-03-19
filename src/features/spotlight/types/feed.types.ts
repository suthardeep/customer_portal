import { BaseApiResponse, PaginatedResponse } from "@/types/baseApi.types";
import { PostStatus, UgcPostType } from "./enums";

export interface FeedPostStats {
  views: number;
  likes: number;
  bookmarks: number;
  shares: number;
}

export interface FeedPostMediaDimensions {
  width: number;
  height: number;
}

export interface FeedPostMedia {
  status: PostStatus;
  thumbnail: string;
  playUrl: string;
  images: string[] | null;
  dimensions: FeedPostMediaDimensions;
}

export interface FeedPostCreator {
  id: string;
  fullName: string;
  profileImage: string;
}

export interface FeedPost {
  id: string;
  type: UgcPostType;
  caption: string;
  tags: string[];
  status: PostStatus;
  stats: FeedPostStats;
  media: FeedPostMedia;
  creator: FeedPostCreator;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
}

export interface FeedExploreParams {
  cursor?: string;
  limit?: number;
}

export type FeedExploreResponse = BaseApiResponse<{
  posts: FeedPost[];
  nextCursor: string | null;
  hasMore: boolean;
}>;

export interface PostMediaVariant {
  url: string;
  size: number;
  bitrate: number;
  quality: string;
}

export interface PostMedia {
  status: PostStatus;
  thumbnail: string;
  playUrl: string;
  images: string[] | null;
  dimensions: FeedPostMediaDimensions;
  variants: PostMediaVariant[];
  thumbnails: string[];
  duration: number;
}

export interface TaggedProductCategory {
  id: string;
  name: string;
  image: string | null;
}

export interface TaggedProduct {
  id: string;
  name: string;
  brandName: string;
  brandId: string;
  brandLogoUrl: string | null;
  sellingPrice: string;
  price: string;
  mrp: string;
  discountPercent: number;
  discount: string | null;
  aavakCoinsEarned: number;
  aavakCoinsPrice: number;
  platformCoins: number;
  variantId: string;
  specialLabel: string | null;
  deliveryBy: string;
  mediaUrls: string[];
  avgRating: string;
  reviewCount: number;
  soldCount: number;
  hasVariants: boolean;
  tags: string[];
  inStock: boolean;
  quantity: number;
  categoryId: string;
  categoryPath: string[];
  categories: TaggedProductCategory[];
  affiliateCode: string;
}

export interface PostDetail {
  id: string;
  type: UgcPostType;
  caption: string;
  tags: string[];
  status: PostStatus;
  stats: FeedPostStats;
  media: PostMedia;
  creator: FeedPostCreator;
  taggedProducts: TaggedProduct[];
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
}

export type PostDetailResponse = BaseApiResponse<PostDetail>;

export interface MyPostsParams {
  currentPage?: number;
  pageSize?: number;
}

export type MyPostsResponse = BaseApiResponse<PaginatedResponse<FeedPost>>;

export type UserPostsResponse = BaseApiResponse<PaginatedResponse<FeedPost>>;

export interface BookmarkToggleData {
  isBookmarked: boolean;
  bookmarks: number;
}

export interface LikeToggleData {
  isLiked: boolean;
  likes: number;
}
