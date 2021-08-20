import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InvoiceItemComponent } from './components/invoice-item/invoice-item.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InvoiceComponent,
    InvoiceItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[InvoiceComponent]
})
export class InvoiceModule { }
