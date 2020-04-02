import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { ReservationsService } from 'src/app/shared/services/reservations.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports

const moment = _moment;

const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ReservacionesComponent implements OnInit {

  form: FormGroup;

  seconds: number = 10;

  zonas: any[] = [
    {
      id: 1,
      name: "Terraza"
    },
    {
      id: 2,
      name: "Barra"
    },
    {
      id: 3,
      name: "Lateral barra"
    },
    {
      id: 4,
      name: "Lateral salida"
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private apiService: ReservationsService
  ) { 
    this.form = this.formBuilder.group({
      name: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required]),
      date: new FormControl (moment()),
      people: new FormControl('', [Validators.required]),
      pref_zone: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  submitReserv(): any{
    console.log(this.form.value);
    this.apiService.createReservation(this.form.value).subscribe((data: any)=>{
      console.log('Reservacion creada: ');
      console.log(data);
    }, err => {
      console.log(err);
    }, () => {
      this._snackBar.openFromComponent(SnackBarComponent,{
        duration: this.seconds * 1000
      });
    });
  }

}
