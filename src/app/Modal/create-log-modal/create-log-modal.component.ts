import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ModalController, NavParams } from '@ionic/angular';
import { Work } from 'src/app/Model/work';
import { Workerwork } from 'src/app/Model/workerwork';
import { format, parseISO } from 'date-fns';
import { DailylogService } from 'src/app/Services/dailylog.service';
import { Dailylog } from 'src/app/Model/dailylog';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NotificationsService} from '../../Services/notifications.service';

@Component({
  selector: 'app-create-log-modal',
  templateUrl: './create-log-modal.component.html',
  styleUrls: ['./create-log-modal.component.scss'],
})
export class CreateLogModalComponent implements OnInit {

  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  logForm: FormGroup;

  workerWorkList: Workerwork[] = [];
  work: Work;
  date: any;
  hours: number;

  constructor(navParams: NavParams,
    private dailylogserv:DailylogService,
    private modalController: ModalController,
    private notificationsServ: NotificationsService) {
      this.workerWorkList = navParams.get('logsToDo');
      this.work = navParams.get('work');
   }

  ngOnInit() {
  }

  formatDate(event) {
    this.date = format(parseISO(event.detail.value), 'yyyy-MM-dd');
    console.log(this.date);
  }

  resetDate(){
    this.date = '';
  }

  async createLog(dailylog:Dailylog, workerworkid:Number){
    try{
      console.log(await this.dailylogserv.createLog(dailylog, workerworkid));
    }catch(error){
      console.log(error);
    }
  }

  async createDailylog(){

    if(!this.hours || !(this.hours > 0)){
      this.hours = 8.0;
    }

    if(!this.date || this.date.length<2){
      this.date=format(parseISO(new Date().toISOString()), 'yyyy-MM-dd');
    }

    let dailylog : Dailylog={
      date:this.date,
      hours:this.hours,
      workerWork:null
    }
    
    this.notificationsServ.presentLoading();
    for(let ww of this.workerWorkList){
          await this.createLog(dailylog, ww.id).then(response => {
            this.notificationsServ.presentToast('Log creado', 'success');
          }).catch(error => {
            this.notificationsServ.presentToast('Error en el sistema', 'danger');
          });
    }
    this.notificationsServ.dismissLoading();
    this.close();
  }

  close(){
    this.modalController.dismiss();
  }

    
}
