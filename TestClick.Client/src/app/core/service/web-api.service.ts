import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WebApiService {
    private apiUrl: String

    constructor(private htpp: HttpClient) 
    {
        this.apiUrl = "http://localhost:5200/";
    }


    get(url: string, param: any) : Observable<any> {

        let params = {};
        params = param as HttpParams;

        return this.htpp.get(`${this.apiUrl}${url}`, { params: params, withCredentials: true }).pipe(retry(0));
    }
}