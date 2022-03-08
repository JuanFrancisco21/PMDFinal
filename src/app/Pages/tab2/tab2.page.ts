import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonSegment, ModalController } from '@ionic/angular';
import { Worker } from 'src/app/Model/worker';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { WorkerService } from 'src/app/Services/worker.service';
import { WorkerCreatorPage } from '../worker/worker-creator/worker-creator.page';
import { WorkerEditorPage } from '../worker/worker-editor/worker-editor.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  segment: String="active"

  public workers: Worker[] = [];

  constructor(private workerService: WorkerService, public modalController: ModalController, private notification: NotificationsService) { }

  async ionViewDidEnter() {
    await this.loadWorkers();
  }

  public async loadWorkers(event?) {
    if (this.infinite) {
      this.infinite.disabled = false;
    }
    if (!event) {
      await this.notification.presentLoading();
    }

    this.workers = [];
    try {
      this.workers = await this.workerService.getWorkerByActive((this.segment.match("active")) ? true : false);
    } catch (error) {
      console.error(error);
      await this.notification.presentToast("Error cargando empleados", "danger");
    } finally {
      if (event) {
        event.target.complete();
      } else {
        await this.notification.dismissLoading();
      }
    }
  }

  public async openCreator() {
    const modal = await this.modalController.create({
      component: WorkerCreatorPage
    });
    return await modal.present();
  }

  public async openEditor(worker: Worker) {
    const modal = await this.modalController.create({
      component: WorkerEditorPage,
      componentProps: {
        'worker': worker
      }
    });
    return await modal.present();
  }

}
