import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { ddd } from '@app/_helpers/ddd';
import { Telefone } from '@app/_interfaces/telefone';
import { ContatoService } from '@app/_services/contato.service';
import { TelefoneService } from '@app/_services/telefone.service';

@Component({
  selector: 'app-telefones',
  templateUrl: './telefones.component.html',
  styleUrls: ['./telefones.component.css']
})
export class TelefonesComponent implements OnInit {

  displayedColumns: string[] = ['tipo', 'numero', 'actions'];
  dataSource = new MatTableDataSource<Telefone>();

  hasData: boolean;
  form: FormGroup;
  type: string;
  id: number;
  ddd: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    protected telefoneService: TelefoneService,
    protected contatosService: ContatoService,
  ) { }

  ngOnInit() {
    this.ddd = ddd;
    this.id = this.data.id;
    this.updateDataSource();
    this.formInit();
  }

  formInit() : void {
    this.form = this.formBuilder.group({
      contato_id: [this.id, Validators.required],
      tipo: ['', Validators.required],
      ddd: ['', Validators.required],
      numero: ['', Validators.required],
    });
  }

  updateDataSource() {
    this.contatosService.getTelefones(this.id).subscribe(
      data => {
          if (data.length > 0) {
            this.hasData = true;
          }
          this.dataSource.data = data;
      });
  }

  validaForm() : void {
    if (this.form.valid) {
      this.telefoneService.save(this.form).subscribe((data: any) => {
        alert(data.message);
        this.updateDataSource();
      });
    }
  }

  onRemove(id: number) : void {
    this.telefoneService.remove(id).subscribe((data: any) => {
      alert(data.message);
      this.updateDataSource();
    });
  }

  getDescTipo(tipo: string) : string  {

    if (tipo == 'R') {
      return 'Residencial';
    }

    if (tipo == 'C') {
      return 'Comercial';
    }

    if (tipo == 'CE') {
      return 'Celular';
    }

  }

}
