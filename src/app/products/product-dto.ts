import { SupplierDto } from '../suppliers/supplier-dto';

export class ProductDto {
    id: number;
    name: string;
    categoryId: number;
    supplier: SupplierDto;
    image: string;
    description: string;
    price: number;
    rating: number;
}
