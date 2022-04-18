import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, MenuController, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Work } from 'src/app/Model/work';
import { AuthService } from 'src/app/Services/auth.service';
import { DailylogService } from 'src/app/Services/dailylog.service';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { WorkService } from 'src/app/Services/work.service';
import { ListworkerPage } from '../Work/listworker/listworker.page';
import { createAnimation } from '@ionic/core';
import { WorkerService } from 'src/app/Services/worker.service';
import { Worker } from 'src/app/Model/worker';
import { LocalstorageService } from 'src/app/Services/localstorage.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  segment: string = "active";

  public works: Work[] = [];
  public worker: Worker;
  public textoBuscar: string = '';

  constructor(private workservice: WorkService,
    private workerservice: WorkerService,
    private translator: TranslateService,
    public modalController: ModalController,
    private notifications: NotificationsService,
    private router: Router,
    private authS: AuthService,
    private navCtrl: NavController) { }

  /**
   * Cargar obras cuando este lista la vista.
   */
  async ionViewDidEnter() {
    this.worker = await this.workerservice.getWorkerByEmail(this.authS.user.email);
    await this.loadworks();
  }

  /**
   * Método para cargar obras de pgAdmin.
   * @param event para cargar obras.
   */
  public async loadworks(event?) {
    if (this.infinite) {
      this.infinite.disabled = false;
    }
    if (!event) {
      await this.notifications.presentLoading();
    }
    this.works = [];
    try {
      this.works = await this.workservice.getActiveObrasByUser(this.worker.id, this.segment.match("active") ? true : false);
      //this.obras = await this.workservice.getObrasByUser(this.trabajador.id);
      //this.obras = await this.workservice.getAllObras();
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
  public async changeActive(work: Work) {
    // await this.notification.presentLoading();

    work.active = (this.segment.match("active")) ? false : true;
    await this.workservice.updateObra(work);

    this.loadworks();

    // await this.notification.dismissLoading();

  }

  /**
   * Método para busqueda de obras
   * @param event escribir en el search bar
   */
  public async onInput(event) {
    this.textoBuscar = event.detail.value;
  }

  /**
  * Redireccionamiento a la pagina de lectura de una obra.
  * @param work que se va a enviar a tab3
  */
  public goListworker(work: Work) {
    this.navCtrl.navigateForward(['listworker', { data: JSON.stringify(work) }]);
  }

  /**
   * Redireccionamiento a la pagina de creacion de obras.
   */
  public goaddwork() {
    this.router.navigate(['addwork']);
  }

}