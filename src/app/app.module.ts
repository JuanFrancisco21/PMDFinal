import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { WorkService } from './Services/work.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { PipesModule } from './Services/pipes/pipes.module';

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
    HttpClientModule,
    PipesModule,
    TranslateModule.forRoot({
      loader : {
        provide: TranslateLoader,
        useFactory : (loadTranslator),
        deps: [HttpClient]
      }
    })
          ], 
  providers: [HttpClient,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, WorkService],
  bootstrap: [AppComponent],
})
export class AppModule {}
