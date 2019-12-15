import { UserModel } from '../users/user-model';
import { ProductModel } from '../products/product.model';
/*
export enum OrderStatus{

}*/

export class OrderModel {
    id: number;
    user: UserModel;
    status: string;
    dateOfPlacement: Date;
    details: string;
    items: ProductModel[];

    supplier?: string;
}
