import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ListComponent } from './list/list.component';
import { CreateFormComponent } from './list/create-form/create-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { QuillModule } from 'ngx-quill';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LottieModule } from 'ngx-lottie';

export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArticlesRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    QuillModule.forRoot(),
    PaginationModule.forRoot(),
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [ListComponent, CreateFormComponent]
})
export class ArticlesModule { }