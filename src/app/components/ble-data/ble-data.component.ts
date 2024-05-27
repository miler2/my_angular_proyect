import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { DatosBle } from 'src/app/interfaces/datos-ble';

@Component({
  selector: 'app-ble-data',
  templateUrl: './ble-data.component.html',
  styleUrls: ['./ble-data.component.scss']
})
export class BleDataComponent{
  today= new Date();
  jstoday = '';
  dato = '';
  ul = document.querySelector('.datos')!;

  datos = [{
          "name": "dato1",
          "date": "24-05-2024 00:13:12 PM"
      },{
          "name": "dato2",
          "date": "24-05-2024 01:13:12 PM"
      },{
          "name": "dato3",
          "date": "24-05-2024 02:13:12 PM"
      },{
          "name": "dato4",
          "date": "24-05-2024 03:13:12 PM"
      },{
          "name": "dato5",
          "date": "24-05-2024 04:13:12 PM"
      },{
          "name": "dato6",
          "date": "24-05-2024 05:13:12 PM"
      },{
          "name": "dato7",
          "date": "24-05-2024 06:13:12 PM"
      }
  ]

  constructor(private toastr: ToastrService) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
  }
}
