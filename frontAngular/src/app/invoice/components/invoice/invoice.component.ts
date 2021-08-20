import { Component, Input, OnInit } from '@angular/core';
import { Items } from '../../interface/invoiceItems.interface';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice, InvoicePostModel } from '../../interface/invoice.interface';
import { Customer } from '../../../customer/interface/customer.Interface';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: [
  ]
})
export class InvoiceComponent implements OnInit {
  @Input() customer: Customer = {CustomerId:-1};


  items:string[] = [];
  productCode: string = '';
  exito: boolean = false;  
  error: boolean = false;
  constructor(private iService: InvoiceService) { }
 
  ngOnInit(): void {
  }

 addInvoice() {
   let body : InvoicePostModel= {
     CustomerId: parseInt(this.customer.CustomerId.toString()),
     Date: new Date().toISOString(),
     Codes:this.items
  } 
   this.iService.addInvoice(body).subscribe(data=>{this.exito = true;
       this.items=[];
       setTimeout(()=>{                           
        this.exito = false;
   }, 3000);
      },(error)=>{
        this.error = true;
        setTimeout(()=>{                           
          this.error = false;
     }, 3000)
      });
 }
 addInvoiceItem(){    
  if(!this.items.some(x => x === this.productCode)){
     this.items.push(this.productCode);
  }
  this.productCode = '';
 }
 deleteInvoiceItem(productCode :string){
  this.items = this.items.filter(item => item !== productCode)
 }
}
