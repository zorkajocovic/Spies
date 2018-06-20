import { Component, OnInit } from '@angular/core';
import { MapInfo } from '../models/map.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  
  mapInfo: MapInfo;

  ngOnInit() {
  }

  constructor(){
    this.mapInfo = new MapInfo(45.242268, 19.842954, 
    "assets/ftn.png",
    "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
  }

  placeMarker($event){
    console.log($event.coords.lat);
    console.log($event.coords.lng);
  }



}
