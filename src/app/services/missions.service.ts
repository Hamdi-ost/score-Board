import { Injectable } from '@angular/core';
import { Teams } from '../shared/teams';  // Team data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  missionsRef: AngularFireList<any>;    // Reference to Team data list, its an Observable
  missionRef: AngularFireObject<any>;   // Reference to Team object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) {}


  // Fetch Single Team Object
  GetMission(id: string) {
    this.missionRef = this.db.object('missions/' + id);
    return this.missionRef;
  }

  // Fetch Teams List
  GetMissionsList() {
    this.missionsRef = this.db.list('missions');
    return this.missionsRef;
  }
}
