import { UserModel } from '../users/user-model';
import { AddressModel } from '../address/address-model';

//Validator utility class validates user inputs
//all methods returns string, 
//if there is no error empty string will be returned
//otherwise an error message
export class InputValidator {
    public static validateUserInfo(user: UserModel): string{
        if(!user.email){
            return 'Email can\'t be empty';
        }
    
        if(!user.firstName || !user.lastName){
            return "Names can't be empty";
        }

        return "";
    }

    public static validateBillingAddress(address: AddressModel): string{
        return "";
    }
}
