import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() item: any
  user_github_list: any;
  component_state: string = 'started';
  button_string = "Details";
  constructor(private api: ApiService) {
  }

  load_user_details(data) {
    this.user_github_list = data;
    this.button_string = 'Collapse';
    this.component_state = (this.user_github_list.length == 0) ? 'empty' : 'loaded';
  }

  show_details() {
    if (this.user_github_list == undefined) {
      this.component_state = 'loading';
      this.button_string = 'Loading';
      this.api.get_users_details(this.item.login).subscribe(data => this.load_user_details(data), error => { this.component_state = 'error'; this.user_github_list = undefined; this.button_string = 'Details'; }, () => { });
    }
  }
  ngOnInit() {
  }
}
