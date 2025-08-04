import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PensamentoService } from 'src/app/services/pensamento.service';
import { minusculoValidator } from 'src/app/validators/minusculoValidator';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.scss']
})
export class CriarPensamentoComponent implements OnInit {

  criarPensamentoForm!: FormGroup;
  minLengthAutoria = 2

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.criarPensamentoForm = this.fb.group({
      conteudo: ['',
        Validators.compose(
          [
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/)
          ]
        )],
      autoria: ['', Validators.compose(
        [
          Validators.required,
          Validators.minLength(this.minLengthAutoria),
          minusculoValidator
        ]
      )],
      modelo: ['modelo1']
    })
  }

  criarPensamento() {
    if (this.criarPensamentoForm.valid) {
      this.pensamentoService.criar(this.criarPensamentoForm.value).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })
    }

  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

  habilitarbotao(): string {  
   if(this.criarPensamentoForm.valid){
    return 'botao'
   } else {
    return 'botao__desabilitado'
   }
  }
}
