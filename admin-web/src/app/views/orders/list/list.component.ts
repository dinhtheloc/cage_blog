import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { EditFormComponent } from './edit-form/edit-form.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list = [];
  pageSize = 30;
  pageIndex = 1;
  totalSize = 0;
  itemRemove;
  nameSearch = '';
  statusSearch = -1;
  idUpdateStatusOrder;
  dateRange;

  @ViewChild(EditFormComponent) public editFormComponent: EditFormComponent;
  @ViewChild(CreateFormComponent) public createFormComponent: CreateFormComponent;
  @ViewChild('confirmModal', { static: false }) confirmModal: ModalDirective;
  @ViewChild('confirmStatusModal', { static: false }) confirmStatusModal: ModalDirective;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.search();
  }

  makeLinkImage(link) {
    return `${environment.urlApi}${link}`;
  }


  search() {
    const url = `${environment.urlApi}/api/getOrder`;

    let params = new HttpParams()
    .set('pageIndex', String(this.pageIndex))
    .set('pageSize', String(this.pageSize))
    .set('status', String(this.statusSearch));

    if (this.nameSearch) {
      params = params.set('name', String(this.nameSearch));
    }

    if (this.dateRange && this.dateRange[0] && this.dateRange[1]) {
      params = params.set('from', String(this.dateRange[0].toISOString()));
      params = params.set('to', String(this.dateRange[1].toISOString()));
    }

    this.http.get(url, { params })
      .subscribe(
        (res: any) => {
          console.log('res', res);
          const { order, count } = res;
          this.list = order;
          this.totalSize = count;
        }
      );
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }

  openUpdateForm(item) {
    // this.createFormComponent
    this.editFormComponent.open();
    this.editFormComponent.setDataForm(item);
  }

  remove() {
    const url = `${environment.urlApi}/api/deleteOrder`;

    const { _id } = this.itemRemove;

    const body = {
      _id,
      list: this.itemRemove.list
    };

    this.http.post(url, body, { responseType: 'text' })
      .subscribe(
        res => {
          // tslint:disable-next-line:no-string-literal
          console.log(res);
          this.search();
          this.confirmModal.hide();
          this.sharedService.activeConfetti.emit();
        }
      );
  }

  openRemoveForm(item) {
    this.itemRemove = item;
    this.confirmModal.show();
  }

  updateStatusOrder() {
    const url = `${environment.urlApi}/api/updateStatusOrder`;


    const body = {
      _id: this.idUpdateStatusOrder._id,
      status: true
    };

    this.http.post(url, body, { responseType: 'text' })
      .subscribe(
        res => {
          // tslint:disable-next-line:no-string-literal
          console.log(res);
          this.search();
          this.confirmStatusModal.hide();
          this.sharedService.activeConfetti.emit();
        }
      );
  }

}
