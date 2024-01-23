import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  baseUrl = environment.baseUrl

  constructor(
    private http: HttpClient,
  ) { }

  get(endPoint: string, queryString: any = {}, pagination = false): Observable<any> {
    if (pagination)
      queryString = {...queryString, page: 1, limit: 10}
    return this.http.get(this.baseUrl + endPoint, {params: this.prepareQueryString(queryString)})
  }

  prepareQueryString(queryString: any) {
    let params = new HttpParams();
    const fields = Object.keys(queryString)
    fields.forEach(item => {
      if (queryString[item] && queryString[item] !== -1)
        params = params.append(item, queryString[item]);
    })
    return params
  }


  post(endPoint: string, data:any):Observable<any> {
    return this.http.post(this.baseUrl+endPoint,data)
  }

  getFormData(form: any) {
    const fields = Object.keys(form.value)
    const formData = new FormData()
    fields.forEach(item => {
      formData.append(item, form.get(item).value)
    })
    return formData
  }

  getFormDataObject(object: any) {
    const fields = Object.keys(object)
    const formData = new FormData()
    fields.forEach(item => {
      formData.append(item, object[item])
    })
    return formData
  }

}
