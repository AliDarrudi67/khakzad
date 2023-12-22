import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  apiUrl = environment.apiUrl

  constructor(private http:HttpClient) {
  }

  get(endPoint:string):Observable<any>{
    return this.http.get(this.apiUrl+endPoint)
  }

  post(endPoint:string,data:any):Observable<any> {
    return this.http.post(this.apiUrl+endPoint,data)
  }
}
