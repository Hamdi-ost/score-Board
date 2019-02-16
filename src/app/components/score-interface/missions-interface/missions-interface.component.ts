import { Component, OnInit } from '@angular/core';
import { ScoreMissionsService } from 'src/app/services/score-missions.service';
import { TeamsMission } from 'src/app/shared/teamsMission';
import { MissionsService } from 'src/app/services/missions.service';
import { Missions } from 'src/app/shared/missions';

@Component({
  selector: 'app-missions-interface',
  templateUrl: './missions-interface.component.html',
  styleUrls: ['./missions-interface.component.css']
})
export class MissionsInterfaceComponent implements OnInit {
  Team: TeamsMission[]; // Save Teams data in Team's array.
  hideWhenNoTeam = false; // Hide Teams data table when no Team.
  noData = false; // Showing No Team Message, when no Team in database.
  preLoader = true;
  team;
  missionsAccomplished = [];
  ready;
  scoreTotal = 0;
  missions: Missions[];

  constructor(
    private scoreService: ScoreMissionsService,
    private missionsService: MissionsService
  ) {
    this.scoreService
      .ready()
      .snapshotChanges()
      .subscribe(data => {
        this.ready = data[0].payload.toJSON();
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
        this.Team.push(a as TeamsMission);
      });
      this.team = this.Team[0].name;
      this.scoreTotal = this.Team[0].scoreTotal;
      if (this.Team[0].missionsAccomplished) {
        this.missionsAccomplished = Object.values(
          this.Team[0].missionsAccomplished
        );
      } else {
        this.missionsAccomplished = [];
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
}
