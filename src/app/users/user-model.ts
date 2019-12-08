import { AddressModel } from '../address/address-model';

export class UserModel {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
    address: AddressModel;
}
