import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  private getHttpSettings() {
    const httpSettings = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpSettings;
  }

  private handleError(error: Response) {
    console.log(error)
    return error
  }

  public register(userData: object) {
    const httpSettings = this.getHttpSettings();
    return this.httpClient.post<any>(`${environment.S_CORE_SERVICE_API_BASE_URL}/users`, userData, httpSettings);
  }

  public getMyMessages(userId: string) {
    //return this.httpClient.get(`${environment.S_CORE_SERVICE_API_BASE_URL}/messages/getByUser/${userId}`, this.getHTTPOptions());
  }
}
