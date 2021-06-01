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
    _id: new FormControl(null, Validators.required),
    name: new FormControl(null),
    dateOfBirth: new FormControl(null),
    address: new FormControl(null),
    phone: new FormControl(null),
    facebook: new FormControl(null),
    email: new FormControl(null)
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
      _id: data._id ? data._id : null,
      name: data.name ? data.name : null,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      address: data.address ? data.address : null,
      phone: data.phone ? data.phone : null,
      facebook: data.facebook ? data.facebook : null,
      email: data.email ? data.email : null
    });
  }

  onSubmit() {
    const url = `${environment.urlApi}/api/updateCustomer`;
    const body = {
      _id: String(this.updateForm.value._id),
      name: this.updateForm.value.name,
      dateOfBirth: this.updateForm.value.dateOfBirth,
      address: this.updateForm.value.address,
      phone: this.updateForm.value.phone,
      facebook: this.updateForm.value.facebook,
      email: this.updateForm.value.email
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


  makeLinkImage(link) {
    if (link) {
      return `${environment.urlApi}${link}`;
    }
    return '/assets/img/no-image.jpeg';
  }

}
