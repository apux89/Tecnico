import {Items} from '../interface/invoiceItems.interface'

export interface Invoice {
    Id?:         number;
    Date?:       Date;
    CustomerId?: number;
    Items:      Items[];
}

export interface InvoicePostModel {
    
    Date:       string;
    CustomerId: number;
    Codes:      string[];
} 
