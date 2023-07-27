import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

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

  public register(messageData: object) {
    const httpSettings = this.getHttpSettings();
    return this.httpClient.post(`${environment.S_CORE_SERVICE_API_BASE_URL}/messages`, messageData, httpSettings);
  }

  public getMyMessages(userId: string, createAt: string) {
    const httpSettings = Object.assign({}, this.getHttpSettings(), { params: new HttpParams().set('userId', userId).set('createAt', createAt) })
    return this.httpClient.get(`${environment.S_CORE_SERVICE_API_BASE_URL}/messages`, httpSettings);
  }
}
