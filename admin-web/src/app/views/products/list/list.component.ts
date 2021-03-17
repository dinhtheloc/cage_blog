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

  @ViewChild(EditFormComponent) public editFormComponent: EditFormComponent;
  @ViewChild(CreateFormComponent) public createFormComponent: CreateFormComponent;
  @ViewChild('confirmModal', { static: false }) confirmModal: ModalDirective;

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
    const url = `${environment.urlApi}/api/getProduct`;

    const params = new HttpParams().set('pageIndex', String(this.pageIndex))
      .set('name', String(this.nameSearch))
      .set('pageSize', String(this.pageSize));

    this.http.get(url, { params })
      .subscribe(
        (res: any) => {
          console.log('res', res);
          const { product, count } = res;
          this.list = product;
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
    const url = `${environment.urlApi}/api/deleteArticle`;

    const { _id } = this.itemRemove;

    const body = {
      _id
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
    console.log(item);
  }


}
