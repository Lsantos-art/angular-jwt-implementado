import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Contato } from '@app/_interfaces/contato';
import { ContatoService } from '@app/_services/contato.service';

@Component({
  selector: 'app-contato-persist',
  templateUrl: './contato-persist.component.html',
  styleUrls: ['./contato-persist.component.css']
})
export class ContatoPersistComponent implements OnInit {

  form: FormGroup;
  type: string;
  id: number;
  contato: Contato = {
    id: '',
    name: '',
    email: '',
    facebook_link: '',
    linkedin_link: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    protected contatosService: ContatoService
  ) { }

  ngOnInit() {
    this.type = this.data.type;
    this.setType();
    this.formInit();
  }

  setType() {
    if (this.type == 'EDIT') {

      this.contatosService.edit(this.data.id).subscribe((data: any) => {
        if (data.contato) {
          this.contato = data.contato;
          this.updateForm();
        }else{
          alert(data.message);
          window.location.reload();
        }
      });

    }
  }

  formInit() : void {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      facebook_link: [''],
      linkedin_link: [''],
    });
  }

  updateForm() : void {
    this.form.patchValue({
      id: this.contato.id,
      name: this.contato.name,
      email: this.contato.email,
      facebook_link: this.contato.facebook_link,
      linkedin_link: this.contato.linkedin_link,
    });
  }

  validaForm() : void {

      if (this.type != 'EDIT' && this.form.valid) {

        this.contatosService.save(this.form).subscribe((data: any) => {
          alert(data.message);
          window.location.reload();
        });

      }else{

        this.contatosService.update(this.form).subscribe((data: any) => {
          alert(data.message);
          window.location.reload();
        });

      }
  }

}
