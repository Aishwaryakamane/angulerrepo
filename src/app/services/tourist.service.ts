import { Tourist } from 'src/app/modal/tourist';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TouristService {
baseUrl!:string;
  constructor(private http:HttpClient) { 
    this.baseUrl=environment.baseUrl;
  }
  registerTourist(tourist:Tourist):Observable<any>{
    return this.http.post(`${this.baseUrl}/addTourist`,tourist)
  }
  getAllTourist():Observable<any>{
    return this.http.get(`${this.baseUrl}/AllTouristInfo`)
  }
}
