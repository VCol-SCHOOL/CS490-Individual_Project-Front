import { Component, ViewChild } from '@angular/core';
import { WebService } from '../webservice';
import { todo4, customerHist } from '../webservice';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
    data4 = new MatTableDataSource<todo4>();
    cols4 = ['customer_id', 'store_id', 'name', 'email', 'address', 'phone', 'creation', 'history', 'lastUpdated'];
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
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

    readonly dialog = inject(MatDialog);
    
    openAdd() {
      let dialogRef = this.dialog.open(customerAdd);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    openDelete() {
      let dialogRef = this.dialog.open(customerDelete);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    openUpdate() {
      let dialogRef = this.dialog.open(customerUpdate);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    readonly dialog_hist = inject(MatDialog);
    
    openHist(num: number) {
      const dialogRef = this.dialog_hist.open(customerHistory, {
      data: {id: num} 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customerAdd.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class customerAdd {
  form!: FormGroup;
  fb = inject(FormBuilder);
  web = inject(WebService);

  constructor(){
    this.form = this.fb.group({
      customer_id: [''],
      store_id: [''],
      first_name: [''],
      last_name: [''],
      email: [''],
      address: [''],
      phone: ['']
    });
  }

  readonly dialogRef = inject(MatDialogRef<customerAdd>);
  
  submitAdd(){
    this.web.PostTodos(this.form);   
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customerDelete.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class customerDelete {
  form!: FormGroup;
  fb = inject(FormBuilder);
  web = inject(WebService);

  constructor(){
    this.form = this.fb.group({
      customer_id: ['']
    });
  }

  readonly dialogRef = inject(MatDialogRef<customerAdd>);
  
  submitDelete(){
    this.web.DeleteTodos(this.form);   
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customerUpdate.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class customerUpdate {
  form!: FormGroup;
  fb = inject(FormBuilder);
  web = inject(WebService);

  constructor(){
    this.form = this.fb.group({
      customer_id: [''],
      first_name: [''],
      last_name: [''],
      email: [''],
      address: [''],
      phone: ['']
    });
  }

  readonly dialogRef = inject(MatDialogRef<customerAdd>);
  
  submitUpdate(){
    this.web.PutTodos(this.form);   
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customerHistory.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class customerHistory {
  readonly dialogRef = inject(MatDialogRef<customerHistory>);
  in = inject(MAT_DIALOG_DATA);
  data: customerHist[] =[];
  cols = ['title', 'rented_date', 'return_date'];

  constructor(private web: WebService){
    this.web.GetHist(this.in.id).subscribe((x) =>{
      this.data = x;
      console.log(this.data.length);
    });

  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}