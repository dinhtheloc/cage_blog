import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SharedService } from '../../../../services/shared.service';

@Component({
    selector: 'app-create-types-form',
    templateUrl: './create-types-form.component.html',
    styleUrls: ['./create-types-form.component.scss']
})
export class CreateTypesFormComponent implements OnInit {
    @Output() search = new EventEmitter();
    createForm = new FormGroup({
        name: new FormControl(null, Validators.required)
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
        const url = `${environment.urlApi}/api/createType`;

        const body = {
            name: String(this.createForm.value.name)
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


}
