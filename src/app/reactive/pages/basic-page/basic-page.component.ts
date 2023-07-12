import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const rtx5090 = {
  name: 'rtx5090',
  price: 2500,
  inStorage: 6
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  // public myForm: FormGroup = new FormGroup({
  //   // name: new FormControl('primerValorOValorPorDefecto', ['validaciones sincronas'], ['validaciones asincronas'])
  //   // name: new FormControl('', [], []),
  //   // price: new FormControl(0, [], []),
  //   // inStorage: new FormControl(0, [], []),

  //   // name: new FormControl(''), /** Si no hay validaciones no es necesario tenerlas */
  //   // price: new FormControl(0),
  //   // inStorage: new FormControl(0)

  // });

  public myForm: FormGroup = this.fb.group({ /** Aquí se hace referencia al fb inyectado en el constructor */
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  /** En caso de no querer escribir mil veces new FormControl, inyectar el Servicio FormBuilder desde @angular/forms */
  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    // this.myForm.reset( rtx5090 );
  }

  isValidField( field: string ): boolean | null{
    return this.myForm.controls[field].errors 
      && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null{
    
    if( !this.myForm.controls[field] ) return null;
    
    const errors = this.myForm.controls[field].errors || {};
    
    for (const key of Object.keys(errors)) {
      // console.log(key);
      switch( key ){
        case 'required': 
          return 'Este campo es requerido';
        case 'minlength': 
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }
    return null;
  }

  onSave():void {
    // if( this.myForm.invalid ) return;
    if( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    // this.myForm.setValue({ name: 'Transformers', price: 25, inStorage: 4});
    this.myForm.reset({ price: 10, inStorage: 0});
  }

}
