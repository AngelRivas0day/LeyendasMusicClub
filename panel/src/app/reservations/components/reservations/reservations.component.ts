import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'app/services/services';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  reservations: any[];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'cliente', 'telefono', 'fecha', 'personas'];
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private apiService: ApiService
  ) { 
    this.fetchData();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.reservations);
    this.dataSource.sort = this.sort;
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
    });
  }

  applyFilter(filterValue: string) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
    this.dataSource.filter = filterValue;
  }

}
