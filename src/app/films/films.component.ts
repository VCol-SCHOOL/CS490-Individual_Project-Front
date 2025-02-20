import { Component, ViewChild } from '@angular/core';
import { WebService } from '../webservice';
import { todo3 } from '../webservice';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ChangeDetectionStrategy, inject} from '@angular/core';

@Component({
  selector: 'app-films',
  standalone: false,
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})
export class FilmsComponent{
  
  data3 = new MatTableDataSource<todo3>();
  cols3 = ['film_id', 'title', 'category', 'actname'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatPaginator) paginator2!: MatPaginator;

  constructor(private web: WebService){

    this.web.GetTodos3().subscribe((x) =>{
      this.data3.data = x;
      console.log(this.data3.data);
      this.data3.paginator = this.paginator;
    })
  }

  
  readonly dialog = inject(MatDialog);

  openDialog(year: string, desc: string) {
    let dialogRef = this.dialog.open(filmContent, {
      data: {y: year, d: desc} 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSearch(event: Event){
    const searchVal = (event.target as HTMLInputElement).value;
    this.data3.filter = searchVal.trim().toLocaleLowerCase();
  }

}

@Component({
  selector: 'app-films',
  standalone: false,
  templateUrl: 'filmContent.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class filmContent {
  readonly dialogRef = inject(MatDialogRef<filmContent>);
  data = inject(MAT_DIALOG_DATA);
  
  onNoClick(): void{
    this.dialogRef.close();
  }
}