// App Component Controller

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  
export class AppComponent {
  ngOnInit(): void {
    console.log('initalization of: (App Component Controller)');
  }
}
