import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService, Query } from '../../../services/firestore.service';
import { Centro } from '../../../data/centro';

@Component({
  selector: 'asig-centro',
  templateUrl: './asig-centro.component.html',
  styleUrls: ['./asig-centro.component.css']
})
export class AsigCentroComponent implements OnInit {

  @Input() centro: Centro;


  constructor(private fs: FirestoreService) {

  }

  ngOnInit() {
  	
  }

}
