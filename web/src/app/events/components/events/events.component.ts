import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/shared/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: any[];

  constructor(
    public eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(){
    this.eventsService.getEvents().subscribe((data:any)=>{
      this.events = data;
      console.log(data);
    });
  }
}
