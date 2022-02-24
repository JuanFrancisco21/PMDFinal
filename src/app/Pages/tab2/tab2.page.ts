import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Worker } from 'src/app/Model/worker';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { WorkerService } from 'src/app/Services/worker.service';
import { WorkerCreatorPage } from '../worker/worker-creator/worker-creator.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public workers: Worker[] = [];

  constructor(private workerService: WorkerService, public modalController: ModalController, private notification: NotificationsService) { }

  async ionViewDidEnter() {
    await this.loadWorkers();
  }

  public async loadWorkers(event?) {

    this.workers = [];
    try {
      this.workers = await this.workerService.getAllWorkers();
    } catch (error) {
      console.error(error);
      await this.notification.presentToast("Error cargando empleados", "danger");
    }
  }

  public async openCreator(){
    const modal = await this.modalController.create({
      component: WorkerCreatorPage
    });
    return await modal.present();
  }

}
