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
        title: new FormControl('', Validators.required),
        banner: new FormControl(''),
        body: new FormControl(''),
        image400x400: new FormControl(''),
        description: new FormControl(''),
        published: new FormControl(false)
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
        const url = `${environment.urlApi}/api/createArticle`;

        const body = {
            title: String(this.createForm.value.title),
            banner: String(this.createForm.value.banner),
            body: String(this.createForm.value.body),
            image400x400: String(this.createForm.value.image400x400),
            description: String(this.createForm.value.description),
            published: Boolean(this.createForm.value.published)
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
