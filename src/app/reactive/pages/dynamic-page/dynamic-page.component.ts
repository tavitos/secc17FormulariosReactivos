import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get favoriteGames() { /** <-- getter creado para evitar tamal de código en la línea 43 del TS que comenté */
    return this.myForm.get('favoriteGames') as FormArray; /** Obtiene los campos del array favoriteGames, el as FormArray nos permite iterar el array favoriteGames, esto iría en la línea 43 que comenté*/
  }

  isValidField( field: string ): boolean | null{
    return this.myForm.controls[field].errors 
      && this.myForm.controls[field].touched;
  }

  isValidFieldInArray( formArray: FormArray, index: number ){
    return formArray.controls[index].errors 
      && formArray.controls[index].touched;
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

  onAddFavorites():void {
    if( this.newFavorite.invalid ) return;

    // console.log(this.newFavorite.value);
    const newGame = this.newFavorite.value;
    // this.favoriteGames.push( new FormControl( newGame, Validators.required) ); <-- Esto si no estamos trabajando con el FormBuilder
    this.favoriteGames.push( /** Con FormBuider */
      this.fb.control( newGame, Validators.required)
    );

    this.newFavorite.reset();
  }

  onDeleteFavorite( index: number ):void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit():void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    ( this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]); /** Esta línea elimina los controles favoritos */
    this.myForm.reset();
  }

}
