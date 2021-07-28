import { Injectable } from '@angular/core';
import { alertListModel } from '../models/alert-list.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly _url : string = "http://localhost:3000"

  constructor(private httpClient:HttpClient) { }

  getAlertLists(): Promise<alertListModel[]>{
    let url = `${this._url}/alertsList`;
    return this.httpClient.get<alertListModel[]>(url).toPromise();
  }

  postAlertList(item:alertListModel): Promise<alertListModel>{
    let url = `${this._url}/alertsList`;
    console.log(url);
    return this.httpClient.post<alertListModel>(url,item).toPromise();
   
  }
  countrAlertLists(): Promise<number>{
    let url = `${this._url}/alertsList`;
    return this.httpClient.get<alertListModel[]>(url).pipe(map(l => l.length)).toPromise();
  }
  async deleteList(item:alertListModel){
    let urlLists = `${this._url}/alertsList/${item.id}`;
    return  await this.httpClient.delete<alertListModel>(urlLists).toPromise();
  }
}
