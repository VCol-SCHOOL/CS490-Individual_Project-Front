import { customerAdd } from './customer/customer.component';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FormGroup } from '@angular/forms';

export interface todo {
    film_id: number,
    title: string,
    rented: number,
    description: string,
    release_year: number
}

export interface todo2 {
    actor_id: number,
    first_name: string,
    last_name: string,
    movies: number
}

export interface todo3{
    film_id: number,
    title: string,
    category: string,
    fName: string,
    lName: string,
    desc: string,
    year: number
}

export interface todo4{
    customer_id: number,
    store_id: number,
    first_name: string,
    last_name: string,
    email: string,
    address: string,
    phone: number,
    create_date: Date,
    last_update: Date
}

export interface todoTop{
    film_id: number,
    title: string,
    rented: number
}

export interface customerHist{
    title: string,
    rental_date: Date,
    return_date: Date
}


@Injectable({
    providedIn: 'root'
})
export class WebService{
    apiUrl = 'http://localhost:3000/t1'
    apiUrl2 = 'http://localhost:3000/t2'
    apiUrl3 = 'http://localhost:3000/t3'
    apiUrl4 = 'http://localhost:3000/t4'

    constructor(private http: HttpClient){}

    GetTodos(): Observable<todo[]>{
        return this.http.get<todo[]>(this.apiUrl)
    }

    GetTodos2(): Observable<todo2[]>{
        return this.http.get<todo2[]>(this.apiUrl2)
    }

    GetTodos3(): Observable<todo3[]>{
        return this.http.get<todo3[]>(this.apiUrl3)
    }

    GetTodos4(): Observable<todo4[]>{
        return this.http.get<todo4[]>(this.apiUrl4)
    }

    GetTop5(place: number): Observable<todoTop[]>{
        return this.http.get<todoTop[]>(this.apiUrl2+'/'+place)
    }

    GetHist(id: number): Observable<customerHist[]>{
        return this.http.get<customerHist[]>(this.apiUrl4+'/'+id)
    }

    PostTodos(form: FormGroup){
      this.http.post(this.apiUrl4, form.value).subscribe((x: any)=>{
        console.log(x.data);
      });
    }

    PostRent(form: FormGroup){
        console.log(form.value);
        this.http.post(this.apiUrl3, form.value).subscribe((x: any)=>{
            console.log(x.data);
          });
    }

    DeleteTodos(form: FormGroup){
        let id = parseInt(form.value.customer_id)
        //console.log(form.value)
        this.http.delete(this.apiUrl4+'/'+id).subscribe((x: any)=>{
          console.log(x.data);
        });
    }

    PutTodos(form: FormGroup){
        let id = parseInt(form.value.customer_id)
        this.http.put(this.apiUrl4+'/'+id, form.value).subscribe((x: any)=>{
          console.log(x.data);
        });
    }

}