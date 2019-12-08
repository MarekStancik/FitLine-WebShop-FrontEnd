export class ProductCategory {
    id: number;
    name: string;
    parentCategory: ProductCategory;
    children: ProductCategory[];
}
