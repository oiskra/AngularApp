import { Component } from '@angular/core';
import { Project } from 'src/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects: Project[] = [
    {name: 'Angular Project', description: 'Cool app!'},
    {name: 'React Project', description: 'Cooler app!'},
    {name: 'Angular Project', description: 'Cool app!'},
    {name: 'React Project', description: 'Cooler app!'},
    {name: 'Angular Project', description: 'Cool app!'},
    {name: 'React Project', description: 'Cooler app!'},
    {name: 'Angular Project', description: 'Cool app!'},
    {name: 'React Project', description: 'Cooler app!'},
    {name: 'Angular Project', description: 'Cool app!'},
    {name: 'React Project', description: 'Cooler app!'},
    {name: 'Angular Project', description: 'Cool app!'},
    {name: 'React Project', description: 'Cooler app!'},
    {name: 'Angular Project', description: 'Cool app!'},
    {name: 'React Project', description: 'Cooler app!'},
    {name: 'Angular Project', description: 'Cool app!'},
    {name: 'React Project', description: 'Cooler app!'},
    {name: 'Angular Project', description: 'Cool app!'},
    {name: 'React Project', description: 'Cooler app!'},

  ]
  displayedColumns: string[] = ['Name', 'Description'] 
}
