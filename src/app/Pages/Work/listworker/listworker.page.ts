import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Work } from 'src/app/Model/work';
import { Workerwork } from 'src/app/Model/workerwork';
import {Worker} from 'src/app/Model/worker'
import { WorkerService } from 'src/app/Services/worker.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { IonDatetime, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { WorkService } from 'src/app/Services/work.service';
import { DailylogService } from 'src/app/Services/dailylog.service';
import { format, parseISO } from 'date-fns';
import { Dailylog } from 'src/app/Model/dailylog';
import { LoglistComponent } from 'src/app/Modal/loglist/loglist.component';

@Component({
  selector: 'app-listworker',
  templateUrl: './listworker.page.html',
  styleUrls: ['./listworker.page.scss'],
})
export class ListworkerPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  public date = '';

  public dailylogcheck:boolean;
  public datacoming:any;
  public work:Work;
  public worker:Worker = null;
  public wwlist:Workerwork[];
  public workers:Worker[];
  public ww:Workerwork;
  public hours:number;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private notifications: NotificationsService,
    private workerserv:WorkerService,
    private workserv:WorkService,
    private dailylogserv:DailylogService,
    private modalcontroller:ModalController) {
      this.datacoming=this.route.snapshot.params['data'];
      if (this.datacoming) {
        try {

          this.work=JSON.parse(this.datacoming);
          
        } catch (err) {
          console.log(err);
        }
      }
  }



  async ionViewDidEnter() {
  }


  async ngOnInit() {
    console.log(this.work);
    this.wwlist=this.work.workerWork;
    this.workers = await this.workerserv.getAllWorkers();
    
  }

  

  
  /**
   * Método para cambiar de vista a la principal
   */
   goBack() {
    this.router.navigate(['/main/tabs/tab1'])
  }


  public async cargaWorkers(event?) {
    if (this.infinite) {
      this.infinite.disabled = false;
    }
    if (!event) {
      await this.notifications.presentLoading();
    }
    this.wwlist = [];
    try {
      this.work = await this.workserv.getObra(this.work.id);
      this.wwlist = this.work.workerWork;
    } catch (err) {
      console.error(err);
      await this.notifications.presentToast("Error cargando datos", "danger");
    } finally {
      if (event) {
        event.target.complete();
      } else {
        await this.notifications.dismissLoading();
      }
    }
  }


  async addWorker(){
    if(this.worker != null){
     let workerwork = await this.workerserv.addWorkertoWork(this.worker, this.work);
     console.log(workerwork.worker);
    }
    console.log(this.worker.id + ' ' + this.work.id);
  }

  getValue(worker:Worker) : void{
    console.log(worker);
    this.worker = worker;
  }
  

  formatDate(value:string) {
    this.date = format(parseISO(value), 'yyyy-MM-dd');
    console.log(this.date);
  }

  resetDate(){
    this.date = '';
  }

  async createDailylog(){
    if(this.hours==null){
      this.hours=8.0;
    }
    if(this.date.length<2){
      this.date=format(parseISO(new Date().toISOString()), 'yyyy-MM-dd');
    }

    let dailylog : Dailylog={
      date:this.date,
      hours:this.hours,
      workerwork:null
    }

    
    for(let ww of this.wwlist){
        if(ww.dailylogcheck==true){
          await this.createLog(dailylog, ww.id);
        }
    }
      
    }
    
  

  async createLog(dailylog:Dailylog, workerworkid:Number){
    try{
      console.log(await this.dailylogserv.createLog(dailylog, workerworkid));
    }catch(error){
      console.log(error);
    }
  }

  clickSettings(workerwork:Workerwork){
    this.notifications.presentAlertConfirm().then((async data => {
      if (data) {
        workerwork.current=false;
        console.log(this.dailylogserv.updateWorkerWork(workerwork));
      }
    }));
  }

  async showLogs(workerwork:Workerwork){
    console.log('Aqui si llega');
      let modal = await this.modalcontroller.create({
        component:LoglistComponent,
        componentProps:{
          'logs':workerwork.dailyLogList
        }
      });
      return modal.present();
    }
}
  
  


