import { Component, OnInit} from '@angular/core';
import { UserIdleService } from 'angular-user-idle';
import { ApiService } from './services/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private userIdle: UserIdleService,
    private apiService: ApiService
    ){

  }
  ngOnInit(){
    //Start watching for user inactivity.
    this.userIdle.startWatching();
    
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log("count"));
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.apiService.logout();
    });
  }
}
