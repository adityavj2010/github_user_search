import { Component, OnInit } from '@angular/core';
import { SearchbarService } from "./../services/searchbar.service"
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {

  select_options: any = [{ value: 1, string: "Sort By Name" }, { value: 2, string: "Sort By Rank" }];
  selected_option: any = 1;
  username: string;
  constructor(private searchService: SearchbarService) {
  }
  change_order_by() {
    this.searchService.emit_order_by(this.selected_option);
  }
  search_on_github() {
    if (this.username != undefined) {
      this.searchService.emit_username(this.username);
    }
  }

  ngOnInit() {

  }

}

