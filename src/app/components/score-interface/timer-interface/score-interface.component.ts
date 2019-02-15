import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';
import { Teams } from 'src/app/shared/teams';

@Component({
  selector: 'app-score-interface',
  templateUrl: './score-interface.component.html',
  styleUrls: ['./score-interface.component.css']
})
export class ScoreInterfaceComponent implements OnInit {

  Team: Teams[];                 // Save Teams data in Team's array.
  hideWhenNoTeam = false; // Hide Teams data table when no Team.
  noData = false;            // Showing No Team Message, when no Team in database.
  preLoader = true;
  team1;
  team2;
  time1;
  time2;
  ready;
  constructor(private scoreService: ScoreService) {
    this.scoreService.ready().snapshotChanges().subscribe(data => {
      this.ready = data[0].payload.toJSON();
    });
  }


  ngOnInit() {
    this.dataState(); // Initialize Team's list, when component is ready
    const s = this.scoreService.GetTeamsList();
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
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
  }

  dataState() {
    this.scoreService.GetTeamsList().valueChanges().subscribe(data => {
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
