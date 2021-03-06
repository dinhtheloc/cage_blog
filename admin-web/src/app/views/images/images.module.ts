import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImagesComponent } from './images.component';
import { ImagesRoutingModule } from './images-routing.module';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { FormUploadImageComponent } from './form-upload-image/form-upload-image.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [ImagesComponent, FormUploadImageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImagesRoutingModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class ImagesModule { }
