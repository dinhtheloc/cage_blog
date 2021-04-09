import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './list/list.component';
import { CreateFormComponent } from './list/create-form/create-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { QuillModule } from 'ngx-quill';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { EditFormComponent } from './list/edit-form/edit-form.component';
import { TypesComponent } from './types/types.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateCategoriesFormComponent } from './categories/create-form/create-categories-form.component';
import { EditCategoriesFormComponent } from './categories/edit-form/edit-categories-form.component';
import { CreateTypesFormComponent } from './types/create-form/create-types-form.component';
import { EditTypesFormComponent } from './types/edit-form/edit-types-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    QuillModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [ListComponent, CreateFormComponent, EditFormComponent, TypesComponent, CategoriesComponent,
    CreateCategoriesFormComponent,
    EditCategoriesFormComponent,
    CreateTypesFormComponent,
    EditTypesFormComponent]
})
export class ProductsModule { }
