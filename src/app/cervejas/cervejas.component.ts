import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { Cerveja } from '../Model/Cerveja';
import { Estilo } from '../Model/Estilo';
import {EstilosComponent} from '../estilos/estilos.component';
import {Pais} from '../Model/pais';



defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-cervejas',
  templateUrl: './cervejas.component.html',
  styleUrls: ['./cervejas.component.css']
})
export class CervejasComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private localService: BsLocaleService
    ) {
      this.localService.use('pt-br');
    }

  cerveja: any = [];
  mostrarId = true;
// tslint:disable-next-line: variable-name
  _filtroLista: string;
  cervejasFiltradas: any = [];
  modalRef: BsModalRef;
  registerForm: FormGroup;
  registerFormEstilo: FormGroup;
  Cerveja: any;
  modo = 'post';

  // estilo
    estilosFiltrados: any = [];
    Estilo: any;
    estilo: any = [];
    _filtroListaEstilo: string;

// prop da lista países
pais: any = [];
paisesFiltrados: any = [];
Pais: any;




  ngOnInit() {
    this.validation();
    this.getCerveja();
   // this.getEstilo();
    this.getPais();
    // this.listarEstilo();
  }

  getCerveja() {
    this.cerveja = this.http.get('https://homologacao.trustprev.com.br/estagio/api/Cerveja/GetAllCervejas').subscribe(
      response => {this.cerveja = response;
                   console.log(response);
                   this.cervejasFiltradas = Array.from(this.cerveja);
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
  get filtroListaEstilo() { return this._filtroListaEstilo; }

  set filtroListaEstilo(value: string) {
    this._filtroListaEstilo = value;
    this.estilosFiltrados = this.filtroListaEstilo ?
      this.filtrarEstilo(this.filtroListaEstilo) :
      this.estilo;
  }
  filtrarEstilo(filtrar: string): any {
    filtrar = filtrar.toLocaleLowerCase();
    return this.estilo.filter(estilo => estilo.nome.toLocaleLowerCase().indexOf(filtrar) !== -1);
  }

  get filtroLista() { return this._filtroLista; }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.cervejasFiltradas = this.filtroLista ?
      this.filtrarCerveja(this.filtroLista) :
      this.cerveja;
  }

  filtrarCerveja(filtrar: string): any {
    filtrar = filtrar.toLocaleLowerCase();
    return this.cerveja.filter(pessoa => pessoa.nome.toLocaleLowerCase().indexOf(filtrar) !== -1);
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

        nome: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]),
        marca: new FormControl('', Validators.required),
        familia: new FormControl('', Validators.required),
        cor: new FormControl(''),
        abv: new FormControl(''),
        ibu: new FormControl(''),
        nacionalidade: new FormControl(''),
        valor: new FormControl(''),
        estilo: new FormControl(''),
    });
  }

  salvarAlteracao(template: any) {
    if (this.modo === 'put') {
      if (this.registerForm.valid) {
          this.cerveja = Object.assign({id: this.cerveja.id}, this.registerForm.value);
          this.cerveja =
          this.http.put(`https://homologacao.trustprev.com.br/estagio/api/Cerveja/SaveCerveja/${this.cerveja.id}`, this.cerveja).subscribe(
            (novaCerveja: Cerveja) => {
              console.log(novaCerveja);
              template.hide();
              this.getCerveja();
              (alert(`Atualizado com sucesso!`));
            }, error => { console.log(error);
            }
          );
        }
    } else {
      if (this.registerForm.valid) {
        this.cerveja = Object.assign({}, this.registerForm.value);
        this.cerveja = this.http.post('https://homologacao.trustprev.com.br/estagio/api/Cerveja/SaveCerveja', this.cerveja).subscribe(
          (novaCerveja: Cerveja) => {
            console.log(novaCerveja);
            template.hide();
            this.getCerveja();
            (alert(`Salvo com sucesso!`));
          }, error => { console.log(error);  }
        );
      } else {
        (alert(`Erro ao gravar no banco, revise o formulário e tente novamente!`));
      }
    }
  }

  EditarCerveja(cerveja: Cerveja, template: any) {
    this.modo = 'put';
    this.openModal(template);
    this.cerveja = cerveja;
    this.registerForm.patchValue(cerveja);
  }

  NovaCerveja(template: any) {
    this.modo = 'post';
    this.openModal(template);
  }

  DeletarCerveja(cerveja: Cerveja, template: any) {
    this.modo = 'put';
    this.openModal(template);
    this.cerveja = cerveja;
    this.registerForm.patchValue(cerveja);
  }

  doDelete(cerveja: Cerveja) {
    if (confirm(`Deseja realmente apagar a cerveja ${cerveja.nome} ?`)) {
      this.cerveja = this.http.post('https://homologacao.trustprev.com.br/estagio/api/Cerveja/DeleteCerveja', cerveja).subscribe(
         (novaCerveja: Cerveja) => {
           console.log(novaCerveja);
           this.getCerveja();
        }, error => { console.log(error);  }
      );
    }
  }

  /* listarEstilo() {
    if (this.cerveja.estiloId === this.estilo.id) {
         this.vaux = this.estilo.nome;
         return this.vaux;
    }
   }*/

}

