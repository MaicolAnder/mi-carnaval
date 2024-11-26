import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalysisChart } from '../models/analysis-chart';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  readonly baseUrl = environment.aws_host + '/analisis/pasto';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAnalysis(): Observable<AnalysisChart[]> {
    return this.httpClient.get<AnalysisChart[]>(this.baseUrl);
  }
}
