import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
    name: [''],
    price: [0],
    inStorage: [0]
  });

  /** En caso de no querer escribir mil veces new FormControl, inyectar el Servicio FormBuilder desde @angular/forms */
  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  onSave():void {
    console.log(this.myForm.value);
    
  }

}
