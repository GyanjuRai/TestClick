import { Injectable } from "@angular/core";
import { WebApiService } from "../../../shared/service/web-api.service";
import { Observable } from "rxjs";
import { gridResponse, responseModel } from "../../../shared/model/response.model";
import { mScreen, mScreenDel, mScreenFilter, mScreenIns, mScreenUpd } from "../model/screen.model";

@Injectable({
    providedIn: 'root'
})
export class ScreenService {
    private baseUrl:string = 'Screen';

    constructor(private api : WebApiService ) {}

    getScreen(param: any) : Observable<responseModel<gridResponse<mScreen>>> {
       return  this.api.get(`${this.baseUrl}/GetScreen`, param);
    }

    postScreen(param: mScreenIns): Observable<responseModel<mScreen[]>> {
        return this.api.post(`${this.baseUrl}/ScreenIns`, param);
    }

    putScreen(param: mScreenUpd): Observable<responseModel<mScreen[]>> {
        return this.api.put(`${this.baseUrl}/ScreenUpd`, param);
    }

    deleteScreen(param: mScreenDel): Observable<responseModel<mScreen>> {
        return this.api.delete(`${this.baseUrl}/ScreenDel`, param);
    }
}