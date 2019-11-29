export class ProductModel {
    id: number;
    category: string;
    name: string;
    price: number;
    description: string;
    supplier: string;
    images: string[];
    rating: number;
    soldCount?: number;
}
