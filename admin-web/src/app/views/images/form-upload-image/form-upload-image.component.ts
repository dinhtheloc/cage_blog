import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-form-upload-image',
  templateUrl: './form-upload-image.component.html',
  styleUrls: ['./form-upload-image.component.scss']
})
export class FormUploadImageComponent implements OnInit {
  @ViewChild('childModal', { static: false }) childModal: ModalDirective;

  createForm = new FormGroup({
    file: new FormControl(null)
  });
  linkImage = '';
  
  isHide = true;
  options: AnimationOptions = {
    loop: false,
    autoplay: false,
    path: '/assets/json/confetti.json'
  };
  svgConfetti: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  open() {
    this.childModal.show();
  }

  onSubmit() {
    const url = `${environment.urlApi}/api/createImage`;
    const formData: FormData = new FormData();
    formData.append('image', this.createForm.get('file').value);
    this.http.post(url, formData, { responseType: 'text' }).subscribe(
      res => {
        // tslint:disable-next-line:no-string-literal
        this.isHide = false;
        this.svgConfetti.goToAndPlay(0, true);
        this.linkImage = `${environment.urlApi}${res}`;
      }
    );
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createForm.get('file').setValue(file);
    }
  }

  complete(animationItem: AnimationItem): void {
    this.isHide = true;
  }

  animationCreated(animationItem: AnimationItem): void {
    this.svgConfetti = animationItem;
  }
}
