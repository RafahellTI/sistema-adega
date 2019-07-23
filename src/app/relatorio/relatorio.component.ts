import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import * as jsPDF from 'jspdf';
import { Pessoa } from '../Model/Pessoa';
import { HttpClient } from '@angular/common/http';
import { Cerveja } from '../Model/Cerveja';
import { Vinho } from '../Model/vinho';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  // Construtor

  constructor( private http: HttpClient) { }

  // atributos

  pessoas: any = [];
  pessoa: Pessoa;
  mostrarId: boolean = false;
  pessoasFiltradas: any  = [];
  cervejasFiltradas: any = [] ;
  cerveja: Cerveja;
  cervejas: any = [];
  vinho: Vinho;
  vinhos: any = [];
  vinhosFiltrados: any = [];


  @ViewChild('content') Content: ElementRef;
  @ViewChild('content1') Content1: ElementRef;
  @ViewChild('content2') Content2: ElementRef;

  // métodos

  ngOnInit() {
    this.getPessoas();
    this.getCervejas();
    this.getVinhos();
  }

  getCervejas() {
    this.cervejas = this.http.get('https://homologacao.trustprev.com.br/estagio/api/Cerveja/GetAllCervejas').subscribe(
      response => {this.cervejas = response; console.log(response); this.cervejasFiltradas = Array.from( this.cervejas );
      }, error => { console.log(error);  }
    );
  }

  getPessoas() {
    this.pessoas = this.http.get('https://homologacao.trustprev.com.br/estagio/api/Pessoa/GetAllPessoas').subscribe(
      response => {this.pessoas = response; console.log(response); this.pessoasFiltradas = Array.from( this.pessoas );
      }, error => { console.log(error);  }
    );
  }
  getVinhos() {
    this.vinhos = this.http.get('https://homologacao.trustprev.com.br/estagio/api/Vinho/GetAllVinhos').subscribe(
      response => {this.vinhos = response; console.log(response); this.vinhosFiltrados = Array.from( this.vinhos );
      }, error => { console.log(error);  }
    );
  }

    // método gerar pessoas - PDF ==============================================

 public  gerarPDF() {
  // const doc  = new jsPDF('landscape'); landscape para orientar o doc em paisagem
  var doc = new jsPDF({
    orientation: 'P',
    format: [595, 842],

  });


  // doc.setFont("arial", "bold");  // configs da saída do PDF -> olhar no site
  doc.setFillColor(100, 100, 240); // https://micropyramid.com/blog/export-html-web-page-to-pdf-using-jspdf/
  // doc.setDrawColor(100, 100, 0);

  const specialElementHandlers = {

    '#editor'(element, renderer ) {
      return  true;
    }
  };

  const content = this.Content.nativeElement;

  doc.fromHTML(content.innerHTML, 10, 15, {
  width: 300,
  elementHandlers: specialElementHandlers
  });

      doc.output('dataurlnewwindow');
    // doc.save('RelatorioTeste.pdf');
  }

  // GERAR PDF CERVEJAS

 public  gerarPDFCerva() {
  // const doc  = new jsPDF('landscape'); landscape para orientar o doc em paisagem
  var doc2 = new jsPDF({
    orientation: 'p',
   // format: [595, 842],

  });

  // doc.setFont("arial", "bold");  // configs da saída do PDF -> olhar no site
  doc2.setFillColor(100, 100, 240); // https://micropyramid.com/blog/export-html-web-page-to-pdf-using-jspdf/
  // doc.setDrawColor(100, 100, 0);

  const specialElementHandlers = {

    '#editor'(element, renderer ) {
      return  true;
    }
  };

  const content1 = this.Content1.nativeElement;

  doc2.fromHTML(content1.innerHTML, 10, 15, {
  width: 300,
  elementHandlers: specialElementHandlers
  });

      doc2.output('dataurlnewwindow');
    // doc2.save('RelatorioTeste.pdf');
  }

  // GERAR VINHO
 public  gerarPDFVinho() {
  // const doc  = new jsPDF('landscape'); landscape para orientar o doc em paisagem
  var doc3 = new jsPDF({
    orientation: 'p',
   // format: [595, 842],

  });

  // doc.setFont("arial", "bold");  // configs da saída do PDF -> olhar no site
  doc3.setFillColor(100, 100, 240); // https://micropyramid.com/blog/export-html-web-page-to-pdf-using-jspdf/
  // doc.setDrawColor(100, 100, 0);

  const specialElementHandlers = {

    '#editor'(element, renderer ) {
      return  true;
    }
  };

  const content2 = this.Content2.nativeElement;

  doc3.fromHTML(content2.innerHTML, 10, 15, {
  width: 300,
  elementHandlers: specialElementHandlers
  });

      doc3.output('dataurlnewwindow');
    // doc2.save('RelatorioTeste.pdf');
  }

}
