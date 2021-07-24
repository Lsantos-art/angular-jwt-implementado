import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Contato } from '@app/_interfaces/contato';
import { Telefone } from '@app/_interfaces/telefone';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContatoService {

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<Contato[]>(`${ environment.apiUrl }/contatos`);
  }

  save(formGroup: FormGroup) {
      return this.http.post(`${ environment.apiUrl }/contatos`, formGroup.value);
  }

  edit(id: number) {
      return this.http.get<Contato[]>(`${ environment.apiUrl }/contatos/${id}`);
  }

  update(formGroup: FormGroup) {
      return this.http.post<Contato[]>(`${ environment.apiUrl }/contatos/update`,  formGroup.value);
  }

  remove(id: number) {
      return this.http.delete(`${ environment.apiUrl }/contatos/${id}`);
  }

  getTelefones(id: number) {
      return this.http.get<Telefone[]>(`${ environment.apiUrl }/contatos/telefones/${id}`);
  }

}
