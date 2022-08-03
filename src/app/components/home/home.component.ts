import { Tourist } from 'src/app/modal/tourist';
import { TouristService } from './../../services/tourist.service';
import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:TouristService) {
    this.service.getAllTourist().subscribe(data=>{
      this.sortedData=data;
    })
   }
   
   touristList!:Tourist[];
   sortedData!: Tourist[];
  ngOnInit(): void {
    this.service.getAllTourist().subscribe(data=>{
      this.touristList=data;
    })
  }
  sortData(sort: Sort) {
    const data = this.touristList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstName':
          return compare(a.firstName, b.firstName, isAsc);
        case 'lastName':
          return compare(a.lastName, b.lastName, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


