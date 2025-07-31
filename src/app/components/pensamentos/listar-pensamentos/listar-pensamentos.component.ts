import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.scss']
})
export class ListarPensamentosComponent implements OnInit {

  listaPensamentos = [
    {
      conteudo: "Test",
      autoria: "Usuario",
      modelo: "modelo1"
    },
    {
      conteudo: "Test2",
      autoria: "Usuario2",
      modelo: "modelo2"
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
