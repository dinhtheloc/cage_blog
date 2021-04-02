import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SharedService } from '../../../../services/shared.service';

@Component({
    selector: 'app-create-form',
    templateUrl: './create-form.component.html',
    styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
    @Output() search = new EventEmitter();
    createForm = new FormGroup({
        name: new FormControl(null, Validators.required),
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

    @ViewChild('childModal', { static: false }) childModal: ModalDirective;
    constructor(
        private http: HttpClient,
        private sharedService: SharedService) { }

    ngOnInit() {
        this.getCategory();
        this.getType();
    }

    open() {
        this.childModal.show();
    }

    onSubmit() {
        const url = `${environment.urlApi}/api/createProduct`;

        const body = {
            name: String(this.createForm.value.name),
            categoryId: String(this.createForm.value.categoryId),
            typeId: String(this.createForm.value.typeId),
            avatar: String(this.createForm.value.avatar),
            images: [
                String(this.createForm.value.image1),
                String(this.createForm.value.image2),
                String(this.createForm.value.image3),
                String(this.createForm.value.image4),
            ],
            loves: Number(this.createForm.value.loves),
            buyingPrice: Number(this.createForm.value.buyingPrice),
            saleprice: Number(this.createForm.value.saleprice),
            inventoryNumber: Number(this.createForm.value.inventoryNumber),
            shortDescription: String(this.createForm.value.shortDescription),
            description: String(this.createForm.value.description),
            isActive: Boolean(this.createForm.value.isActive)
        };

        this.http.post(url, body, { responseType: 'text' })
            .subscribe(
                res => {
                    // tslint:disable-next-line:no-string-literal
                    this.childModal.hide();
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
