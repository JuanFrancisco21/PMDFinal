import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AngularFireModule} from '@angular/fire/compat'
import { AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { WorkService } from './Services/work.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { PipesModule } from './Services/pipes/pipes.module';
import { LocalstorageService } from './Services/localstorage.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './Services/auth.service';
import { AuthguardService } from './Services/authguard.service';
import { AddworkPage } from './Pages/Work/addwork/addwork.page';
import { DailylogService } from './Services/dailylog.service';
import { ServiceWorkerModule } from '@angular/service-worker';

export function loadTranslator(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    PipesModule,
    TranslateModule.forRoot({
      loader : {
        provide: TranslateLoader,
        useFactory : (loadTranslator),
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
          ], 
  providers: [HttpClient,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, WorkService, WorkService, DailylogService, LocalstorageService, AuthService, AuthguardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
