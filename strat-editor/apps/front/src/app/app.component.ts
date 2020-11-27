import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agent } from '@strat-editor/models'

@Component({
  selector: 'strat-editor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  agents : Agent[] = [];
  constructor(private http: HttpClient){
    this.fetch();
  }

  fetch() {
    this.http.get<Agent[]>('/api/agents').subscribe((t) => (this.agents = t));
  }
  title = 'front';

  addAgent() {
    this.http.post('/api/addAgent', {name:"test",imgUrl:"http://aboucipu.fr"}).subscribe(() => {
      this.fetch();
    });
  }
}
