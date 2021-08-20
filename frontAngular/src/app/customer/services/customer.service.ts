import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, CustomerRequest } from '../interface/customer.Interface';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl : string ="https://localhost:44357/api/customer"

  constructor(private http: HttpClient) { }

  buscarCustomers(): Observable<Customer[]>{
    const url :string = `${this.apiUrl}/`;
    return this.http.get<Customer[]>(url);
  }
  addCustomer(customer:CustomerRequest):Observable<any>{
    const url :string = `${this.apiUrl}/add`;
    let reqHeaders = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(url,customer,{headers:reqHeaders});
  }
}
