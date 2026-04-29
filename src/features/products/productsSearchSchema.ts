import z from "zod";

export const productsListPageSearch = z.object({
  // Pagination (from GeneralQueryParams)
  currentPage: z.number().optional(),
  pageSize: z.number().optional(),
  // Search & sort (from GeneralQueryParams)
  search: z.string().optional(),
  sortByField: z.string().optional(),
  isAscending: z.boolean().optional(),
  fetchAll: z.boolean().optional(),
  active: z.string().optional(),
  // Product-specific filters (from ProductQueryParams)
  categoryId: z.string().optional(),
  categoryName: z.string().optional(),
  brandId: z.string().optional(),
  brandName: z.string().optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  ratingMin: z.number().optional(),
  tags: z.array(z.string()).optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  targetAge: z.string().optional(),
  targetGender: z.enum(["Unisex", "Male", "Female"]).optional(),
  sortBy: z.enum(["price", "rating", "popularity", "newest"]).optional(),
  source: z.string().optional(),
  filters: z.string().optional(),
});

export type ProductsListPageSearch = z.infer<typeof productsListPageSearch>;
