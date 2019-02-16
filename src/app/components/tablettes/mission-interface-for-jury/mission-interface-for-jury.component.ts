import { Component, OnInit } from '@angular/core';
import { MissionsService } from 'src/app/services/missions.service';
import { Missions } from 'src/app/shared/missions';
import { ScoreMissionsService } from 'src/app/services/score-missions.service';

@Component({
  selector: 'app-mission-interface-for-jury',
  templateUrl: './mission-interface-for-jury.component.html',
  styleUrls: ['./mission-interface-for-jury.component.css']
})
export class MissionInterfaceForJuryComponent implements OnInit {
  missions;
  piquet = [];
  pourcentage = [];
  missionsAccomplished = [];
  scoreMissionAcc = [];
  scoreToral = 0;
  team;

  allerJCheck;
  allerRCheck;
  retourJCheck;
  retourRCheck;
  retourJ;
  retourR;
  allerJ;
  allerR;

  phaseCheck = [];
  phase = [];

  constructor(
    private missionsService: MissionsService,
    private scoreMission: ScoreMissionsService) { }

  ngOnInit() {
      this.missionsService.GetMissionsList().snapshotChanges().subscribe(missions => {
        this.missions = [];
        missions.forEach(item => {
          const b = item.payload.toJSON();
          this.missions.push(b as Missions);
        });
      });
      this.scoreMission.GetTeamsList().snapshotChanges().subscribe(team => {
        team.forEach(item => {
          const b = item.payload.toJSON();
          this.team = b['name'];
        });
      });
  }

  validerM1M2(i) {
    let scorei = this.missions[i].score - (this.piquet[i] * 5);
    if (scorei < 0) {
      scorei = 0;
    }
    this.pourcentage[i] = (scorei * 100) / this.missions[i].score;
    this.missionsAccomplished.push(this.missions[i].name);
    this.scoreMissionAcc.push(scorei);
    this.scoreToral = this.scoreToral + scorei;
    const team = {
       missionsAccomplished: this.missionsAccomplished,
       scoreMissionAcc: this.scoreMissionAcc,
       name: this.team,
       scoreTotal: this.scoreToral
    };
    this.scoreMission.UpdateTeams(team);
  }

  validerM3() {
    let scoreM3 = 0;
    if (this.allerJCheck) {
      scoreM3 = scoreM3 + (15 - (this.allerJ * 5));
    }
    if (this.allerRCheck) {
      scoreM3 = scoreM3 + (20 - (this.allerR * 5));
    }
     if (this.retourRCheck) {
      scoreM3 = scoreM3 + (20 - (this.retourR * 5));
    } if (this.retourJCheck) {
      scoreM3 = scoreM3 + (15 - (this.retourJ * 5));
    }
    if (scoreM3 < 0) {
      scoreM3 = 0;
    }
    this.pourcentage[2] = (scoreM3 * 100) / this.missions[2].score;
    this.missionsAccomplished.push(this.missions[2].name);
    this.scoreMissionAcc.push(scoreM3);
    this.scoreToral = this.scoreToral + scoreM3;
    const team = {
       missionsAccomplished: this.missionsAccomplished,
       scoreMissionAcc: this.scoreMissionAcc,
       name: this.team,
       scoreTotal: this.scoreToral
    };
    this.scoreMission.UpdateTeams(team);
  }

  validerM4() {
    let scoreM4 = 0;
    if (this.phaseCheck[0]) {
      scoreM4 = scoreM4 + (25 - (this.phase[0] * 5));
    }
    if (this.phaseCheck[1]) {
      if (this.phase[1] === 0) {
        scoreM4 = scoreM4 + 25;
      } else if (this.phase[1] === 4) {
        scoreM4 = scoreM4 + 5;
      } else {
      scoreM4 = scoreM4 + (25 - (this.phase[1] * 5));
      }
    }
    if (this.phaseCheck[2]) {
      scoreM4 = scoreM4 + (25 - (this.phase[2] * 5));
    }
    if (scoreM4 < 0) {
      scoreM4 = 0;
    }
    this.pourcentage[3] = (scoreM4 * 100) / this.missions[3].score;
    this.missionsAccomplished.push(this.missions[3].name);
    this.scoreMissionAcc.push(scoreM4);
    this.scoreToral = this.scoreToral + scoreM4;
    const team = {
       missionsAccomplished: this.missionsAccomplished,
       scoreMissionAcc: this.scoreMissionAcc,
       name: this.team,
       scoreTotal: this.scoreToral
    };
    this.scoreMission.UpdateTeams(team);
  }

  validerEtage2() {

  }

  reset() {
    const team = {
      missionsAccomplished: [],
      scoreMissionAcc: [],
      name: this.team,
      scoreTotal: 0
   };
   this.scoreMission.UpdateTeams(team);
  }

}
