import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor( private gameService: GameService) { }

  ngOnInit() {
    let url = "https://dev-games-backend.advbet.com/v1/ab-roulette/1/configuration";
    this.gameService.getConfigaration(url).subscribe((result)=>{
      console.log(result);
    })
  }

}
