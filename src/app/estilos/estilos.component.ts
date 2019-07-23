import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { Estilo } from '../Model/Estilo';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-estilos',
  templateUrl: './estilos.component.html',
  styleUrls: ['./estilos.component.css']
})
export class EstilosComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private localService: BsLocaleService
    ) {
      this.localService.use('pt-br');
    }

  estilo: any = [];
  mostrarId = true;
// tslint:disable-next-line: variable-name
  _filtroLista: string;
  estilosFiltrados: any = [];
  modalRef: BsModalRef;
  registerForm: FormGroup;
  Estilo: any;
  modo = 'post';


  ngOnInit() {
    this.validation();
    this.getEstilo();
  }

  getEstilo() {
    this.estilo = this.http.get('http://localhost:5000/api/Estilo/GetAllEstilos').subscribe(
      response => {this.estilo = response;
                   console.log(response);
                   this.estilosFiltrados = Array.from(this.estilo);
      }, error => { console.log(error); }
    );
  }

  ocultarId() {
    this.mostrarId = !this.mostrarId;
  }

  get filtroLista() { return this._filtroLista; }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.estilosFiltrados = this.filtroLista ?
      this.filtrarEstilo(this.filtroLista) :
      this.estilo;
  }

  filtrarEstilo(filtrar: string): any {
    filtrar = filtrar.toLocaleLowerCase();
    return this.estilo.filter(estilo => estilo.nome.toLocaleLowerCase().indexOf(filtrar) !== -1);
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  validation() {

    this.registerForm = new FormGroup({

        nome: new FormControl('', Validators.required),

    });
  }

  salvarAlteracao(template: any) {
    if (this.modo === 'put') {
      if (this.registerForm.valid) {
          this.estilo = Object.assign({id: this.estilo.id}, this.registerForm.value);
          this.estilo =
          this.http.put(`http://localhost:5000/api/Estilo/SaveEstilo/${this.estilo.id}`, this.estilo).subscribe(
            (novoEstilo: Estilo) => {
              console.log(novoEstilo);
              template.hide();
              this.getEstilo();
              (alert(`Atualizado com sucesso!`));
            }, error => { console.log(error);  }
          );
        }
    } else {
      if (this.registerForm.valid) {
        this.estilo = Object.assign({}, this.registerForm.value);
        this.estilo = this.http.post('http://localhost:5000/api/Estilo/SaveEstilo', this.estilo).subscribe(
          (novoEstilo: Estilo) => {
            console.log(novoEstilo);
            template.hide();
            this.getEstilo();
            (alert(`Salvo com sucesso!`));
          }, error => { console.log(error);  }
        );
      } else {
        (alert(`Erro ao gravar no banco! revise o formulário e tente novamente!`));
      }
    }
  }


  EditarEstilo(estilo: Estilo, template: any) {
    this.modo = 'put';
    this.openModal(template);
    this.estilo = estilo;
    this.registerForm.patchValue(estilo);
  }

  NovoEstilo(template: any) {
    this.modo = 'post';
    this.openModal(template);
  }

  DeletarEstilo(estilo: Estilo, template: any) {
    this.modo = 'put';
    this.openModal(template);
    this.estilo = estilo;
    this.registerForm.patchValue(estilo);
  }

  doDelete(estilo: Estilo) {
    if (confirm(`Deseja realmente apagar o estilo  ${estilo.nome} ?`)) {
      this.estilo = this.http.post('http://localhost:5000/api/Estilo/DeleteEstilo', estilo).subscribe(
         (novoEstilo: Estilo) => {
           console.log(novoEstilo);
           this.getEstilo();
        }, error => { console.log(error);  }
      );
    }

    }

}
