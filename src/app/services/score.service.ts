import { Injectable } from '@angular/core';
import { Teams } from '../shared/teams'; // Team data type interface class
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  teamsRef: AngularFireList<any>; // Reference to Team data list, its an Observable
  teamRef: AngularFireObject<any>; // Reference to Team object, its an Observable too

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

  setEnd(end) {
    const itemsRef = this.db.list('end');
    itemsRef.set('end', end);
  }

  setReady(ready) {
    const itemsRef = this.db.list('ready');
    itemsRef.set('ready', ready);
  }

  setCube(ready) {
    const itemsRef = this.db.list('cube');
    itemsRef.set('cube', ready);
  }

  cube() {
    this.teamsRef = this.db.list('cube');
    return this.teamsRef;
  }

  setDistanceTeamA(distance) {
    const itemsRef = this.db.list('categories/cat1/teams');
    itemsRef.set('teamA/distance', distance);
  }

  setTimerTeamA(time) {
    const itemsRef = this.db.list('categories/cat1/teams');
    itemsRef.set('teamA/time', time);
  }

  getTimerTeamA() {
    this.teamsRef = this.db.list('categories/cat1/teams/teamA');
    return this.teamsRef;
  }

  UpdateTeams(team: Teams[]) {
    const itemsRef = this.db.list('teams');
    itemsRef.set('team 1', team[0]);
    itemsRef.set('team 2', team[1]);
  }

  stopTimerTeamA(bol) {
    const itemsRef = this.db.list('stopTimer');
    itemsRef.set('team1', bol);
  }

  getPauseTeamA() {
    this.teamsRef = this.db.list('stopTimer');
    return this.teamsRef;
  }

  setBonus1TeamA(bon) {
    const itemsRef = this.db.list('categories/cat1/teams');
    itemsRef.set('teamA/bonus1', bon);
  }

  setBonus2TeamA(bon) {
    const itemsRef = this.db.list('categories/cat1/teams');
    itemsRef.set('teamA/bonus2', bon);
  }

  getBonusTeamA() {
    this.teamsRef = this.db.list('categories/cat1/teams/teamA');
    return this.teamsRef;
  }


  getDistanceTeamA() {
    this.teamsRef = this.db.list('categories/cat1/teams/teamA');
    return this.teamsRef;
  }

  // TEAM B //



  setDistanceTeamB(distance) {
    const itemsRef = this.db.list('categories/cat1/teams');
    itemsRef.set('teamB/distance', distance);
  }

  setTimerTeamB(time) {
    const itemsRef = this.db.list('categories/cat1/teams');
    itemsRef.set('teamB/time', time);
  }

  getTimerTeamB() {
    this.teamsRef = this.db.list('categories/cat1/teams/teamB');
    return this.teamsRef;
  }


  stopTimerTeamB(bol) {
    const itemsRef = this.db.list('stopTimer');
    itemsRef.set('team2', bol);
  }

  getPauseTeamB() {
    this.teamsRef = this.db.list('stopTimer');
    return this.teamsRef;
  }

  setBonus1TeamB(bon) {
    const itemsRef = this.db.list('categories/cat1/teams');
    itemsRef.set('teamB/bonus1', bon);
  }

  setBonus2TeamB(bon) {
    const itemsRef = this.db.list('categories/cat1/teams');
    itemsRef.set('teamB/bonus2', bon);
  }

  getBonusTeamB() {
    this.teamsRef = this.db.list('categories/cat1/teams/teamB');
    return this.teamsRef;
  }

  getDistanceTeamB() {
    this.teamsRef = this.db.list('categories/cat1/teams/teamB');
    return this.teamsRef;
  }
}
