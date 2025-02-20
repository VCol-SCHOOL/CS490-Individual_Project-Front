import { Component, ViewChild } from '@angular/core';
import { WebService } from '../webservice';
import { todo4 } from '../webservice';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
//import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {inject} from '@angular/core';
//ChangeDetectionStrategy, 

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
    data4 = new MatTableDataSource<todo4>();
    cols4 = ['customer_id', 'store_id', 'name', 'email', 'creation', 'lastUpdated'];
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    //@ViewChild(MatPaginator) paginator2!: MatPaginator;
  
    constructor(private web: WebService){
  
      this.web.GetTodos4().subscribe((x) =>{
        this.data4.data = x;
        console.log(this.data4.data);
        this.data4.paginator = this.paginator;

      })

      this.data4.filterPredicate = function(data, filter: string): boolean {
        return data.first_name.toLowerCase().includes(filter) || data.last_name.toLowerCase().includes(filter) 
        || data.customer_id.toString().includes(filter);
      };
    }

    onSearch(event: Event){
      if(!event.target) return;
      let filterValue = (event!.target as HTMLInputElement)!.value.trim().toLowerCase();;
      this.data4.filter = filterValue;
    }
}
