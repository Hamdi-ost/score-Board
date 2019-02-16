import { Injectable } from '@angular/core';
import { Teams } from '../shared/teams';  // Team data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ScoreMissionsService {

  teamsRef: AngularFireList<any>;    // Reference to Team data list, its an Observable
  teamRef: AngularFireObject<any>;   // Reference to Team object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) {}

  // Create Team
  AddTeam(team: Teams) {
    this.teamsRef.push({
      name: team.name,
      score: team.score,
    });
  }

  // Fetch Single Team Object
  GetTeam(id: string) {
    this.teamRef = this.db.object('teams/' + id);
    return this.teamRef;
  }

  // Fetch Teams List
  GetTeamsList() {
    this.teamsRef = this.db.list('categories/cat3/teams');
    return this.teamsRef;
  }

  ready() {
    this.teamsRef = this.db.list('ready');
    return this.teamsRef;
  }

  // Update Team Object
  UpdateTeams(team) {
    const itemsRef = this.db.list('categories/cat3/teams');
    itemsRef.set('team1', team);
  }

  // Delete Team Object
  DeleteTeam(id: string) {
    this.teamRef = this.db.object('teams/' + id);
    this.teamRef.remove();
  }
}
