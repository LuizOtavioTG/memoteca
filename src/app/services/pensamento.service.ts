import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from '../interfaces/pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = "http://localhost:3001/pensamentos"
  constructor(private http: HttpClient) { }

  listar(pageNumb: number, filtro: string, favoritos:boolean): Observable<Pensamento[]> {
    //CONCATENANDO VALORES NA URL
    //return this.http.get<Pensamento[]>(`${this.API}?_page=${pageNumb}&_limit=6`)

    //UTILIZANDO HTTPPARAMS
    const limitItens = 6;
    let params = new HttpParams()
      .set("_page", pageNumb)
      .set("_limit", limitItens)

    if (filtro.trim().length > 2) {
      params = params.set("q", filtro)
    }
    if (favoritos) {
      params = params.set("favorito", true)
    }
    return this.http.get<Pensamento[]>(this.API, { params: params })
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento)
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.delete<Pensamento>(url)
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url)
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito
    return this.editar(pensamento)
  }
}
