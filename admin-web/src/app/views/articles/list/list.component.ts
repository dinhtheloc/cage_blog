import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list = [];
  pageSize = 3;
  pageIndex = 1;
  totalSize = 0;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.search();
  }


  search() {
    const url = `${environment.urlApi}/api/getArticles`;

    const params = new HttpParams().set('pageIndex', String(this.pageIndex))
      .set('pageSize', String(this.pageSize));

    this.http.get(url, { params })
      .subscribe(
        (res: any) => {
          console.log('res', res);
          const { articles, count } = res;
          this.list = articles;
          this.totalSize = count;
        }
      );
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }

}
