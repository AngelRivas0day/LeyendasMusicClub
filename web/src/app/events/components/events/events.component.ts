import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: any[];
  baseUrl: string = environment.baseUrl + '/events/get-image/';

  constructor(
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(){
    this.apiService.getAll('events/list').subscribe((data:any)=>{
      this.events = data;
      console.log(data);
    });
  }
}
