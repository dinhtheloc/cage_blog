import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SharedService } from '../../../services/shared.service';

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

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

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
        this.sharedService.activeConfetti.emit();
        this.childModal.hide();
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
}
