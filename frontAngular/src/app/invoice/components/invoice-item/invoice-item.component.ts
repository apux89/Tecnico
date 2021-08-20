import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Items } from '../../interface/invoiceItems.interface';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styles: [
  ]
})
export class InvoiceItemComponent implements OnInit {

  constructor() { }
  
  @Input() items: string[] = [];
  @Output() newItemEvent = new EventEmitter<string>();
  ngOnInit(): void {
  }
  deleteInvocieItem(productCode:string){
    this.newItemEvent.emit(productCode);
  }
}
