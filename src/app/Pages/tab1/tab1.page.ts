import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Work } from 'src/app/Model/work';
import { AuthService } from 'src/app/Services/auth.service';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { WorkService } from 'src/app/Services/work.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  public obras: Work[] = [];
  public textoBuscar: string='';

  constructor(private ws: WorkService,
    private translator:TranslateService,
    public modalController: ModalController,
    private notifications: NotificationsService,
    private router: Router,
    private authS: AuthService,
    private navCtrl: NavController) { }

    /**
     * Cargar obras cuando este lista la vista.
     */
  async ionViewDidEnter() {
    /*this.ws.checkDatabase();*/
    await this.cargaObras();
  }

  /**
   * Método para cargar obras de pgAdmin.
   * @param event para cargar obras
   */
   public async cargaObras(event?) {
    if (this.infinite) {
      this.infinite.disabled = false;
    }
    if (!event) {
      await this.notifications.presentLoading();
    }
    this.obras = [];
    try {
      this.obras = await this.ws.getAllObras();
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

  /**
   * Método para borrar una nota.
   * @param nota Borra nota
   */
  public async borra(obra: Work) {
    this.notifications.presentAlertConfirm().then((async data => {
      if (data) {
        await this.notifications.presentLoading();
        await this.ws.deleteObra(obra.id);
        let i = this.obras.indexOf(obra, 0);
        if (i > -1) {
          this.obras.splice(i, 1);
        }
        await this.notifications.dismissLoading();
      }
    }))
  }

  /**
   * Método para busqueda de obras
   * @param event escribir en el search bar
   */
   public async onInput(event) {
    this.textoBuscar=event.detail.value;
  }

  /**
   * Método para cerrar sesión, volviendo al login.
   */
  public async logout() {
    await this.authS.logout();
    this.router.navigate(['']);
  }

  /**
   * Apertura de ventana modal para editar obra.
   * @param obra a editar
   * @returns 
   */
  async edita(obra: Work) {
    /*const modal = await this.modalController.create({
      component: EditPage,
      componentProps: {
        'obra': obra
      }
    });
    return await modal.present();*/
  }

  /**
   * Redireccionamiento a la pagina de creacion de obras.
   */
  public addwork(){
    this.router.navigate(['addwork/']);
  }
}
