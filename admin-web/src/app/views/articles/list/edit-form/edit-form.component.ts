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
    _id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    banner: new FormControl(''),
    body: new FormControl(''),
    published: new FormControl(false)
  });

  @ViewChild('editModal', { static: false }) editModal: ModalDirective;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  open() {
    this.editModal.show();
  }

  setDataForm(data) {
    this.updateForm.setValue({
      _id: data._id ? data._id : '',
      title: data.title ? data.title : '',
      banner: data.banner ? data.banner : '',
      body: data.body ? data.body : '',
      published: data.published ? data.published : false
    });
  }

  onSubmit() {
    const url = `${environment.urlApi}/api/updateArticle`;

    const body = {
      _id: String(this.updateForm.value._id),
      title: String(this.updateForm.value.title),
      banner: String(this.updateForm.value.banner),
      body: String(this.updateForm.value.body),
      published: Boolean(this.updateForm.value.published)
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
}
