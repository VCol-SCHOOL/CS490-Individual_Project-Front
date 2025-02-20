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
  cols = ['film_id', 'title', 'rented'];
  cols2 = ['actor_id', 'name', 'movies'];
   
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
  
  openDialog(year: string, desc: string) {
      const dialogRef = this.dialog.open(homeContent, {
      data: {y: year, d: desc} 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: 'homeContent.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class homeContent {
  readonly dialogRef = inject(MatDialogRef<homeContent>);
  data = inject(MAT_DIALOG_DATA);

  onNoClick(): void{
    this.dialogRef.close();
  }
}
