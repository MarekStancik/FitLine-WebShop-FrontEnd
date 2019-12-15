import { SupplierDto } from './supplier-dto';

export class SupplierModel {
    id: number;
    name: string;

    public static toDto(supplier: SupplierModel):SupplierDto{
        return {
            id: supplier.id,
            name: supplier.name
        };
    }
}
