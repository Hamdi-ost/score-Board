import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-timer-interface-for-jury2',
  templateUrl: './timer-interface-for-jury2.component.html',
  styleUrls: ['./timer-interface-for-jury2.component.css']
})
export class TimerInterfaceForJury2Component implements OnInit {
  distance;
  disqualifierTeam;
  constructor(
    private scoreService: ScoreService
  ) {
  }

  ngOnInit() {}

  addBonus1() {
    this.scoreService.setBonus1TeamB(true);
  }

  addBonus2() {
    this.scoreService.setBonus2TeamB(true);
  }

  addDistance() {
    this.scoreService.setDistanceTeamB(this.distance);
  }

  pauseTimer () {
    this.scoreService.stopTimerTeamB(true);
  }

  disqualifier() {
    this.disqualifierTeam = true;
    this.scoreService.disqualifierTeamB(true);
  }

  qualifier() {
    this.disqualifierTeam = false;
    this.scoreService.disqualifierTeamB(false);
  }

}
