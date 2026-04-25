import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ClipboardModel, ClipboardRequest } from '../../../api/clipboard';

const apiRoute = '/api/clipboards';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  private http = inject(HttpClient);

  get(code: string) {
    return this.http.get<ClipboardModel>(`${apiRoute}/${code}`);
  }

  upload(request: ClipboardRequest) {
    return this.http.post<ClipboardModel>(apiRoute, request);
  }
}
