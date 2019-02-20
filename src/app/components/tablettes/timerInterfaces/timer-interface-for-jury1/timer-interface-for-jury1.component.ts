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
  distance;

  constructor(
    private scoreService: ScoreService
  ) {
  }

  ngOnInit() {}

  addBonus1() {
    this.scoreService.setBonus1TeamA(true);
  }

  addBonus2() {
    this.scoreService.setBonus2TeamA(true);
  }

  addDistance() {
    this.scoreService.setDistanceTeamA(this.distance);
  }

  pauseTimer () {
    this.scoreService.stopTimerTeamA(true);
  }

  reset() {
    this.scoreService.setDistanceTeamA(0);
    this.scoreService.setDistanceTeamB(0);
    this.scoreService.setBonus1TeamA(false);
    this.scoreService.setBonus2TeamA(false);
    this.scoreService.setBonus1TeamB(false);
    this.scoreService.setBonus2TeamB(false);
    this.scoreService.stopTimerTeamA(false);
    this.scoreService.stopTimerTeamB(false);
    this.scoreService.setEnd(false);
    this.scoreService.setReady(false);
    this.distance = 0;
  }

  result() {
    this.scoreService.setEnd(true);
  }

  start() {
    this.scoreService.setReady(true);
  }
}
