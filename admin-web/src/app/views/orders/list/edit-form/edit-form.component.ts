import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {


  @Output() search = new EventEmitter();

  updateForm = new FormGroup({
    _id: new FormControl(null, Validators.required),
    name: new FormControl({ value: null, disabled: true }),
    slug: new FormControl({ value: null, disabled: true }),
    avatar: new FormControl(null),
    buyingPrice: new FormControl(null),
    saleprice: new FormControl(null),
    description: new FormControl(null),
    shortDescription: new FormControl(null),
    typeId: new FormControl(null),
    categoryId: new FormControl(null),
    image1: new FormControl(null),
    image2: new FormControl(null),
    image3: new FormControl(null),
    image4: new FormControl(null),
    inventoryNumber: new FormControl(null),
    loves: new FormControl(null),
    isActive: new FormControl(null)
  });
  category = [];
  type = [];

  @ViewChild('editModal', { static: false }) editModal: ModalDirective;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getCategory();
    this.getType();
  }

  open() {
    this.editModal.show();
  }

  setDataForm(data) {
    console.log('data', data);
    this.updateForm.setValue({
      _id: data._id ? data._id : '',
      name: data.name ? data.name : '',
      slug: data.slug ? data.slug : '',
      avatar: data.avatar ? data.avatar : '',
      buyingPrice: data.buyingPrice ? data.buyingPrice : 0,
      saleprice: data.saleprice ? data.saleprice : 0,
      description: data.description ? data.description : '',
      shortDescription: data.shortDescription ? data.shortDescription : '',
      typeId: data.typeId ? data.typeId : '',
      categoryId: data.categoryId ? data.categoryId : '',
      image1: (data.images && data.images.length > 0) ? data.images[0] : '',
      image2: (data.images && data.images.length > 1) ? data.images[1] : '',
      image3: (data.images && data.images.length > 2) ? data.images[2] : '',
      image4: (data.images && data.images.length > 3) ? data.images[3] : '',
      inventoryNumber: data.inventoryNumber ? data.inventoryNumber : 0,
      loves: data.loves ? data.loves : 0,
      isActive: data.isActive ? data.isActive : false
    });
  }

  onSubmit() {
    const url = `${environment.urlApi}/api/updateProduct`;

    const body = {
      _id: String(this.updateForm.value._id),
      categoryId: String(this.updateForm.value.categoryId),
      typeId: String(this.updateForm.value.typeId),
      avatar: String(this.updateForm.value.avatar),
      images: [
        String(this.updateForm.value.image1),
        String(this.updateForm.value.image2),
        String(this.updateForm.value.image3),
        String(this.updateForm.value.image4),
      ],
      loves: Number(this.updateForm.value.loves),
      buyingPrice: Number(this.updateForm.value.buyingPrice),
      saleprice: Number(this.updateForm.value.saleprice),
      inventoryNumber: Number(this.updateForm.value.inventoryNumber),
      shortDescription: String(this.updateForm.value.shortDescription),
      description: String(this.updateForm.value.description),
      isActive: Boolean(this.updateForm.value.isActive)
    };

    this.http.post(url, body, { responseType: 'text' })
      .subscribe(
        res => {
          // tslint:disable-next-line:no-string-literal
          console.log(res);
          this.editModal.hide();
          this.search.emit();
          this.sharedService.activeConfetti.emit();
        }
      );
  }

  getCategory() {
    const url = `${environment.urlApi}/api/getCategory`;
    const params = new HttpParams()
      .set('pageIndex', String(0))
      .set('pageSize', String(0));

    this.http.get(url, { params })
      .subscribe(
        (res: any) => {
          const { category } = res;
          console.log('category', category);
          this.category = category;
        }
      );
  }
  getType() {
    const url = `${environment.urlApi}/api/getType`;
    const params = new HttpParams()
      .set('pageIndex', String(0))
      .set('pageSize', String(0));

    this.http.get(url, { params })
      .subscribe(
        (res: any) => {
          const { type } = res;
          console.log('type', type);
          this.type = type;
        }
      );
  }

  makeLinkImage(link) {
    if (link) {
      return `${environment.urlApi}${link}`;
    }
    return '/assets/img/no-image.jpeg';
  }

}
