import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface todo {
    film_id: number,
    title: string,
    rented: number,
    desc: string,
    year: number
}

export interface todo2 {
    actor_id: number,
    fName: string,
    lName: string,
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
    create_date: Date,
    last_update: Date
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

}