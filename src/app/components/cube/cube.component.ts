import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnInit {
  @ViewChild('audioOption') audioPlayerRef: ElementRef;


  cube;

  constructor(private scoreService: ScoreService) {
  }

  ngOnInit() {
    this.scoreService
    .cube()
    .snapshotChanges()
    .subscribe(data => {
      this.cube = data[0].payload.toJSON();
    });
  }



}
