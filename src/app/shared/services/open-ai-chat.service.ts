import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenAiChatService {

  private apiUrl = environment.aws_host;

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ausiisooaoaoaoaoisussu`
    });

    const payload = {
      model: 'gpt-3.5-turbo', // Cambia según el modelo que prefieras
      messages: [{ role: 'user', content: message }],
      max_tokens: 150
    };

    return this.http.post(this.apiUrl, payload, { headers });
  }

  sendMessageStream(visitorId: string, message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const payload = {
      visitorId: visitorId,
      message: message
    };

    return this.http.post<any>(this.apiUrl + '/chat/conversar', payload, { headers });
  }
}
