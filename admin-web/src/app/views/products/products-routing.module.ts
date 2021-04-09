import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { ListComponent } from './list/list.component';
import { TypesComponent } from './types/types.component';
import { CategoriesComponent } from './categories/categories.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'types',
        component: TypesComponent,
      },
      {
        path: 'list',
        component: ListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
