import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private usuarioLogado: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  
  get usuarioLogado$(){
    return this.usuarioLogado;
  }
  setUsuarioLogado(email: string){
    localStorage.setItem('usuarioLogado', email); // 💾 SALVA
    this.usuarioLogado.next(email);
  }

  logout(){
    localStorage.removeItem('usuarioLogado'); // 💾 SALVA
    this.usuarioLogado.next(null);
  }
}
