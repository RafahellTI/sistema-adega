import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFormatPipePipe } from './_helper/DateFormatPipe.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap';
import { PessoasComponent } from './pessoas/pessoas.component';
import { HomeComponent } from './home/home.component';
import { EstilosComponent } from './estilos/estilos.component';

// bootstrap
import { AlertModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FooterComponent } from './footer/footer.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

import {NgxMaskModule} from 'ngx-mask';
import { CervejasComponent } from './cervejas/cervejas.component';
import { VinhosComponent } from './vinhos/vinhos.component';

import { CurrencyMaskModule } from "ng2-currency-mask";



@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      DateFormatPipePipe,
      PessoasComponent,
      HomeComponent,
      FooterComponent,
      RelatorioComponent,
      CervejasComponent,
      VinhosComponent,
      EstilosComponent,
   ],
   imports: [
      BrowserModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      AlertModule.forRoot(),
      CollapseModule.forRoot(),
      CarouselModule.forRoot(),
      NgxMaskModule.forRoot(),
      CurrencyMaskModule

   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
