import { todoTop } from './../webservice';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { WebService } from '../webservice';
import { todo, todo2 } from '../webservice';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  data1: todo[] = [];
  data2: todo2[] =[];
   
  constructor(private web: WebService){
    
    this.web.GetTodos().subscribe((x) =>{
      this.data1 = x;
      console.log(this.data1);
    })

    this.web.GetTodos2().subscribe((x) =>{
      this.data2 = x;
      console.log(this.data2);
    })

  }

  readonly dialog = inject(MatDialog);
  
  openDialog(year: number, desc: string) {
      const dialogRef = this.dialog.open(homeContent, {
      data: {y: year, d: desc},
      height: '150px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  readonly dialog_top = inject(MatDialog);
  
  openDialog_top(num: number) {
      const dialogRef = this.dialog_top.open(topContent, {
      data: {place: num} 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './homeContent.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class homeContent {
  readonly dialogRef = inject(MatDialogRef<homeContent>);
  data = inject(MAT_DIALOG_DATA);

  onNoClick(): void{
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './topContent.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class topContent {
  readonly dialogRef = inject(MatDialogRef<topContent>);
  in = inject(MAT_DIALOG_DATA);
  data: todoTop[] =[];
  cols = ['film_id', 'title', 'rented'];

  constructor(private web: WebService){
    this.web.GetTop5(this.in.place).subscribe((x) =>{
      this.data = x;
      console.log(this.data);
    });

  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}
