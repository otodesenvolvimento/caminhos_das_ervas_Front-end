import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API = 'http://localhost:5000';

  // Inicializa o estado verificando se existe um usuário salvo no navegador
  private usuarioLogadoSubject = new BehaviorSubject<string | null>(this.getUsuarioInicial());
  public usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Função auxiliar para recuperar o nome do usuário do localStorage com segurança
  private getUsuarioInicial(): string | null {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);
        return user.username; // Retorna o nome guardado no JSON
      } catch {
        return null;
      }
    }
    return null;
  }

  logar(credentials: any): Observable<any> {
    return this.http.post(`${this.API}/login`, credentials, { withCredentials: true }).pipe(
      tap((res: any) => {
        // Guarda o objeto completo como string no localStorage
        localStorage.setItem('user_info', JSON.stringify(res));
        // Atualiza o componente de cabeçalho com o nome do usuário
        this.usuarioLogadoSubject.next(res.username);
      })
    );
  }

cadastrar(usuario: any): Observable<any> {
  // Criamos um novo objeto contendo APENAS o que o Schema do Flask espera
  const dadosParaOBackend = {
    username: usuario.username,
    password: usuario.password
  };

  return this.http.post(`${this.API}/register`, dadosParaOBackend);
}
  logout(): void {
    // 1. Limpa os dados do navegador
    localStorage.removeItem('user_info');

    // 2. Avisa os componentes que o usuário saiu (limpa o cabeçalho)
    this.usuarioLogadoSubject.next(null);

    // 3. Informa ao Flask para encerrar a sessão
    this.http.post(`${this.API}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => console.log('Sessão encerrada no servidor'),
      error: (err) => console.error('Erro ao encerrar sessão no servidor', err)
    });
  }
}
