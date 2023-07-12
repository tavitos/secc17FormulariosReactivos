import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent implements OnInit {

  // public myForm2 = new FormGroup({
  //   favoriteGames: new FormArray([]);
  // });

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([ /** Utiliza el método array del FormBuilder */
      ['Metal Gear', Validators.required], /** Sin corchetes cuando es solo un valor */
      ['Death Stranding', Validators.required]
    ]),
  });

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get favoriteGames() { /** <-- getter creado para evitar tamal de código en la línea 43 del TS que comenté */
    return this.myForm.get('favoriteGames') as FormArray; /** Obtiene los campos del array favoriteGames, el as FormArray nos permite iterar el array favoriteGames, esto iría en la línea 43 que comenté*/
  }

  onSubmit():void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset();
  }

}
