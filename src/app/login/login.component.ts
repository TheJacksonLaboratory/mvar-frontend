import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {AuthenticationService} from './authentication.service';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    hide = true;
    username: string;
    password: string;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    alertSub: Subscription;
    alert = '';
    previousUrl: string;
    isUserLoggedIn = false;
    currentUser: any;

    //   //private alertService: AlertService
  constructor(
      private router: Router,
      public dialog: MatDialog,
      private route: ActivatedRoute,
      private authenticationService: AuthenticationService) {

      //this.authenticationService.logout();
  }

    ngOnInit() {

        this.currentUser = this.authenticationService.currentUserValue;
        if (this.currentUser && this.currentUser.access_token) {
            this.isUserLoggedIn = true;
        } else {
            this.isUserLoggedIn = false;
        }

        // reset login status
        //this.authenticationService.logout();
        // this.alertSub = this.alertService.getMessage().subscribe(alert => {
        //     if (alert !== undefined && alert.type === 'error') {
        //         this.error = alert.message;
        //     } else if (alert !== undefined && alert.type === 'success') {
        //         this.alert = alert.message;
        //     }
        // });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }

    ngOnDestroy(): void {
        //this.alertSub.unsubscribe();
    }

    /**
     * Login to the App
     */
    login(): void {
        this.submitted = true;
        // stop here if form is invalid
        if (this.username === undefined || this.password === undefined) {
            return;
        }
        this.error = '';
        this.loading = true;
        this.authenticationService.login(this.username, this.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error.message;
                    this.loading = false;
                    console.log(this.error)
                });
    }

    register(): void {
        this.router.navigate(['/register']);
    }

    logout(): void {
        this.authenticationService.logout();
        this.isUserLoggedIn = false;
    }

    onKey(event: any) {
        // if enter key is pressed
        if (event.keyCode === 13) {
            this.login();
        }
    }

}
