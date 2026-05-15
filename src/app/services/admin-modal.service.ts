import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminModalService {
  // Signal para controlar se o modal está aberto ou fechado
  exibirAdmin = signal(false);

  abrir() {
    this.exibirAdmin.set(true);
    document.body.style.overflow = 'hidden'; // Trava o scroll ao abrir
  }

  fechar() {
    this.exibirAdmin.set(false);
    document.body.style.overflow = 'auto'; // Liberta o scroll ao fechar
  }
}
