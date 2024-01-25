import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatCardActions,
    FormsModule,
    MatInput,],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  user: any = JSON.parse(localStorage.getItem('user') ?? '');

  @Input() userData = {
    Username: this.user.Username,
    Password: '',
    Email: this.user.Email,
    Birthday: this.user.Birthday.split("T")[0],
  };

  updateUser():void {
    console.log('Update user')
    this.fetchApiData.editUser(this.userData.Username, this.userData).subscribe(
      (result) => {
        console.log(result)
        
        this.user.Username = this.userData.Username;
        this.user.Email = this.userData.Email;
        this.user.Birthday = this.userData.Birthday;
        if(this.userData.Password && this.userData.Password !== '') {
          this.user.Password = this.userData.Password;
        }

        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
        
    this.router.navigate(['movies']);
      },
      (result) => {
        console.log(result)
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
