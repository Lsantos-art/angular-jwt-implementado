import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Contato } from '@app/_interfaces/contato';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContatoService {
  currentUserSubject: any;

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

  remove(id: number) {
      return this.http.delete<Contato[]>(`${ environment.apiUrl }/contatos/${id}`);
  }

}
