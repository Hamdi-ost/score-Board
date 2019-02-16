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
  aller;

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
    console.log(this.aller);
  }

  validerM4() {

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
