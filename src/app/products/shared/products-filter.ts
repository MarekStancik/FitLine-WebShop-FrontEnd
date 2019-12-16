export enum ProductOrdering
{
  MostSold = "MostSold",
  TopRated = "TopRated",
  MostExpensive = "MostExpensive",
  LeastExpensive = "LeastExpensive",
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
