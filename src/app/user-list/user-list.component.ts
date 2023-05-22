import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  username: string;
  password: string;
  isEnabled: boolean;
  registerDate: Date;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  filter!: string;
  users!: User[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
    this.searchUsers();
  }

  getUsers(): void {
    const url = 'http://localhost:8080/api/users';
    let params = new HttpParams();
    
    if (this.filter) {
      params = params.set('filter', this.filter);
    }
    
    this.http.get<User[]>(url, { params }).subscribe(users => {
      this.users = users;
    });
  }

  searchUsers(): void {
    const url = 'http://localhost:8080/api/users/search';
    let params = new HttpParams();
    
    if (this.filter) {
      params = params.set('query', this.filter);
    }
    
    this.http.get<User[]>(url, { params }).subscribe(users => {
      this.users = users;
    });
  }
}
