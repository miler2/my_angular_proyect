import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { Moment } from 'moment';
import { DatosBle } from 'src/app/interfaces/datos-ble';
import * as moment from 'moment';

@Component({
  selector: 'app-ble-data',
  templateUrl: './ble-data.component.html',
  styleUrls: ['./ble-data.component.scss']
})
export class BleDataComponent{
  today= new Date();    // Esta variable es solo para mostrarla en la página web
  jstoday = moment();   // Esta variable es solo para mostrarla en la página web
//   dato = '';
  ul = document.querySelector('.datos')!;

  datos = [{
          "name": "dato1",
          "date": moment("Mon May 27 2024 08:35:14 GMT+0200")
      },{
          "name": "dato2",
        //   "date": moment("Mon May 27 2024 08:47:14 GMT+0200")
      },{
          "name": "dato3",
          "date": moment("Mon May 27 2024 08:59:14 GMT+0200")
      },{
          "name": "dato4",
          "date": moment("Mon May 27 2024 09:11:14 GMT+0200")
      },{
          "name": "dato5",
          "date": moment("Mon May 27 2024 09:23:14 GMT+0200")
      },{
          "name": "dato6",
        //   "date": moment("Mon May 27 2024 09:35:14 GMT+0200")
      },{
          "name": "dato7",
          "date": moment("Mon May 27 2024 09:47:14 GMT+0200")
      }
  ]

  constructor(private toastr: ToastrService) {
    // this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');

    let ultima_fecha: any;
    this.datos.forEach((dato: DatosBle) => {
        if (!dato.date){
            dato.date = moment(ultima_fecha).add(12, 'm');
            this.toastr.success(dato.name, ultima_fecha);
        }

        if (dato.date){
            ultima_fecha = dato.date;
        }
    });
  }
}
