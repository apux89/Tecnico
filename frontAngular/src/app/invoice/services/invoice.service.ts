import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice, InvoicePostModel } from '../interface/invoice.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiUrl : string ="https://localhost:44357/api/invoice"
   
  constructor(private http: HttpClient) { }

  addInvoice(invoice: InvoicePostModel):Observable<any>{
    const url :string = `${this.apiUrl}/add`;
    let reqHeaders = new HttpHeaders().set('Content-Type','application/json');
 
      return this.http.post<Invoice>(url,{"CustomerId":parseInt(invoice.CustomerId.toString()),
                                          "Date":invoice.Date,
                                          "Codes":invoice.Codes
    },{headers:reqHeaders});
  }
}
