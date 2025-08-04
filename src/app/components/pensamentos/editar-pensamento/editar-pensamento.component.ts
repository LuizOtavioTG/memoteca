import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from 'src/app/services/pensamento.service';
import { minusculoValidator } from 'src/app/validators/minusculoValidator';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.scss']
})
export class EditarPensamentoComponent implements OnInit {

  editarPensamentoForm!: FormGroup;
  minLengthAutoria = 2;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.editarPensamentoForm = this.fb.group({
      id: [''],
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(this.minLengthAutoria),
        minusculoValidator
      ])],
      modelo: ['']
    });


    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (isNaN(id)) {
        this.router.navigate(['/listarPensamento']);
        return;
      }

      this.service.buscarPorId(id).subscribe((pensamento) => {
        this.editarPensamentoForm.patchValue(pensamento);
      });
    });
  }

  editarPensamento() {
    this.service.editar(this.editarPensamentoForm.value).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })

  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao(): string {
    if (this.editarPensamentoForm.valid) {
      return "botao"
    }
    else return "botao__desabilitado"
  }
}
