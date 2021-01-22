import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'admin-tool';

  options: AnimationOptions = {
    loop: false,
    autoplay: false,
    path: '/assets/json/confetti.json'
  };
  svgConfetti: any;
  isHide = false;

  constructor(private sharedService: SharedService) { }


  ngOnInit() {
    // subscribe receives the value.
    this.sharedService.activeConfetti.subscribe(() => {
      this.play();
    });
  }

  play() {
    this.isHide = false;
    this.svgConfetti.goToAndPlay(0, true);
  }


  complete(animationItem: AnimationItem): void {
    this.isHide = true;
  }

  animationCreated(animationItem: AnimationItem): void {
    this.svgConfetti = animationItem;
  }
}
