import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptor } from './Interceptor/http.interceptor';

import { GameService } from './service/game.service';
import { WebApiService } from './service/web-api.service';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { SlotComponent } from './components/slot/slot.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    HomePageComponent,
    SlotComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true
    },
    WebApiService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
