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
        dateOfBirth: new FormControl(null),
        address: new FormControl(null),
        phone: new FormControl(null),
        facebook: new FormControl(null),
        email: new FormControl(null)
    });


    @ViewChild('childModal', { static: false }) childModal: ModalDirective;
    constructor(
        private http: HttpClient,
        private sharedService: SharedService) { }

    ngOnInit() {
    }

    open() {
        this.childModal.show();
    }

    onSubmit() {
        const url = `${environment.urlApi}/api/createCustomer`;

        const dateOfBirth = new Date(this.createForm.value.dateOfBirth);

        const body = {
            name: String(this.createForm.value.name),
            dateOfBirth,
            address: String(this.createForm.value.address),
            phone: String(this.createForm.value.phone),
            facebook: String(this.createForm.value.facebook),
            email: String(this.createForm.value.email)
        };

        this.http.post(url, body, { responseType: 'text' })
            .subscribe(
                res => {
                    // tslint:disable-next-line:no-string-literal
                    this.createForm.reset();
                    this.childModal.hide();
                    this.search.emit();
                    this.sharedService.activeConfetti.emit();
                }
            );
    }


}
