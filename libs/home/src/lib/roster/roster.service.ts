// roster.service.ts

import { Injectable } from '@angular/core';
import { ApiService } from '@realworld/core/http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RosterService {
  constructor(private apiService: ApiService) {}

  getRoster(): Observable<any> {
    return this.apiService.get('/roster');
  }
}
