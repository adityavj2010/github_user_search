import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  params:HttpHeaders;
  constructor(private http:HttpClient) { 
  }
  get_users_list(search_string)
  {
    
    return this.http.get('https://api.github.com/search/users?q='+search_string);
  }

  get_users_details(username)
  {
    return this.http.get("https://api.github.com/users/"+username+"/repos");
  }

}
