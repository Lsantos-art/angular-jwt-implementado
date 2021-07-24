import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Telefone } from '@app/_interfaces/telefone';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TelefoneService {

  constructor(private http: HttpClient) { }

  save(formGroup: FormGroup) {
      return this.http.post(`${ environment.apiUrl }/contatos/telefone`, formGroup.value);
  }

  remove(id: number) {
      return this.http.delete(`${ environment.apiUrl }/contatos/telefone/${id}`);
  }

}
