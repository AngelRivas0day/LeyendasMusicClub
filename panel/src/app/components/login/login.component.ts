import { Component, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SubSink } from 'subsink';

import { ApiService } from 'app/services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  active = false;

  subs = new SubSink();

  loginForm: FormGroup;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.subs.add(
      this.api.auth.subscribe(( active ) => { this.active = active; })
    );
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ]))
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  login( data ) {
    if ( this.loginForm.valid ) {
      this.api.login( data );
      // setTimeout(()=>{
      //   window.location.reload();
      // },1000)
    }
  }

}
