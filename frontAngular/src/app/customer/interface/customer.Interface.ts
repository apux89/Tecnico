import {Invoice} from '../../invoice/interface/invoice.interface'
export interface Customer {
    CustomerId: number;
    FirstName?:  string;
    LastName?:   string;
    Address?:    string;
    Invoices?:   Invoice[];
}

export interface CustomerRequest {
    
    FirstName:  string;
    LastName:   string;
    Address:    string;
    
}
