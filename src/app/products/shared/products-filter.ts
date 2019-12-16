export enum ProductOrdering
{
  Sales = "Most Sold",
  Rating = "Top Rated",
  PriceDesc = "Most Expensive",
  PriceAsc = "Least Expensive",
}

export interface ProductsFilter {
    categoryId: number;
    maxPrice: number;
    minPrice: number;
    pageSize: number;
    currentPage: number;
    suppliers: number[];
    searchTextName: string;
    ordering: ProductOrdering;
}
