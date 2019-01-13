import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import BuildingComponent from "./interactivemap";
@Component({
  selector: 'map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit {



  public mapElement: ElementRef;

  constructor(private elRef: ElementRef) {
    this.mapElement = elRef;
   }

  ngOnInit() {

  }

  public ngAfterViewInit() {
      let buildingComponent = new BuildingComponent(this.mapElement.nativeElement);
      buildingComponent.Init();
    }

}
