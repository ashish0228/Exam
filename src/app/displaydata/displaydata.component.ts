import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-displaydata',
  templateUrl: './displaydata.component.html',
  styleUrls: ['./displaydata.component.css']
})
export class DisplaydataComponent implements OnInit {

  dataArray: any = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('loginDetail')) {
      this.dataArray = JSON.parse(localStorage.getItem('jobAppDetail') || '');
    } else {
    alert('Please Login');
    this.router.navigateByUrl('/login');
    }
  }

  deleteData(i: number) {
    this.dataArray.splice(i, 1);
    localStorage.removeItem('jobAppDetail');
    localStorage.setItem('jobAppDetail', JSON.stringify(this.dataArray));
  }

}
