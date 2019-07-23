import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../Model/Pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {


  baseUrl = 'https://homologacao.trustprev.com.br/estagio/api/Pessoa/';

  constructor(private http: HttpClient) {}

  getPessoa(){
    return this.http.get(`${this.baseUrl}${'GetAllPessoas'}`);
  }
}
