import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-create-form',
    templateUrl: './create-form.component.html'
})
export class CreateFormComponent implements OnInit {

    createForm = new FormGroup({
        title: new FormControl('', Validators.required),
        body: new FormControl(''),
        published: new FormControl(false)
    });

    @ViewChild('childModal', { static: false }) childModal: ModalDirective;
    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    open() {
        this.childModal.show();
    }


    onSubmit() {
        console.warn('onSubmit', this.createForm.value);

        const url = `${environment.urlApi}/api/createArticle`;

        const body = {
            title: String(this.createForm.value.title),
            body: String(this.createForm.value.body),
            published: Boolean(this.createForm.value.published)
        };


        this.http.post(url, body, { responseType: 'text' })
            .subscribe(
                res => {
                    // tslint:disable-next-line:no-string-literal
                    console.log(res);
                    // localStorage.setItem('token', res['token']);
                    // this.router.navigate(['/']);
                }
            );
    }

}
