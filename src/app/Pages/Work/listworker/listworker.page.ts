import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Work } from 'src/app/Model/work';
import { Workerwork } from 'src/app/Model/workerwork';
import {Worker} from 'src/app/Model/worker'
import { AuthService } from 'src/app/Services/auth.service';
import { LocalstorageService } from 'src/app/Services/localstorage.service';
import { WorkerService } from 'src/app/Services/worker.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listworker',
  templateUrl: './listworker.page.html',
  styleUrls: ['./listworker.page.scss'],
})
export class ListworkerPage implements OnInit {


  workerworkForm: FormGroup | any;
  public datacoming:any;
  public work:Work;
  public wwlist:Workerwork[];
  public workers:Worker[];
  public ww:Workerwork;
  public date:Date;
  public hours:number;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private workerserv:WorkerService) {
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


  async addWorker(worker:Worker){
    this.workerserv.addWorkertoWork(worker, this.work);
    console.log(worker.id + ' ' + this.work.id);
  }

  
  

  

}
