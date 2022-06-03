import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Work } from 'src/app/Model/work';
import { Workerwork } from 'src/app/Model/workerwork';
import { Worker} from 'src/app/Model/worker'
import { WorkerService } from 'src/app/Services/worker.service';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { ActionSheetController, IonDatetime, IonInfiniteScroll, ModalController, NavController } from '@ionic/angular';
import { WorkService } from 'src/app/Services/work.service';
import { DailylogService } from 'src/app/Services/dailylog.service';
import { Dailylog } from 'src/app/Model/dailylog';
import { LoglistComponent } from 'src/app/Modal/loglist/loglist.component';
import { CreateLogModalComponent } from 'src/app/Modal/create-log-modal/create-log-modal.component';
import { WorkExcelExportComponent } from 'src/app/Modal/work-excel-export/work-excel-export.component';

@Component({
  selector: 'app-listworker',
  templateUrl: './listworker.page.html',
  styleUrls: ['./listworker.page.scss'],
})
export class ListworkerPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  public date = '';
  segment: String = "active";

  public dailylogcheck:boolean;
  public datacoming:any;
  public work:Work;
  public worker:Worker = null;
  public wwlist:Workerwork[];
  public workers:Worker[];
  public ww:Workerwork;
  public hours:number;
  public addingLog: boolean = false;
  listWorkersToAdd: Workerwork[] = [];
  enableButton: boolean = false;

  buttons: any[] = [];

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private notifications: NotificationsService,
    private workerserv:WorkerService,
    private workserv:WorkService,
    private dailylogserv:DailylogService,
    private modalcontroller:ModalController,
    private navCtrl: NavController,
    private actionSheet: ActionSheetController) {
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
    console.log(this.addingLog);
    this.wwlist=this.work.workerWork;
    this.workers = await this.workerserv.getAllWorkers();
    for(let index of this.workers){
      this.buttons.push({
        text: index.name,
        icon: 'add',
        role: 'add',
        handler: () => {
          this.addWorker(index);
        }
      })

    }
    await this.cargaWorkers();
    
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
      this.work = await this.workserv.getWorkById(this.work.id);
      this.wwlist = await this.workerserv.getWorkerFromWorkByCurrent((this.work.id), (this.segment.match('active')) ? true : false);
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

  async addWorker(worker: Worker){
    if(worker != null){
     let workerwork = await this.workerserv.addWorkertoWork(worker, this.work).then(response => {
       this.notifications.presentToast(('Trabajador ' + worker.name + ' añadido a la obra ' + this.work.name), 'success');
     }).catch(error => {
       this.notifications.presentToast('Error al añadir trabajador, asegúrese de que ese trabajador no esté ya añadido a la obra', 'danger');
     });
    }
  }

  getValue(worker:Worker) : void{
    console.log(worker);
    this.worker = worker;
  }
    
  onClickAddLog(){
    if(!this.addingLog){
      this.addingLog = true;
    }else{
      this.addingLog = false;
    }
  }

  async createLog(dailylog:Dailylog, workerworkid:Number){
    try{
      console.log(await this.dailylogserv.createLog(dailylog, workerworkid));
    }catch(error){
      console.log(error);
    }
    this.addingLog = false;
  }

  clickSettings(workerwork:Workerwork){
    console.log(workerwork.current)
    if(workerwork.current){
      this.notifications.presentAlertConfirm().then((async data => {
        if (data) {
          if(workerwork.current){
            try{
              await this.workerserv.deleteWorkerFromWork(workerwork);
            }catch(error){
              console.log(error);
            }
          }
        }
      }));
    }else{
      this.notifications.presentAlert('Reactivar trabajador', 'Va a reactivar al trabajador ' + workerwork.worker.name + ' , ¿está seguro?').then((async data => {
        if (data) {
          if(!workerwork.current){
            try{
              await this.workerserv.activateWorkerFromWork(workerwork.id);
            }catch(error){
              console.log(error);
            }
          }
        }
      }));
    }
  }

  async showLogs(workerwork:Workerwork){
    console.log(workerwork);
    console.log(this.dailylogserv.getLogsByWorker(workerwork.worker.id))
      let modal = await this.modalcontroller.create({
        component:LoglistComponent,
        componentProps:{
          'logs':workerwork.dailyLogList
        }
      });
      return modal.present();
    }

  public async showExcelExport() {
    await this.modalcontroller.create({
      component: WorkExcelExportComponent,
      componentProps: {
        'work': this.work
      }
    }).then(modal => {
      modal.present();
    });
  }

    async showLogCreate(){
      for(let index of this.wwlist){
        if(index.dailylogcheck){
          this.listWorkersToAdd.push(index);
        }
      }
      console.log(this.listWorkersToAdd);
      let modal = await this.modalcontroller.create({
        component:CreateLogModalComponent,
        componentProps:{
          'logsToDo': this.listWorkersToAdd,
          'work': this.work
        }
      });
      return modal.present();
    }

    

    async showActionSheet(){
      const actionSheet = await this.actionSheet.create({
        header: 'Trabajadores',
        cssClass: 'my-custom-class',
        buttons: this.buttons
      });
      await actionSheet.present();
    
    }
}

  
  


