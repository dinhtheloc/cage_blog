import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var Chartist: any;
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bsRangeValue: Date[];
  maxDate = new Date();

  constructor(
    private http: HttpClient) {
    const to = new Date();
    to.setDate(this.maxDate.getDate() - 7);
    const from = new Date();
    this.bsRangeValue = [to, from];
  }

  trendingProducts = [];
  rankCustomers = [];
  countFalse = 0;
  countTrue = 0;
  sumProfit = 0;
  countCustomer = 0;

  ngOnInit() {
    this.getTrendingProducts();
    this.getRankCustomers();
    this.getReportOrder();
    this.getDataChart();
  }

  getTrendingProducts() {
    const url = `${environment.urlApi}/api/getTrendingProducts`;

    this.http.get(url, {})
      .subscribe(
        (res: any) => {
          console.log('res', res);
          const {
            dataTrendingProducts,
            sumProfit } = res;
          this.trendingProducts = dataTrendingProducts || [];
          this.sumProfit = sumProfit;
        }
      );
  }

  getRankCustomers() {
    const url = `${environment.urlApi}/api/getRankCustomers`;

    this.http.get(url, {})
      .subscribe(
        (res: any) => {
          console.log('rankCustomers', res);
          const { dataRankCustomers, countCustomer } = res;
          this.rankCustomers = dataRankCustomers || [];
          this.countCustomer = countCustomer;
        }
      );
  }

  getReportOrder() {
    const url = `${environment.urlApi}/api/getReportOrder`;

    this.http.get(url, {})
      .subscribe(
        (res: any) => {
          console.log('getReportOrder', res);
          const { countFalse, countTrue } = res;
          this.countFalse = countFalse;
          this.countTrue = countTrue;
          // this.rankCustomers = dataRankCustomers || [];
        }
      );
  }

  getDataChart() {
    const url = `${environment.urlApi}/api/getDataChart`;
    const fromDate = this.bsRangeValue[0];
    const toDate = this.bsRangeValue[1];
    const body = {
      fromDate,
      toDate
    };
    this.http.post(url, body)
      .subscribe(
        (res: any) => {
          console.log(res);
          const { result } = res;


          if (result && result.length > 0) {
            const labels = [];
            const values = [];
            for (const iterator of result) {
              labels.push(this.dateFormat(new Date(iterator.label)));
              values.push(String(iterator.value));
            }
            console.log(labels);
            console.log(values);
            const chart = new Chartist.Line('.ct-chart-sales-value', {
              labels,
              series: [values]
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
                  return value;
                }
              }
            });
          }
          // this.rankCustomers = dataRankCustomers || [];
        }
      );
  }

  dateFormat(date) {
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

}
