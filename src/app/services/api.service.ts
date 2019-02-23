import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions: any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(environment.GITHUB_USERNAME + ":" + environment.GITHUB_PASSWORD)
      })
    };

  }

  get_users_list(search_string) {
    return this.http.get('https://api.github.com/search/users?q=' + search_string, this.httpOptions);
  }

  get_users_details(username) {
    let headers = new HttpHeaders();
    return this.http.get("https://api.github.com/users/" + username + "/repos", this.httpOptions);
  }

}
