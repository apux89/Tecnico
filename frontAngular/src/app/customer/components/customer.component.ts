import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer, CustomerRequest } from '../interface/customer.Interface';
import { InvoiceComponent } from '../../invoice/components/invoice/invoice.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'})
export class CustomerComponent implements OnInit {

  constructor(private cService: CustomerService) { }
   exito : boolean = false;
   error : boolean = false;
   customers : Customer[] = [];
   selectdCustomer : Customer = {CustomerId: 0, 
                                        FirstName:"Seleccione",
                                        LastName:"",
                                        Address:"", 
                                        Invoices:[]};
   customer:CustomerRequest = {FirstName:"",
                               LastName:"",
                               Address:"", }                                    
                                           
  ngOnInit(): void {
  
    this.getCustomer();
  }

  getCustomer(){
    
    this.cService.buscarCustomers()
    .subscribe(
        (customers)=>{this.customers = customers;
          this.exito = true;
            setTimeout(()=>{                           
              this.exito = false;
           }, 3000)
        },
        (err)=> {
          
            this.customers = []
        }
    );
  }
  addCustommer(){
  
  this.cService.addCustomer(this.customer).subscribe(data=> {
    this.getCustomer();
    this.customer = {FirstName:"",
    LastName:"",
    Address:"", };
    this.exito = true;
    setTimeout(()=>{                           
      this.exito = false;
   }, 3000)
   },
      (err)=> {
          
            this.error = true;
            setTimeout(()=>{                           
              this.error = false;
           }, 3000)
         
            
        });
  
  }
 

 

}
