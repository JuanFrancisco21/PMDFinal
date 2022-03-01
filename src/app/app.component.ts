import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './Services/auth.service';
import { LocalstorageService } from './Services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private langsAvailable = ['es', 'en'];
  public subscription: any;
  constructor(private traductor: TranslateService,
    private router: Router,
    private authS: AuthService,
    private storage: LocalstorageService,
    private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(100, () => {
      navigator['app'].exitApp();
    });

    (async () => {
      let lang = await storage.getItem("lang");
      if (lang == null) {
        lang = this.traductor.getBrowserLang();
      } else {
        lang = lang.lang;
      }
      if (this.langsAvailable.indexOf(lang) > -1) {
        traductor.setDefaultLang(lang)
      } else {
        traductor.setDefaultLang("en");
      }
    })();

    //detectar el lenguaje del navegador
    //const lang = window.navigator.language.split("-")[0]
    const lang = this.traductor.getBrowserLang();
    if (this.langsAvailable.indexOf(lang) > -1) {
      traductor.setDefaultLang(lang);
    }
    traductor.setDefaultLang("en");
  }
  ionViewDidEnter() {

  }

  /**
   * Método para cerrar sesión, volviendo al login.
   */
   public async logout() {
    await this.authS.logout();
    this.router.navigate(['']);
  }

  /**
   * Método para cambiar entre idiomas.
   * @param event 
   */
  public async cambiaIdioma(event) {

    if (event && event.detail && event.detail.checked) {
      await this.storage.setItem('lang', { lang: 'en' });
      this.traductor.use('en');
    } else {
      await this.storage.setItem('lang', { lang: 'es' });
      this.traductor.use('es');
    }
  }

}
