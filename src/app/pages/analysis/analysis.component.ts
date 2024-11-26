import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../../shared/services/analysis.service';
import { Chart, ChartType } from 'chart.js/auto';
import { ChartJsUtils } from '../../shared/utils/ChartJsUtils';
import { AnalysisChart } from '../../shared/models/analysis-chart';
import { Console } from 'console';
import { finalize } from 'rxjs';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { environment } from '../../../environments/environment';

export interface DoughnutModel {
  total: number;
  pais: string;
}

@Component({
    selector: 'app-analysis',
    templateUrl: './analysis.component.html',
    styleUrl: './analysis.component.css',
    imports: [LoadingComponent]
})
export class AnalysisComponent implements OnInit {
  public isLoading: boolean = true;
  public chartDoughnut: any = null;
  public chartLine: any = null;
  private utils: ChartJsUtils;
  private doughnutModel: DoughnutModel[] = [];
  private lineModel: AnalysisChart[] = [];

  constructor(
    private analysisService: AnalysisService
  ){
    this.utils = new ChartJsUtils();
    this.getAnalysis();
    console.log('ENVIRONMENT', '');
  }

  ngOnInit(): void {
    this.utils = new ChartJsUtils();
  }

  getAnalysis(): void {
    this.analysisService.getAnalysis()
      .pipe(finalize( () => this.setChart()))
      .subscribe(analisisPasto => {
        this.doughnutModel = this.groupData(analisisPasto);
        this.lineModel = analisisPasto;
      });

  }

  setChart(): void {
    this.isLoading = false;
    console.log('setChart');

    const labels = this.doughnutModel.map(m => m.pais);
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: this.doughnutModel.map(m => m.total),
          backgroundColor: [
            this.utils.transparentize(this.utils.CHART_COLORS.red, 0.5),
            this.utils.transparentize(this.utils.CHART_COLORS.orange, 0.5),
            this.utils.transparentize(this.utils.CHART_COLORS.yellow, 0.5),
            this.utils.transparentize(this.utils.CHART_COLORS.green, 0.5),
            this.utils.transparentize(this.utils.CHART_COLORS.blue, 0.5),
          ]
        }
      ]
    };
    // Creamos la gráfica
    this.chartDoughnut = new Chart(
      'chart',
      {
        type: 'doughnut',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

  // nueva instancia de Chart.js
    const data_line = {
      labels: this.getUniqueYears(this.lineModel),
      datasets: this.lineChart(),
    };

    this.chartLine = new Chart(
      'chartline',
      {
        type: 'line',
        data: data_line,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart'
            }
          }
        },
      });
  }

  getUniqueCountries(data: AnalysisChart[]) {
    const uniqueCountries = new Set<string>();
    data.forEach(item => uniqueCountries.add(item.pais));
    return Array.from(uniqueCountries);
  }

  getUniqueYears(data: AnalysisChart[]) {
    const uniqueYears = new Set<number>();
    data.forEach(item => uniqueYears.add(item.anio));
    return Array.from(uniqueYears);
  }

  lineChart(): {label: string, data: number, borderColor: string, backgroundColor: string[]}[] {
    const data: {label: string, data: number, borderColor: string, backgroundColor: string[]}[] = [];
    this.doughnutModel.forEach(f => {
      data.push( {
          label: f.pais,
          data: f.total,
          borderColor: this.utils.CHART_COLORS.blue,
          backgroundColor: [
            this.utils.transparentize(this.utils.CHART_COLORS.red, 0.5),
            this.utils.transparentize(this.utils.CHART_COLORS.orange, 0.5),
            this.utils.transparentize(this.utils.CHART_COLORS.yellow, 0.5),
            this.utils.transparentize(this.utils.CHART_COLORS.green, 0.5),
            this.utils.transparentize(this.utils.CHART_COLORS.blue, 0.5),
          ],
        })
    })
    console.log('result', data);
    return data;
  }

  groupData(data: AnalysisChart[]): DoughnutModel[] {
    const agrupado: DoughnutModel[] = [];

    data.forEach(item => {
      const pais = item.pais;

      // Buscar si ya existe el grupo con el mismo país y año
      const grupoExistente = agrupado.find(x => {
        if (x.pais == pais) {
          return { total: item.total, pais: pais };
        }
        return false;
      });

      if (!grupoExistente) {
        agrupado.push({ ...{ total: item.total, pais: pais } }); // Si no existe, se agrega
      } else {
        grupoExistente.total += item.total; // Si existe, sumar el total
      }
    });
    return agrupado;
  }
}
