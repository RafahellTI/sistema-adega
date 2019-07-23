import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { Pessoa } from '../Model/Pessoa';
import { Estado } from '../Model/Estado';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private localService: BsLocaleService
    ) {
      this.localService.use('pt-br');
    }

  get filtroLista() { return this._filtroLista; }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.pessoasFiltradas = this.filtroLista ?
      this.filtrarPessoa(this.filtroLista) :
      this.pessoa;
  }

  pessoa: any = [];
  mostrarId = true;
// tslint:disable-next-line: variable-name
  _filtroLista: string;
  pessoasFiltradas: any = [];
  modalRef: BsModalRef;
  registerForm: FormGroup;
  Pessoa: any;
  modo = 'post';

  // estados
  estado: any = [];
  estadosFiltrados: any = [];
  Estado: any;

  ngOnInit() {
    this.validation();
    this.getPessoa();
    this.getEstado();
  }
  getPessoa() {
    this.pessoa = this.http.get('https://homologacao.trustprev.com.br/estagio/api/Pessoa/GetAllPessoas').subscribe(
      response => {this.pessoa = response;
                   console.log(response);
                   this.pessoasFiltradas = Array.from(this.pessoa);
      }, error => { console.log(error); }
    );
  }

  getEstado() {
    this.estado = this.http.get('https://homologacao.trustprev.com.br/estagio/api/Diversos/GetAllEstados').subscribe(
      response => {this.estado = response;
                   console.log(response);
                   this.estadosFiltrados = Array.from(this.estado);
      }, error => { console.log(error); }
    );
  }

  ocultarId() {
    this.mostrarId = !this.mostrarId;
  }

  filtrarPessoa(filtrar: string): any {
    filtrar = filtrar.toLocaleLowerCase();
    return this.pessoa.filter(pessoa => pessoa.nome.toLocaleLowerCase().indexOf(filtrar) !== -1);
  }

  filtrarEstado(filtrar: string): any {
    filtrar = filtrar.toLocaleLowerCase();
    return this.estado.filter(estado => estado.uf.toLocaleLowerCase().indexOf(filtrar) !== -1);
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  validation() {

    this.registerForm = new FormGroup({

        nome: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]),
        cpf: new FormControl('', Validators.required),
        telFixo: new FormControl('', [ Validators.maxLength(11), Validators.minLength(10)]),
        celular: new FormControl('', [ Validators.maxLength(11), Validators.minLength(11)]),
        dataNasc: new FormControl('', Validators.required),
        email: new FormControl(''),
        fb: new FormControl(''),
        insta: new FormControl(''),
        uf: new FormControl(''),
        cidade: new FormControl(''),
        complemento: new FormControl(''),
        bairro: new FormControl(''),
        rua: new FormControl(''),
        cep: new FormControl(''),
    });
  }

  salvarAlteracao(template: any) {
    if (this.modo === 'put') {
      if (this.registerForm.valid) {
          this.pessoa = Object.assign({id: this.pessoa.id}, this.registerForm.value);
          this.pessoa =
          this.http.put(`https://homologacao.trustprev.com.br/estagio/api/Pessoa/SavePessoa/${this.pessoa.id}`, this.pessoa).subscribe(
            (novaPessoa: Pessoa) => {
              console.log(novaPessoa);
              template.hide();
              this.getPessoa();
              (alert(`Atualizado com sucesso!`));
            }, error => { console.log(error); }
          );
        }
    } else {
      if (this.registerForm.valid) {
        this.pessoa = Object.assign({}, this.registerForm.value);
        this.pessoa = this.http.post('https://homologacao.trustprev.com.br/estagio/api/Pessoa/SavePessoa', this.pessoa).subscribe(
          (novaPessoa: Pessoa) => {
            console.log(novaPessoa);
            template.hide();
            this.getPessoa();
            (alert(`Salvo com sucesso!`));
          }, error => { console.log(error); }
        );
      } else {
        (alert(`Erro ao gravar no banco! revise o formulário e tente novamente!`));
      }
    }
  }

  EditarPessoa(pessoa: Pessoa, template: any) {
    this.modo = 'put';
    this.openModal(template);
    this.pessoa = pessoa;
    this.registerForm.patchValue(pessoa);
  }

  NovaPessoa(template: any) {
    this.modo = 'post';
    this.openModal(template);
  }

  DeletarPessoa(pessoa: Pessoa, template: any) {
    this.modo = 'put';
    this.openModal(template);
    this.pessoa = pessoa;
    this.registerForm.patchValue(pessoa);
  }

  doDelete(pessoa: Pessoa) {
    if (confirm(`Deseja realmente apagar a pessoa ${pessoa.nome} ?`)) {
      this.pessoa = this.http.post('https://homologacao.trustprev.com.br/estagio/api/Pessoa/DeletePessoa', pessoa).subscribe(
         (novaPessoa: Pessoa) => {
           console.log(novaPessoa);
           this.getPessoa();
        }, error => { console.log(error);  }
      );
    }

    }

}
