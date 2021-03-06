import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersRoutingModule } from './customers-routing.module';
import { ListComponent } from './list/list.component';
import { CreateFormComponent } from './list/create-form/create-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { QuillModule } from 'ngx-quill';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { EditFormComponent } from './list/edit-form/edit-form.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    QuillModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [ListComponent, CreateFormComponent, EditFormComponent]
})
export class CustomersModule { }
