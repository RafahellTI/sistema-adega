import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { Vinho } from '../Model/vinho';
import {Pais} from '../Model/pais';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-vinhos',
  templateUrl: './vinhos.component.html',
  styleUrls: ['./vinhos.component.css']
})
export class VinhosComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private localService: BsLocaleService
    ) {
      this.localService.use('pt-br');
    }

  vinho: any = [];
  mostrarId = true;
// tslint:disable-next-line: variable-name
  _filtroLista: string;
  vinhosFiltrados: any = [];
  modalRef: BsModalRef;
  registerForm: FormGroup;
  Vinho: any;
  modo = 'post';

  // prop da lista países
pais: any = [];
paisesFiltrados: any = [];
Pais: any;


  ngOnInit() {
    this.validation();
    this.getVinho();
    this.getPais();
  }

  getVinho() {
    this.vinho = this.http.get('https://homologacao.trustprev.com.br/estagio/api/Vinho/GetAllVinhos').subscribe(
      response => {this.vinho = response;
                   console.log(response);
                   this.vinhosFiltrados = Array.from(this.vinho);
      }, error => { console.log(error); }
    );
  }
  getPais() {
    this.pais = this.http.get('https://homologacao.trustprev.com.br/estagio/api/Diversos/GetAllPaises').subscribe(
      response => {this.pais = response;
                   console.log(response);
                   this.paisesFiltrados = Array.from(this.pais);
      }, error => { console.log(error); }
    );
  }

  ocultarId() {
    this.mostrarId = !this.mostrarId;
  }

  get filtroLista() { return this._filtroLista; }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.vinhosFiltrados = this.filtroLista ?
      this.filtrarVinho(this.filtroLista) :
      this.vinho;
  }

  filtrarVinho(filtrar: string): any {
    filtrar = filtrar.toLocaleLowerCase();
    return this.vinho.filter(vinho => vinho.nome.toLocaleLowerCase().indexOf(filtrar) !== -1);
  }
  
  filtrarPais(filtrar: string): any {
    filtrar = filtrar.toLocaleLowerCase();
    return this.pais.filter(pais => pais.nome.toLocaleLowerCase().indexOf(filtrar) !== -1);
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  validation() {

    this.registerForm = new FormGroup({

        nome: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]),
        tipo: new FormControl('', Validators.required),
        uva: new FormControl('', Validators.required),
        safra: new FormControl('', Validators.required),
        pais: new FormControl('', Validators.required),
        preco: new FormControl('', Validators.required)

    });
  }

  salvarAlteracao(template: any) {
    if (this.modo === 'put') {
      if (this.registerForm.valid) {
          this.vinho = Object.assign({id: this.vinho.id}, this.registerForm.value);
          this.vinho =
          this.http.put(`https://homologacao.trustprev.com.br/estagio/api/Vinho/SaveVinho/${this.vinho.id}`, this.vinho).subscribe(
            (novoVinho: Vinho) => {
              console.log(novoVinho);
              template.hide();
              this.getVinho();
              (alert(`Atualizado com sucesso!`));
            }, error => { console.log(error);  }
          );
        }
    } else {
      if (this.registerForm.valid) {
        this.vinho = Object.assign({}, this.registerForm.value);
        this.vinho = this.http.post('https://homologacao.trustprev.com.br/estagio/api/Vinho/SaveVinho', this.vinho).subscribe(
          (novoVinho: Vinho) => {
            console.log(novoVinho);
            template.hide();
            this.getVinho();
            (alert(`Salvo com sucesso!`));
          }, error => { console.log(error);  }
        );
      } else {
        (alert(`Erro ao gravar no banco, revise o formulário e tente novamente!`));
      }
    }
  }

  EditarVinho(vinho: Vinho, template: any) {
    this.modo = 'put';
    this.openModal(template);
    this.vinho = vinho;
    this.registerForm.patchValue(vinho);
  }

  NovoVinho(template: any) {
    this.modo = 'post';
    this.openModal(template);
  }

  DeletarVinho(vinho: Vinho, template: any) {
    this.modo = 'put';
    this.openModal(template);
    this.vinho = vinho;
    this.registerForm.patchValue(vinho);
  }

  doDelete(vinho: Vinho) {
    if (confirm(`Deseja realmente apagar o vinho ${vinho.nome} ?`)) {
      this.vinho = this.http.post('https://homologacao.trustprev.com.br/estagio/api/Vinho/DeleteVinho', vinho).subscribe(
         (novoVinho: Vinho) => {
           console.log(novoVinho);
           this.getVinho();
        }, error => { console.log(error);  }
      );
    }

    }

}
