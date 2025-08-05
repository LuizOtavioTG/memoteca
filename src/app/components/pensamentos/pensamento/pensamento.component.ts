import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.scss']
})
export class PensamentoComponent implements OnInit {

  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: 'I love Angular',
    autoria: 'usuario',
    modelo: 'modelo3',
    favorito: false
  }
  constructor(private pensamentoService: PensamentoService) { }

  ngOnInit(): void {

  }
  
  larguraPensamento(): string {
    if (this.pensamento?.conteudo?.length >= 256) {
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  mudarIconeFavorito(): boolean {
    console.log(this.pensamento.favorito);
    if (this.pensamento.favorito == false) {
      return false
    }
    return true
  }

  atualizarFavoritos() {
    this.pensamentoService.mudarFavorito(this.pensamento).subscribe();
    console.log(this.pensamento.favorito)
  }

}
