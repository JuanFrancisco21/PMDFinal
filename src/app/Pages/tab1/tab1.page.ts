import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Work } from 'src/app/Model/work';
import { AuthService } from 'src/app/Services/auth.service';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { WorkService } from 'src/app/Services/work.service';
import { ListworkerPage } from '../Work/listworker/listworker.page';

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
    await this.cargaObras();
  }

  /**
   * Método para cargar obras de pgAdmin.
   * @param event para cargar obras.
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
   * Método para desactivar una obra.
   * @param work a desactivar.
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
   * Redireccionamiento a la pagina de lectura de una obra.
   * @param work que se va a enviar a tab3
   */
    public goListworker(work: Work){
      this.navCtrl.navigateForward(['listworker',{data:JSON.stringify(work)}]);
    }

  /**
   * Redireccionamiento a la pagina de creacion de obras.
   */
  public goaddwork(){
    this.router.navigate(['addwork']);
  }
  
  /**
   * Método para cerrar sesión, volviendo al login.
   */
   public async logout() {
    await this.authS.logout();
    this.router.navigate(['']);
  }

}
