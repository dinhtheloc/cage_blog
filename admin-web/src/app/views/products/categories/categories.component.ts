import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { EditCategoriesFormComponent } from './edit-form/edit-categories-form.component';
import { CreateCategoriesFormComponent } from './create-form/create-categories-form.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  list = [];
  pageSize = 30;
  pageIndex = 1;
  totalSize = 0;
  itemRemove;
  nameSearch = '';

  @ViewChild(EditCategoriesFormComponent) public editFormComponent: EditCategoriesFormComponent;
  @ViewChild(CreateCategoriesFormComponent) public createFormComponent: CreateCategoriesFormComponent;
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
    const url = `${environment.urlApi}/api/getCategory`;

    const params = new HttpParams().set('pageIndex', String(this.pageIndex))
      .set('name', String(this.nameSearch))
      .set('pageSize', String(this.pageSize));

    this.http.get(url, { params })
      .subscribe(
        (res: any) => {
          console.log('res', res);
          const { category, count } = res;
          this.list = category || [];
          this.totalSize = count;
        }
      );
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }

  openUpdateForm(item) {
    this.editFormComponent.open();
    this.editFormComponent.setDataForm(item);
  }

  remove() {
    const url = `${environment.urlApi}/api/deleteCategory`;

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
