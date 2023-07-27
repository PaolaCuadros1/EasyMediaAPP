import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private httpClient: HttpClient
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

  public getMyMessages(userId: string, createAt: string, page = 1) {
    const params = new HttpParams()
      .set('page', page)
      .set('userId', userId)
      .set('createAt', createAt)

    const settings = Object.assign({}, this.getHttpSettings(), { params })

    return this.httpClient.get(`${environment.S_CORE_SERVICE_API_BASE_URL}/messages`, settings);
  }

  public getCount(userId: string, createAt: string) {
    const params = new HttpParams()
      .set('userId', userId)
      .set('createAt', createAt)

    const settings = Object.assign({}, this.getHttpSettings(), { params })

    return this.httpClient.get(`${environment.S_CORE_SERVICE_API_BASE_URL}/messages/count`, settings);
  }
}
