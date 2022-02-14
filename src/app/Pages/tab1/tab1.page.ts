import { Component } from '@angular/core';
import { WorkServiceService } from 'src/app/Services/work-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private ws:WorkServiceService) {
    console.log("hola");
    console.log(ws.getAllObras());
  }



}
