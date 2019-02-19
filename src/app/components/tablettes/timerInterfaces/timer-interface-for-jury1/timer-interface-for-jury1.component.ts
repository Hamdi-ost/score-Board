import { Component, OnInit } from '@angular/core';
import { ScoreInterfaceComponent } from 'src/app/components/score-interface/timer-interface/score-interface.component';
import { ScoreService } from 'src/app/services/score.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-timer-interface-for-jury1',
  templateUrl: './timer-interface-for-jury1.component.html',
  styleUrls: ['./timer-interface-for-jury1.component.css']
})
export class TimerInterfaceForJury1Component implements OnInit {
  constructor(
    private scoreService: ScoreService,
    private interfaceTimer: ScoreInterfaceComponent,
    private timerService: TimerService
  ) {
  }

  ngOnInit() {}

  addBonus1() {
    this.scoreService.setBonus1();
  }

  addBonus2() {
    this.scoreService.setBonus2();
  }

  onPause() {
    this.timerService.onPause();
  }

}
