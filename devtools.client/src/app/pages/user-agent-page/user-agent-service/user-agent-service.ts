import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserAgentModel } from '../../../api/user-agent';

const apiRoute = '/api/user-agent';

@Injectable({
  providedIn: 'root',
})
export class UserAgentService {
  private http = inject(HttpClient);

  get() {
    return this.http.get<UserAgentModel>(apiRoute);
  }
}
