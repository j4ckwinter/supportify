import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.dataStorageService.storeIncidents()
      .subscribe(
        (response: HttpResponse<any>) => {
          console.log(response);
        }
      );
  }

}
