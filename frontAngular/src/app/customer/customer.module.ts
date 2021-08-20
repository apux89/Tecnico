import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './components/customer.component';
import { FormsModule } from '@angular/forms';
import { InvoiceModule } from '../invoice/invoice.module';




@NgModule({
  declarations: [
    CustomerComponent
  ],
  exports:[
  CustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InvoiceModule
  ]
})
export class CustomerModule { }
