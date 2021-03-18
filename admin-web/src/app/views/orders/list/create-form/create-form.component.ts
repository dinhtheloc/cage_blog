import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SharedService } from '../../../../services/shared.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-create-form',
    templateUrl: './create-form.component.html',
    styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
    @Output() search = new EventEmitter();
    createForm = new FormGroup({
        customer: new FormControl(null, Validators.required),
        address: new FormControl('')
    });
    selected;
    selectedProduct = [];
    customer = [];
    product = [];
    @ViewChild('childModal', { static: false }) childModal: ModalDirective;
    constructor(
        private http: HttpClient,
        private sharedService: SharedService,
        private toastr: ToastrService) { }

    ngOnInit() {
        this.getCustomer();
    }

    open() {
        this.childModal.show();
        this.getProduct();
        this.clearData();
    }

    clearData() {
        this.selectedProduct = [];
        this.createForm.reset();
    }

    onSubmit() {

        if (this.selectedProduct.length === 0) {
            this.toastr.error('Danh sách sản phẩm đang trống', 'Ops!');
            return;
        }

        const url = `${environment.urlApi}/api/createOrder`;

        const body = {
            name: String(this.createForm.value.customer.name),
            address: String(this.createForm.value.address),
            customerInfo: this.createForm.value.customer,
            list: this.selectedProduct,
            totalAmount: this.getTotalIndex5(),
            profitAmount: this.getTotalIndex6(),
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

    getCustomer() {
        const url = `${environment.urlApi}/api/getCustomer`;
        const params = new HttpParams()
            .set('pageIndex', String(0))
            .set('pageSize', String(0));
        this.http.get(url, { params })
            .subscribe(
                (res: any) => {
                    const { customer } = res;
                    console.log('customer', customer);
                    this.customer = customer;
                }
            );
    }

    getProduct() {
        const url = `${environment.urlApi}/api/getProduct`;
        const params = new HttpParams()
            .set('pageIndex', String(0))
            .set('pageSize', String(0));
        this.http.get(url, { params })
            .subscribe(
                (res: any) => {
                    const { product } = res;
                    console.log('product', product);
                    this.product = product;
                }
            );
    }

    makeLinkImage(link) {
        return `${environment.urlApi}${link}`;
    }

    typeaheadOnSelect(e: TypeaheadMatch): void {
        if (e.item.inventoryNumber === 0) {
            this.toastr.error('Số lượng tồn kho đã hết', 'Ops!');
            return;
        }

        if (this.selectedProduct.length > 0) {
            for (const i of this.selectedProduct) {
                if (e.item._id === i._id) {
                    this.toastr.error('Sản phẩm đã được chọn', 'Ops!');
                    return;
                }
            }
        }

        e.item.quantity = 1;
        this.selectedProduct.push(e.item);
    }

    onChangeQuantity($event, index) {
        const value = $event.target.value;
        const inventoryNumber = this.selectedProduct[index].inventoryNumber;
        if (value > inventoryNumber) {
            this.toastr.error('Sản phẩm đã vượt quá hàng tồn kho', 'Ops!');
            this.selectedProduct[index].quantity = inventoryNumber;
        }
    }

    getTotalIndex2() {
        if (this.selectedProduct.length > 0) {
            let result = 0;
            for (const i of this.selectedProduct) {
                result += i.buyingPrice;
            }
            return result;
        }

        return 0;
    }

    getTotalIndex3() {
        if (this.selectedProduct.length > 0) {
            let result = 0;
            for (const i of this.selectedProduct) {
                result += i.saleprice;
            }
            return result;
        }

        return 0;
    }

    getTotalIndex4() {
        if (this.selectedProduct.length > 0) {
            let result = 0;
            for (const i of this.selectedProduct) {
                result += (i.buyingPrice * i.quantity);
            }
            return result;
        }

        return 0;
    }

    getTotalIndex5() {
        if (this.selectedProduct.length > 0) {
            let result = 0;
            for (const i of this.selectedProduct) {
                result += (i.saleprice * i.quantity);
            }
            return result;
        }

        return 0;
    }

    getTotalIndex6() {
        if (this.selectedProduct.length > 0) {
            let result = 0;
            for (const i of this.selectedProduct) {
                result += ((i.saleprice * i.quantity) - (i.buyingPrice * i.quantity));
            }
            return result;
        }

        return 0;
    }

    removeItemWithIndex(index) {
        this.selectedProduct.splice(index, 1);
    }

}
