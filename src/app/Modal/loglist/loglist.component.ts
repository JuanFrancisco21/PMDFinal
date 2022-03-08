import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Dailylog } from 'src/app/Model/dailylog';

@Component({
  selector: 'app-loglist',
  templateUrl: './loglist.component.html',
  styleUrls: ['./loglist.component.scss'],
})
export class LoglistComponent implements OnInit {

  loglist : Dailylog[];
  log : Dailylog;

  constructor(navparams:NavParams) { 
    this.loglist = navparams.get('logs');
    console.log(this.loglist);
    
  }
  
  

  ngOnInit() {
    
  }

}
