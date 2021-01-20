import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
    selector: 'app-create-form',
    templateUrl: './create-form.component.html',
    styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
    @Output() search = new EventEmitter();
    createForm = new FormGroup({
        title: new FormControl('', Validators.required),
        body: new FormControl(''),
        published: new FormControl(false)
    });

    isHide = true;
    options: AnimationOptions = {
        loop: false,
        autoplay: false,
        path: '/assets/json/confetti.json'
    };
    svgConfetti: any;

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
                    this.isHide = false;
                    this.svgConfetti.goToAndPlay(0, true);
                    this.childModal.hide();
                    this.search.emit();
                    // localStorage.setItem('token', res['token']);
                    // this.router.navigate(['/']);
                }
            );
    }

    complete(animationItem: AnimationItem): void {
        this.isHide = true;
    }

    animationCreated(animationItem: AnimationItem): void {
        this.svgConfetti = animationItem;
    }

}
