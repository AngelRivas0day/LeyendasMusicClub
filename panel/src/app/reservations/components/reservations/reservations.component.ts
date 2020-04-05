import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/services/services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {merge, Observable, of as observableOf} from 'rxjs';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  reservations: any[];
  dataSource: any[];
  displayedColumns: string[] = ['id', 'cliente', 'telefono', 'fecha', 'personas'];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(
    private apiService: ApiService
  ) { 
  }

  ngOnInit() {
    this.fetchData();
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  fetchData(){
    this.apiService.getReservations().subscribe((data:any)=>{
      console.log(data);
      this.reservations = data;
    },err=>{
      console.log(err);
    },()=>{
      // this.dataSource = new MatTableDataSource<any>(this.reservations);
      // this.dataSource.sort = this.sort;
      // setTimeout(() => this.dataSource.paginator = this.paginator, 1300);
      this.resultsLength = this.reservations.length;
    });
  }
}
