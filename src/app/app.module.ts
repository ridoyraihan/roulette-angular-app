import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { GameService } from './service/game.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptor } from './Interceptor/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    HomePageComponent
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
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
