import { ProductCategory } from './product-category';

export class ProductModel {
    id: number;
    name: string;
    price: number;
    description: string;
    supplier: string;
    images: string[];
    rating: number;
    soldCount?: number;
    category: ProductCategory;
}
