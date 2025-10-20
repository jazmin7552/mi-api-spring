import { Routes } from '@angular/router';
import { ProductoList } from './producto-list/producto-list';
import { ProductoForm } from './producto-form/producto-form';

export const routes: Routes = [
  { path: '', component: ProductoList },
  { path: 'create', component: ProductoForm },
  { path: 'edit/:id', component: ProductoForm },
  { path: '**', redirectTo: '' }
];
