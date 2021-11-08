import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransportesService } from 'src/app/administracion/services/transportes.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-add-transportes',
  templateUrl: './add-transportes.component.html',
  styleUrls: ['./add-transportes.component.css']
})
export class AddTransportesComponent implements OnInit {

  public empresas:any = [];
  public form!: FormGroup;
  titulo = 'Agregar Seguro';
  boton = 'Agregar Seguro';
  id: string | null;
  constructor(
    
    private empresaService:EmpresaService,
    private transporteService:TransportesService,
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute ,
    private router : Router
  ){
    this.id = aRouter.snapshot.paramMap.get('idTransporte');
  }

  ngOnInit(): void {
    this.esEditarTransporte();
    this.agregarEmpresa();
    
    this.form=this.formBuilder.group({
     idTransporte: ['', Validators.required],
     puestos: ['', Validators.required],
     modelo: ['', Validators.required],
     color: ['', Validators.required],
     precio: ['', Validators.required],
     empresa: ['', Validators.required]
      
    });
  }
  public agregarEmpresa(){
    this.empresaService.listarEmpresa().subscribe(empresas=>{
      this.empresas = empresas; 
    })
  }
 
  public enviarData(){
    if (this.id !== null) {
      this.transporteService
        .editarTransporte(this.id, this.form.value)
        .subscribe((data) => { this.router.navigate(["/administracion/transportes"]);
          });

    } else {
      this.transporteService.post(this.form.value).subscribe((data) => {
        this.router.navigate(["/administracion/transportes"]);
      });
    }
  }



  esEditarTransporte() {
    if (this.id !== null) {
      this.titulo = 'Editar transporte';
      this.boton = 'Editar transporte';
      this.transporteService.obtenerTransporte(this.id).subscribe((data) => {
        this.form.setValue({
          idTransporte: data.idTransporte,
          puestos: data.puestos,
          modelo: data.modelo,
          color: data.color,
          precio: data.precio,
          empresa: data.empresa.idEmpresa,
        });
      });
    }
  }

}
