export interface ProductsFilter {
    categoryId: number;
    maxPrice: number;
    minPrice: number;
    pageSize: number;
    currentPage: number;
    suppliers: number[];
    searchTextName: string;
}
