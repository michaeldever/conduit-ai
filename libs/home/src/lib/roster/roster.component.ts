import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { RosterService } from './roster.service';
import { RosterUser } from './roster.type';
import { Observable, Subject, Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'roster',
  standalone: true,
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RosterListComponent implements OnInit {
  users = new Subject<RosterUser[]>();

  constructor(private rosterService: RosterService) {}

  ngOnInit() {
    this.rosterService.getRoster().subscribe((roster) => {
      console.log(roster);
      this.users.next(roster);
    });
  }
}
