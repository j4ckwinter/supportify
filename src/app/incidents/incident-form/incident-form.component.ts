import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.css']
})
export class IncidentFormComponent implements OnInit {

  incident: {id: number};

  constructor(private route: ActivatedRoute) { } // get access to currently loaded route

  ngOnInit() {
    this.incident = {
      id: this.route.snapshot.params['id']
    };
  }

}
