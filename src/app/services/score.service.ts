import { Injectable } from '@angular/core';
import { Teams } from '../shared/teams';  // Team data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  teamsRef: AngularFireList<any>;    // Reference to Team data list, its an Observable
  teamRef: AngularFireObject<any>;   // Reference to Team object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) {}



  // Fetch Teams List
  GetTeamsList() {
    this.teamsRef = this.db.list('categories/cat1/teams');
    return this.teamsRef;
  }

  ready() {
    this.teamsRef = this.db.list('ready');
    return this.teamsRef;
  }

  end() {
    this.teamsRef = this.db.list('end');
    return this.teamsRef;
  }

  setReady() {
    const itemsRef = this.db.list('ready');
    itemsRef.set('ready', true);
  }

  setDistance(distance) {
    const itemsRef = this.db.list('categories/cat1/teams');
    itemsRef.set('teamA/distance', distance);
  }

  // Update Team Object
  UpdateTeams(team: Teams[]) {
    const itemsRef = this.db.list('teams');
    itemsRef.set('team 1', team[0]);
    itemsRef.set('team 2', team[1]);
  }

  stopTimerTeam1() {
    const itemsRef = this.db.list('stopTimer');
    itemsRef.set('team1', false);
  }

  setBonus1 () {
    const itemsRef = this.db.list('categories/cat1/teams');
    itemsRef.set('teamA/bonus1', true);
  }

  setBonus2 () {
    const itemsRef = this.db.list('categories/cat1/teams');
    itemsRef.set('teamA/bonus2', true);
  }

  getBonus1 () {
    this.teamsRef = this.db.list('categories/cat1/teams/teamA');
    return this.teamsRef;
  }

  getBonus2 () {
    this.teamsRef = this.db.list('categories/cat1/teams/teamA');
    return this.teamsRef;
  }

}
