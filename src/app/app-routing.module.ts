import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import {RelatorioComponent} from './relatorio/relatorio.component';
import { CervejasComponent } from './cervejas/cervejas.component';
import { VinhosComponent } from './vinhos/vinhos.component';
import { EstilosComponent } from './estilos/estilos.component';


const routes: Routes = [
 { path: '', component: HomeComponent},
 {path: 'pessoas', component: PessoasComponent},
 {path: 'cervejas', component: CervejasComponent},
 {path: 'vinhos', component: VinhosComponent},
 {path: 'estilos', component: EstilosComponent},

 {path: 'relatorios', component: RelatorioComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
