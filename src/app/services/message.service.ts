import { AuthService } from 'src/app/shared/services/auth.service'

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { environment } from '../../environments/environment'

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

  public getMyMessages(userId: string) {
    const httpSettings = Object.assign({}, this.getHttpSettings(), { params: new HttpParams().set('userId', userId) })
    return this.httpClient.get(`${environment.S_CORE_SERVICE_API_BASE_URL}/messages`, httpSettings);
  }
}
