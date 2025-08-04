import { Component, OnInit } from '@angular/core';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.scss']
})
export class ListarPensamentosComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;

  constructor(private pensamentoService: PensamentoService) { }

  ngOnInit(): void {
    this.pensamentoService.listar(this.paginaAtual).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    })
  }
  carregarMaisPensamentos(){
    this.pensamentoService.listar(++this.paginaAtual)
    .subscribe(listaPensamentos =>{
      this.listaPensamentos.push(...listaPensamentos)
      if(!listaPensamentos.length){
        this.haMaisPensamentos = false
      }
    })
  }



}
