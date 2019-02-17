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

  // // Create Team
  // AddTeam(team: Teams) {
  //   this.teamsRef.push({
  //     name: team.name,
  //     score: team.score,
  //   });
  // }

  // // Fetch Single Team Object
  // GetTeam(id: string) {
  //   this.teamRef = this.db.object('teams/' + id);
  //   return this.teamRef;
  // Delete Team Object
  // DeleteTeam(id: string) {
  //  this.teamRef = this.db.object('teams/' + id);
  //  this.teamRef.remove();
  // }
  // }

  addTeam (name) {
    const itemsRef = this.db.list('categories/cat3/teams');
    itemsRef.set( 'team1/name', name);
  }

  startEtage1 () {
    const itemsRef = this.db.list('missionsEtage');
    itemsRef.set( 'missionEtage1', true);
    const itemsRef2 = this.db.list('etages');
    itemsRef2.set( 'etage1', true);
  }

  startEtage2 () {
    const itemsRef = this.db.list('missionsEtage');
    itemsRef.set( 'missionEtage2', true);
    const itemsRef2 = this.db.list('etages');
    itemsRef2.set( 'etage1', false);
    itemsRef2.set( 'etage2', true);
  }

  // Fetch Teams List
  GetTeamsList() {
    this.teamsRef = this.db.list('categories/cat3/teams');
    return this.teamsRef;
  }

  ready() {
    this.teamsRef = this.db.list('etages');
    return this.teamsRef;
  }

  missionEtage() {
    this.teamsRef = this.db.list('missionsEtage');
    return this.teamsRef;
  }

  resetTime () {
    const itemsRef = this.db.list('etages');
    itemsRef.set( 'etage1', false);
    itemsRef.set( 'etage2', false);
  }

  resetEtage () {
    const itemsRef = this.db.list('missionsEtage');
    itemsRef.set( 'missionEtage1', false);
    itemsRef.set( 'missionEtage2', false);
  }

  getNbTours() {
    this.teamsRef = this.db.list('nbTours');
    return this.teamsRef;
  }

  // Update Team Object
  UpdateNbTours(nb) {
    const itemsRef = this.db.list('nbTours');
    itemsRef.set('nb', nb);
  }

  // Update Team Object
  UpdateTeams(team) {
    const itemsRef = this.db.list('categories/cat3/teams');
    itemsRef.set('team1', team);
  }
}
