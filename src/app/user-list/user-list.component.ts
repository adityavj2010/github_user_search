import { Component, OnInit } from '@angular/core';
import { SearchbarService } from './../services/searchbar.service';
import { ApiService } from './../services/api.service';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  error_message: string = '';
  component_state: string = 'started';
  pagination_array: any;
  items_per_page: number = 3;
  total_items: number = 0;
  page_number: number = 1;
  user_list: any;
  display_list: any;
  order_by: number = 1;
  order_asc: boolean = true;
  total_pages: number = 0;

  constructor(private searchbarService: SearchbarService, private api: ApiService) {

  }

  parse_github_json(data) {
    this.user_list = data.items;
    this.total_items = this.user_list.length;
    this.component_state = (this.total_items == 0) ? 'empty' : 'loaded';
    this.sort_data();
    this.set_total_pages();
    this.set_data_list();
  }

  set_total_pages() {
    this.total_pages = Math.ceil(this.total_items / this.items_per_page);
  }

  set_data_list() {
    if (!this.order_asc) {
      var mod = this.total_items % this.items_per_page;
      mod = (mod == 0) ? this.items_per_page : mod;
      var page_diff = this.total_pages - this.page_number;
      first = (page_diff - 1) * this.items_per_page + mod;
      last = (page_diff) * this.items_per_page + mod;
      first = (first < 0) ? 0 : first;
      this.display_list = this.user_list.slice(first, last).reverse();
      return;
    }
    var first = (this.page_number - 1) * this.items_per_page;
    var last = ((this.page_number) * this.items_per_page);
    this.display_list = this.user_list.slice(first, last);
  }

  sort_data() {
    this.user_list.sort((a, b) => {
      if (this.order_by == 1) {
        if (a.login < b.login) return -1;
        else if (a.login > b.login) return 1;
        else return 0;
      }
      else {
        if (a.score < b.score) return -1;
        else if (a.score > b.score) return 1;
        else return 0;
      }
    });

  }

  change_order(data) {
    if (data == this.order_by) {
      return;
    }
    else {
      this.order_by = data;
      if (this.user_list != undefined) {
        this.sort_data();
        this.set_data_list();
      }
    }
  }

  ngOnInit() {
    this.searchbarService.username.subscribe((data) => {
      this.component_state = 'loading';
      this.api.get_users_list(data).subscribe(response => this.parse_github_json(response), error => {
        this.component_state = 'error';
        if (!environment.GITHUB_USERNAME || !environment.GITHUB_PASSWORD) {
          this.error_message = ' : Github has api limit for unauthorized user,please go to enivornment.ts to add username and password for more limit.';
        }
        else {
          this.error_message = '';
        }
      }, () => { });
    });
    this.searchbarService.order_by.subscribe((data) => this.change_order(data));
  }

}

