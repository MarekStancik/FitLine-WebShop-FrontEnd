import { ProductCategory } from './product-category';
import { SupplierModel } from '../suppliers/supplier-model';
import { ProductDto } from './product-dto';

export class ProductModel {
    id: number;
    name: string;
    rating: number;
    category: ProductCategory;
    description: string;
    supplier: SupplierModel;
    images: string[];
    document: string;
    price: number;
    amount: number;

    soldCount?: number;

    public static toDto(product: ProductModel):ProductDto{
        return {
            id: product.id,
            categoryId: product.category.id,
            description: product.description,
            image: product.images ? product.images[0] : null,
            name: product.name,
            price: product.price,
            rating: product.rating,
            supplier: SupplierModel.toDto(product.supplier)
        };
    }
}
