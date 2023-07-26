import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public getMyMessages(userId: string) {
    const httpSettings = this.getHttpSettings();
    return this.httpClient.get(`${environment.S_CORE_SERVICE_API_BASE_URL}/messages/${userId}`, httpSettings);
  }
}
