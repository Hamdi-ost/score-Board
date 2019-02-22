import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScoreInterfaceComponent } from './components/score-interface/timer-interface/score-interface.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { MissionInterfaceForJuryComponent } from './components/tablettes/mission-interface-for-jury/mission-interface-for-jury.component';
// tslint:disable-next-line:max-line-length
import { TimerInterfaceForJury2Component } from './components/tablettes/timerInterfaces/timer-interface-for-jury2/timer-interface-for-jury2.component';
// tslint:disable-next-line:max-line-length
import { TimerInterfaceForJury1Component } from './components/tablettes/timerInterfaces/timer-interface-for-jury1/timer-interface-for-jury1.component';
import { MissionsInterfaceComponent } from './components/score-interface/missions-interface/missions-interface.component';
import { CubeComponent } from './components/cube/cube.component';

const routes: Routes = [
  {path: 'timerScore', component: ScoreInterfaceComponent},
  {path: 'missionScore', component: MissionsInterfaceComponent},
  {path: 'timerJury1', component: TimerInterfaceForJury1Component},
  {path: 'timerJury2', component: TimerInterfaceForJury2Component},
  {path: 'missionJury', component: MissionInterfaceForJuryComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ScoreInterfaceComponent,
    MissionInterfaceForJuryComponent,
    TimerInterfaceForJury2Component,
    TimerInterfaceForJury1Component,
    MissionsInterfaceComponent,
    CubeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes),
    FormsModule,
    CountdownModule
  ],
  providers: [ScoreInterfaceComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
