import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';
import { Teams } from 'src/app/shared/teams';

@Component({
  selector: 'app-score-interface',
  templateUrl: './score-interface.component.html',
  styleUrls: ['./score-interface.component.css']
})
export class ScoreInterfaceComponent implements OnInit {
  Team: Teams[]; // Save Teams data in Team's array.
  hideWhenNoTeam = false; // Hide Teams data table when no Team.
  noData = false; // Showing No Team Message, when no Team in database.
  preLoader = true;
  team1;
  team2;
  time1;
  time2;
  ready;
  end;
  bonusTeamA = 0;
  bonusTeamB = 0;
  // ---------------------- //
  controlBtnText = 'Start';
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  start = false;
  pause = false;
  x = 1;
  intervalId;

  constructor(private scoreService: ScoreService) {
    this.bonusTeamA = this.bonusTeamA - 5;
    this.bonusTeamB = this.bonusTeamB - 5;
    if (this.bonusTeamA < 0) {
      this.bonusTeamA = 0 ;
    }
    if (this.bonusTeamB < 0) {
      this.bonusTeamB = 0 ;
    }
    this.scoreService
      .ready()
      .snapshotChanges()
      .subscribe(data => {
        this.ready = data[0].payload.toJSON();
        this.onStart();
      });
    this.scoreService
    .end()
    .snapshotChanges()
    .subscribe(end => {
      this.end = end[0].payload.toJSON();
    });
  }

  ngOnInit() {
    this.dataState(); // Initialize Team's list, when component is ready
    const s = this.scoreService.GetTeamsList();
    s.snapshotChanges().subscribe(data => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Team = [];
      data.forEach(item => {
        const a = item.payload.toJSON();
        this.Team.push(a as Teams);
      });
      this.team1 = this.Team[0].name;
      this.team2 = this.Team[1].name;
      this.time1 = this.Team[0].time;
      this.time2 = this.Team[1].time;
    });
    this.scoreService.getBonus1().snapshotChanges().subscribe(bonus1 => {
      const bon = bonus1[0].payload.toJSON();
      if (bon) { this.bonusTeamA = this.bonusTeamA + 5; }
    });
    this.scoreService.getBonus2().snapshotChanges().subscribe(bonus2 => {
      if (bonus2[0].payload.toJSON()) { this.bonusTeamA = this.bonusTeamA + 5; }
    });
  }

  dataState() {
    this.scoreService
      .GetTeamsList()
      .valueChanges()
      .subscribe(data => {
        this.preLoader = false;
        if (data.length <= 0) {
          this.hideWhenNoTeam = false;
          this.noData = true;
        } else {
          this.hideWhenNoTeam = true;
          this.noData = false;
        }
      });
  }
  // -------------------------//
  reset() {
    this.start = false;
    this.pause = false;
    this.x = 1;
    this.controlBtnText = 'Start';
    this.hour = this.minute = this.second = this.millisecond = 0;
    clearInterval(this.intervalId);
  }

  onStart() {
      this.x = 1;
      this.start = true;
      this.intervalId = setInterval(() => {
        this.updateTime();
      }, 10);
  }

  onPause() {
    this.pause = true;
    this.controlBtnText = 'Resume';
    clearInterval(this.intervalId);
    console.log(this.pause);
    console.log(this.controlBtnText);
    console.log(this.intervalId);
  }
  onResume() {
    this.controlBtnText = 'Stop';
    this.pause = false;
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 10);
  }

  updateTime() {
    this.millisecond += this.x;

    if (this.millisecond > 99) {
      this.millisecond = 0;
      this.second++;
    }

    if (this.second > 59) {
      this.second = 0;
      this.minute++;
    }

    if (this.minute > 59) {
      this.minute = 0;
      this.hour++;
    }
  }
}
