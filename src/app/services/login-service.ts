import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment'; // <-- IMPORTAÇÃO DO AMBIENTE

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API: string; // <-- Removido o 'readonly' e o texto fixo para permitir atribuição dinâmica

  // Inicializa o estado verificando se existe um usuário salvo no navegador
  private usuarioLogadoSubject = new BehaviorSubject<string | null>(this.getUsuarioInicial());
  public usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor(private http: HttpClient) { 
    // Validação inteligente: se rodar local usa localhost, senão usa a URL do Render
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      this.API = 'http://localhost:5000';
    } else {
      this.API = environment.apiUrl;
    }
  }

  // Função auxiliar para recuperar o nome do usuário do localStorage com segurança
  private getUsuarioInicial(): string | null {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);
        return user.username; 
      } catch {
        return null;
      }
    }
    return null;
  }

  logar(credentials: any): Observable<any> {
    return this.http.post(`${this.API}/login`, credentials, { withCredentials: true }).pipe(
      tap((res: any) => {
        localStorage.setItem('user_info', JSON.stringify(res));
        this.usuarioLogadoSubject.next(res.username);
      })
    );
  }

  cadastrar(usuario: any): Observable<any> {
    const dadosParaOBackend = {
      username: usuario.username,
      password: usuario.password
    };
    return this.http.post(`${this.API}/register`, dadosParaOBackend);
  }

  logout(): void {
    localStorage.removeItem('user_info');
    this.usuarioLogadoSubject.next(null);

    this.http.post(`${this.API}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => console.log('Sessão encerrada no servidor'),
      error: (err) => console.error('Erro ao encerrar sessão no servidor', err)
    });
  }
}
