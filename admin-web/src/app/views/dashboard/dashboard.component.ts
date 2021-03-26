import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var Chartist: any;
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dateRange;
  constructor(
    private http: HttpClient) { }

  trendingProducts = [];
  rankCustomers = [];

  ngOnInit() {
    this.getTrendingProducts();
    this.getRankCustomers();
    const chart = new Chartist.Line('.ct-chart-sales-value', {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [
        [0, 10, 30, 50, 80, 50, 30]
      ]
    }, {
      low: 0,
      showArea: true,
      fullWidth: true,
      plugins: [
        Chartist.plugins.tooltip()
      ],
      axisX: {
        // On the x-axis start means top and end means bottom
        position: 'end',
        showGrid: false
      },
      axisY: {
        // On the y-axis start means left and end means right
        showGrid: true,
        showLabel: true,
        labelInterpolationFnc: (value) => {
          return '$' + (value / 1) + 'k';
        }
      }
    });


  }

  getTrendingProducts() {
    const url = `${environment.urlApi}/api/getTrendingProducts`;

    this.http.get(url, {})
      .subscribe(
        (res: any) => {
          console.log('res', res);
          const { dataTrendingProducts } = res;
          this.trendingProducts = dataTrendingProducts || [];
        }
      );
  }

  getRankCustomers() {
    const url = `${environment.urlApi}/api/getRankCustomers`;

    this.http.get(url, {})
      .subscribe(
        (res: any) => {
          console.log('rankCustomers', res);
          const { dataRankCustomers } = res;
          this.rankCustomers = dataRankCustomers || [];
        }
      );
  }


}

