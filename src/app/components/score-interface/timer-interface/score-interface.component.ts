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
  distanceTeamA;
  distanceTeamB;
  finalTimeTeamA;
  finalTimeTeamB;
  // ---------------------- //
  controlBtnText = 'Start';
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  start = false;
  pause;
  x = 1;
  intervalId;
  // team B //
  hourB = 0;
  minuteB = 0;
  secondB = 0;
  millisecondB = 0;
  startB = false;
  pauseB;
  xB = 1;
  intervalIdB;

  constructor(private scoreService: ScoreService) {
    this.scoreService
      .ready()
      .snapshotChanges()
      .subscribe(data => {
        this.ready = data[0].payload.toJSON();
        this.reset();
        this.onStart();
        this.resetB();
        this.onStartB();
      });
      // TEAM A
    this.scoreService
      .end()
      .snapshotChanges()
      .subscribe(end => {
        this.end = end[0].payload.toJSON();
        if (this.end) {
          this.scoreService
            .getTimerTeamA()
            .snapshotChanges()
            .subscribe(data => {
              const bonus1 = data[0].payload.toJSON();
              const bonus2 = data[1].payload.toJSON();
              this.distanceTeamA = data[2].payload.toJSON();
              const timeString = data[4].payload.toJSON();
              const time: any = this.toDate(timeString, 'm:s:ms');
              if (bonus1 && bonus2) {
                const timeFinal = new Date(time - 10000);
                this.finalTimeTeamA = timeFinal.getMinutes() + ':' + timeFinal.getSeconds() + ':' + timeFinal.getMilliseconds();
              } else if (bonus1 || bonus2) {
                const timeFinal = new Date(time - 5000);
                this.finalTimeTeamA = timeFinal.getMinutes() + ':' + timeFinal.getSeconds() + ':' + timeFinal.getMilliseconds();
              } else {
                const timeFinal = new Date(time);
                this.finalTimeTeamA = timeFinal.getMinutes() + ':' + timeFinal.getSeconds() + ':' + timeFinal.getMilliseconds();
              }
            });
        }
      });
      // Team B
      this.scoreService
      .end()
      .snapshotChanges()
      .subscribe(end => {
        this.end = end[0].payload.toJSON();
        if (this.end) {
          this.scoreService
            .getTimerTeamB()
            .snapshotChanges()
            .subscribe(data => {
              const bonus1 = data[0].payload.toJSON();
              const bonus2 = data[1].payload.toJSON();
              this.distanceTeamB = data[2].payload.toJSON();
              const timeString = data[4].payload.toJSON();
              const time: any = this.toDate(timeString, 'm:s:ms');
              if (bonus1 && bonus2) {
                const timeFinal = new Date(time - 10000);
                this.finalTimeTeamB = timeFinal.getMinutes() + ':' + timeFinal.getSeconds() + ':' + timeFinal.getMilliseconds();
              } else if (bonus1 || bonus2) {
                const timeFinal = new Date(time - 5000);
                this.finalTimeTeamB = timeFinal.getMinutes() + ':' + timeFinal.getSeconds() + ':' + timeFinal.getMilliseconds();
              } else {
                const timeFinal = new Date(time);
                this.finalTimeTeamB = timeFinal.getMinutes() + ':' + timeFinal.getSeconds() + ':' + timeFinal.getMilliseconds();
              }
            });
        }
      });
  }

  toDate(dStr, format) {
    const now = new Date();
    if (format === 'm:s:ms') {
      now.setMinutes(dStr.split(':')[0]);
      now.setSeconds(dStr.split(':')[1]);
      now.setMilliseconds(dStr.split(':')[2].split(' ')[0]);
      return now.getTime();
    } else {
      return 'Invalid Format';
    }
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
    // team A
    this.scoreService
      .getPauseTeamA()
      .snapshotChanges()
      .subscribe(pause => {
        this.pause = pause[0].payload.toJSON();
        if (this.pause) {
          this.scoreService.setTimerTeamA(
            this.minute + ':' + this.second + ':' + this.millisecond
          );
          clearInterval(this.intervalId);
        }
      });
      this.scoreService
      .getBonusTeamA()
      .snapshotChanges()
      .subscribe(bonus => {
        const bon1 = bonus[0].payload.toJSON();
        const bon2 = bonus[1].payload.toJSON();
        if ((bon1 && !bon2) || (bon2 && bon1) || (bon2 && !bon1)) {
          this.bonusTeamA = this.bonusTeamA + 5;
        }
        if (!bon2 && !bon1) {
          this.bonusTeamA = 0;
        }
      });
      // team B
      this.scoreService
      .getPauseTeamB()
      .snapshotChanges()
      .subscribe(pause => {
        this.pauseB = pause[1].payload.toJSON();
        if (this.pauseB) {
          this.scoreService.setTimerTeamB(
            this.minuteB + ':' + this.secondB + ':' + this.millisecondB
          );
          clearInterval(this.intervalIdB);
        }
      });
      this.scoreService
      .getBonusTeamB()
      .snapshotChanges()
      .subscribe(bonus => {
        const bon1 = bonus[0].payload.toJSON();
        const bon2 = bonus[1].payload.toJSON();
        if ((bon1 && !bon2) || (bon2 && bon1) || (bon2 && !bon1)) {
          this.bonusTeamB = this.bonusTeamB + 5;
        }
        if (!bon2 && !bon1) {
          this.bonusTeamB = 0;
        }
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
    clearInterval(this.intervalId);
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

    if (this.minute === 2 ) {
      this.onPause();
    }
  }

  // Team B
  resetB() {
    this.startB = false;
    this.pauseB = false;
    this.x = 1;
    this.controlBtnText = 'Start';
    this.hour = this.minuteB = this.secondB = this.millisecondB = 0;
    clearInterval(this.intervalIdB);
  }

  onStartB() {
    this.xB = 1;
    this.startB = true;
    this.intervalIdB = setInterval(() => {
      this.updateTimeB();
    }, 10);
  }

  onPauseB() {
    clearInterval(this.intervalIdB);
  }

  updateTimeB() {
    this.millisecondB += this.xB;

    if (this.millisecondB > 99) {
      this.millisecondB = 0;
      this.secondB++;
    }

    if (this.secondB > 59) {
      this.secondB = 0;
      this.minuteB++;
    }

    if (this.minuteB > 59) {
      this.minuteB = 0;
      this.hourB++;
    }

    if (this.minuteB === 2 ) {
      this.onPauseB();
    }
  }

}
