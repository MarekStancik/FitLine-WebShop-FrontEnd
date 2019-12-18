import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SupplierDto } from './supplier-dto';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': 'token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private supplierUrl: string;

  constructor(private _http: HttpClient,private _authService: AuthService) {
    this.supplierUrl = environment.apiUrl + "/suppliers";
  }

  prepareHeaders(){
    httpOptions.headers = httpOptions.headers.set('Authorization','Bearer ' + this._authService.getToken());
  }

  getAll(): Observable<SupplierDto[]>{
    this.prepareHeaders();
    return this._http.get<SupplierDto[]>(this.supplierUrl,httpOptions);
  }
}
