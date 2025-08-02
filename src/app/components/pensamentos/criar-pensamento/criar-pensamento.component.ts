import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.scss']
})
export class CriarPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  criarPensamentoForm!: FormGroup;

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.criarPensamentoForm = this.fb.group({
      conteudo: ['Formulario reativo'],
      autoria: [''],
      modelo: ['modelo1']
    })
  }

  criarPensamento() {
    this.pensamentoService.criar(this.pensamento).subscribe(()=>{
      this.router.navigate(['/listarPensamento'])
    })
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

}
