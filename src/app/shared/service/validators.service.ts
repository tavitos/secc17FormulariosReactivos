import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {
    constructor() { }

    public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";    

    public cantBeStrider = ( control: FormControl): ValidationErrors | null => {

        const value: string = control.value.trim().toLowerCase();
    
        if (value === 'strider') {
            return {
                noStrider: true
            }
        }
    
    
        return null
    }

    public isValidField( form: FormGroup, field: string ){
        return form.controls[field].errors && form.controls[field].touched;
    }

    public isFieldOneEqualFieldTwo(field1: string, field2: string){
        return (formGroup: AbstractControl): ValidationErrors|null => { /** Función utilizada para evaluar, conexión con el formulario
                                                                      marca deprecated en .group del register-page línea 15
                                                                      porque el tipo debe ser en lugar de FormGroup debe ser
                                                                      AbstractControl<any, any>*/
            const fieldValue1 = formGroup.get(field1)?.value;
            const fieldValue2 = formGroup.get(field2)?.value;

            if (fieldValue1 !== fieldValue2) {
                formGroup.get(field2)?.setErrors({notEqual: true});
                return { notEqual: true } /** Validación del error del formulario */
            }
            
            formGroup.get(field2)?.setErrors(null);

            return null;

        }
    }
}