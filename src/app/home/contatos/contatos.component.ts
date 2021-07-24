import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Contato } from '@app/_interfaces/contato';
import { ContatoService } from '@app/_services/contato.service';
import { MatDialog }                 from "@angular/material/dialog";
import { ContatoPersistComponent } from '../contato-persist/contato-persist.component';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})

export class ContatosComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'email', 'actions'];
  dataSource = new MatTableDataSource<Contato>();

  constructor(
    protected contatosService: ContatoService,
    protected dialog?: MatDialog,
  ) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.updateDataSource();
  }

  updateDataSource() {
    this.contatosService.getAll().subscribe(
        data => {
          this.dataSource.data = data;
    });
  }

  openDialog(type : number, id?: number) : void {
    this.dialog.open(ContatoPersistComponent,
        {
          width: '500px',
          data: {
            type: type,
            id: id,
          },
          disableClose: true,
        }
    );
  }

  onRemove(id: number) {
    this.contatosService.remove(id).subscribe((data: any) => {
      alert(data.message);
      this.updateDataSource();
    });
  }

}
