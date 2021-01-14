import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImagesComponent } from './images.component';
import { ImagesRoutingModule } from './images-routing.module';
import { PopoverModule } from 'ngx-bootstrap/popover';


@NgModule({
  declarations: [ImagesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImagesRoutingModule,
    PopoverModule.forRoot()
  ]
})
export class ImagesModule { }
