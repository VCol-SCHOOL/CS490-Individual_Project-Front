import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideHttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { filmContent, filmRent, FilmsComponent } from './films/films.component';
import { customerAdd, CustomerComponent, customerDelete, customerHistory, customerUpdate } from './customer/customer.component';
import { HomeComponent, topContent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCard, MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    CustomerComponent,
    HomeComponent,
    filmContent,
    customerAdd,
    customerDelete,
    customerUpdate,
    topContent,
    customerHistory,
    filmRent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule, MatToolbarModule,
    MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule,
    MatPaginatorModule,
    MatPaginator, MatDialogModule,
    BrowserModule, BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCard, MatCardModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
