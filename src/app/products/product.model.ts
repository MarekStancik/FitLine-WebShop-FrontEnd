import { SupplierModel } from '../suppliers/supplier.model';

export class ProductModel {
    id: number;
    category: string;
    name: string;
    price: number;
    description: string;
    supplier: SupplierModel;
    images: string[];
}
