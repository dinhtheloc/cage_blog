import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { EditTypesFormComponent } from './edit-form/edit-types-form.component';
import { CreateTypesFormComponent } from './create-form/create-types-form.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {
  list = [];
  pageSize = 30;
  pageIndex = 1;
  totalSize = 0;
  itemRemove;
  nameSearch = '';

  @ViewChild(EditTypesFormComponent) public editFormComponent: EditTypesFormComponent;
  @ViewChild(CreateTypesFormComponent) public createFormComponent: CreateTypesFormComponent;
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
    const url = `${environment.urlApi}/api/getType`;

    const params = new HttpParams().set('pageIndex', String(this.pageIndex))
      .set('name', String(this.nameSearch))
      .set('pageSize', String(this.pageSize));

    this.http.get(url, { params })
      .subscribe(
        (res: any) => {
          console.log('res', res);
          const { type, count } = res;
          this.list = type || [];
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
    const url = `${environment.urlApi}/api/deleteType`;

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
