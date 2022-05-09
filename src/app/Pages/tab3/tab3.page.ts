import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonToggle } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Worker } from 'src/app/Model/worker';
import { AuthService } from 'src/app/Services/auth.service';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { WorkService } from 'src/app/Services/work.service';
import { WorkerService } from 'src/app/Services/worker.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public user: Worker;
  public nWork: any = 0;
  public nWorkers: any = 0;
  public nWorkDeleted: any = 0;


  constructor(public alertController: AlertController,
    private workerService: WorkerService,
    private workservice: WorkService,
    private authS: AuthService,
    private router: Router,
    private notificatios: NotificationsService) {
  }

  async ngOnInit() {
    this.notificatios.presentLoading();
    this.user = this.authS.getWorker();
    this.nWork = (await this.workservice.getActiveWorkByUser(this.user.id, true)).length;
    this.nWorkers = (await this.workerService.getAllWorkers()).length;
    this.nWorkDeleted = (await this.workservice.getActiveWorkByUser(this.user.id, false)).length;
    this.notificatios.dismissLoading();
  }

  public async closeSesion() {
    await this.authS.logout();
    this.router.navigate(['']);
  }

  public goWorkList() {
    this.router.navigate(['/main/tabs/tab1']);
  }

}
