import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private getHTTPOptions() {
    const sToken: string = ''
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sToken
      })
    };
    return httpOptions;
  }

  public register(userData: Array<object>){
    return this.httpClient.post(`${environment.S_CORE_SERVICE_API_BASE_URL}/users/`, this.getHTTPOptions());
  }

  public getMyMessages(userId: string) {
    return this.httpClient.get(`${environment.S_CORE_SERVICE_API_BASE_URL}/messages/getByUser/${userId}`, this.getHTTPOptions());
  }
}
