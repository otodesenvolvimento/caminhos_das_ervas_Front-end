import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductFormComponent } from './components/product-form/product-form';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    productToEdit: Product | null = null;

  protected readonly title = signal('caminho-das-ervas-frontend');

  // Armazena o produto que clicamos em "Editar"


  constructor(private router: Router) {} // Injete o router
  // Esta função é chamada sempre que você muda de página/rota
  onRouteActivate(component: any) {
    // Se entramos na lista de produtos
    if (component instanceof ProductListComponent) {
      component.onEdit.subscribe((product: Product) => {
        this.productToEdit = product;
        console.log('App capturou produto para edição:', product);
        this.router.navigate(['/admin']);// Salva o produto
        // Você pode adicionar um redirecionamento automático se quiser:
        // this.router.navigate(['/admin']);
      });
    }

    // Se entramos no formulário (página admin)
    if (component instanceof ProductFormComponent) {
      if (this.productToEdit) {
        console.log('App entregando produto ao Formulário...');
        component.productToEdit = this.productToEdit; // Passa para o @Input do Form

        // Dispara manualmente o preenchimento, caso o ngOnChanges não pegue a tempo
        component.editing = true;
        component.newProduct = { ...this.productToEdit };

        this.productToEdit = null; // Limpa a ponte
      }
    }
  }
}
