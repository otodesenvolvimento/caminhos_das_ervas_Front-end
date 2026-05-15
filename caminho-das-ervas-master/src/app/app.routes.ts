import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductFormComponent } from './components/product-form/product-form';
import { AuthComponent } from './components/auth/auth';

export const routes: Routes = [
  { path: '', component: ProductListComponent },         // Vitrine
  { path: 'admin', component: ProductFormComponent },    // Gerenciar
  { path: 'login', component: AuthComponent },          // Autenticar
  { path: '**', redirectTo: '' }                         // Redireciona erros
];
