import { Routes } from '@angular/router';
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
// Novos componentes importados
import { AuthComponent } from './components/auth/auth';
import { ProductFormComponent } from './components/product-form/product-form';
import { ProductListComponent } from './components/product-list/product-list';

export const routes: Routes = [
  { path: "", component:  PaginaInicialComponent },
  { path: "login", component: LoginComponent },
  { path: "produtos", component: ProdutosComponent },
  { path: 'pagamento', component: PagamentoComponent },
  { path: "cadastro", component: CadastroComponent },
  // Rotas Administrativas
  { path: 'admin/auth', component: AuthComponent },
  { path: 'admin/dashboard', component: ProductListComponent },
  { path: 'admin/gerenciar', component: ProductFormComponent },
  { path: '**', redirectTo: '' }
];
