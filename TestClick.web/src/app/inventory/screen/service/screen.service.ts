import { Injectable } from "@angular/core";
import { WebApiService } from "../../../shared/service/web-api.service";
import { Observable } from "rxjs";
import { gridResponse, responseModel } from "../../../shared/model/response.model";
import { mScreen, mScreenDel, mScreenFilter, mScreenIns, mScreenUpd } from "../model/screen.model";
import { selParamModel } from "../../../shared/model/param.model";

@Injectable({
    providedIn: 'root'
})
export class ScreenService {
    private baseUrl:string = 'Screen';

    constructor(private api : WebApiService ) {}

    getScreen(param: selParamModel<mScreenFilter>) : Observable<responseModel<gridResponse<mScreen>>> {
       return  this.api.get(`${this.baseUrl}/GetScreen`, param);
    }

    addScreen(param: mScreenIns): Observable<responseModel<mScreen[]>> {
        return this.api.post(`${this.baseUrl}/ScreenIns`, param);
    }

    editScreen(param: mScreenUpd): Observable<responseModel<mScreen[]>> {
        return this.api.put(`${this.baseUrl}/ScreenUpd`, param);
    }

    deleteScreen(param: mScreenDel): Observable<responseModel<mScreen>> {
        return this.api.delete(`${this.baseUrl}/ScreenDel`, param);
    }
}