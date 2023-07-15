import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
// import { cantBeStrider } from 'src/app/shared/validators/validators';
// import * as customValidators from 'src/app/shared/validators/validators'; /** Importa todas las funciones que se encuentren en validators.ts, customValidators es un nombre que se da como si fuena una variable */

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    // name: ['', [ Validators.required ]],
    // name: ['', [ Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern) ]], /** el método pattern acepta un patrón de caracteres */
    name: ['', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ]], /** Utilizando el servicio */
    // email: ['', [ Validators.required, Validators.email ]],
    // email: ['', [ Validators.required, Validators.pattern(customValidators.emailPattern) ]], /** el método pattern acepta un patrón de caracteres */
    email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ]], /** Utiliza el servicio */
    // username: ['', [ Validators.required, cantBeStrider ]], /** Sin paréntesis, solo se pasa la referencia  */
    // username: ['', [ Validators.required, customValidators.cantBeStrider ]], /** Uso de la variable customValidators  */
    username: ['', [ Validators.required, this.validatorsService.cantBeStrider ]], /** Utiliza el servicio  */
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]]
  });

  constructor( 
    private fb:FormBuilder,
    private validatorsService: ValidatorsService
  ) { }

  ngOnInit(): void {
  }

  isValidField( field: string ){
    // TODO: obtener validación desde un servicio
    return this.validatorsService.isValidField( this.myForm, field);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }

}
