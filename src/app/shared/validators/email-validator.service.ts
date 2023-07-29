import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, map, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator { /** Para implementar el AsyncValidator
                                                            pulsar cmd + punto (.) */
    constructor() { }

    validate(control: AbstractControl): Observable<ValidationErrors | null> {

        const email = control.value;
        console.log({email});
        
        // Ejemplo creando de la nada un Observable

        const httpCallObservable = new Observable<ValidationErrors|null>( ( subscriber ) => {
            console.log({ email });
            if (email === 'fernando@google.com') {
                subscriber.next({ emailTaken: true });
                subscriber.complete(); /** Cuando el subscriber se completa ya no sigue emitiendo mas valores */
                // return; /** Podría tener el return pero la línea de arriba ya no ejecutaría las líneas de abajo */
            }
            subscriber.next(null);
            subscriber.complete();
        }).pipe(
            delay(3000)
        );

        return httpCallObservable;
        
    }
    
    // validate(control: AbstractControl): Observable<ValidationErrors | null> { /** antes incluye: Promise<ValidationErrors | null> | 
    //                                                                                         antes también era: AbstractControl<any, any>*/
    // // throw new Error('Method not implemented.'); /** Este venía en la implementación */
    //     const email = control.value;
    //     console.log({email});
        
    //     return of({
    //         emailTaken: true
    //     }).pipe(
    //         delay(2000)
    //     );
    // }

    // registerOnValidatorChange?(fn: () => void): void { /** Método opcional detecta
    //                                                        cuando el validator cambia no se ocupa por ahora*/
    // }
    
}

// Referencia a una petición http

// return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
//     .pipe(
//         // delay( 3000 ),
//         map( resp => {
//             return( resp.length === 0 )
//                 ? null
//                 : { emailTaken: true}
//         })
//     );