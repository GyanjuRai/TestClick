import { Injectable } from "@angular/core";
import { WebApiService } from "./web-api.service";
import { Observable } from "rxjs";
import { gridResponse, responseModel } from "../model/response.model";
import { mScreen, mScreenFilter } from "../model/screen.model";
import { selParamModel } from "../model/param.model";

@Injectable({
    providedIn: 'root'
})
export class ScreenService {
    baseUrl:string = 'Screen';

    constructor(private api : WebApiService ) {}

    getScreen(param: selParamModel<mScreenFilter>) : Observable<responseModel<gridResponse<mScreen>>> {
       return  this.api.get(`${this.baseUrl}/GetScreen`, param);
    }
}