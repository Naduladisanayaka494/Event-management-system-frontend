import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../auth/services/storage/storage.service';

export interface EventDto {
  id?: number;
  eventName: string;
  location: string;
  eventDateTime: string; // Use ISO 8601 format
  assignedSingerId: number;
}

export interface Event {
  id: number;
  eventName: string;
  location: string;
  eventDateTime: string; // Use ISO 8601 format
  assignedSingerId: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api/events';
  private baseUrl2 = 'http://localhost:8080/api/auth/singers'; // Update with the actual URL

  constructor(private http: HttpClient) {}
  createEvent(eventDto: EventDto): Observable<Event> {
    return this.http.post<Event>(`${this.baseUrl}`, eventDto, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  getAllSingers() {
    return this.http.get<Event[]>(`${this.baseUrl2}`);
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}`);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  updateEvent(id: number, eventDto: EventDto): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/${id}`, eventDto, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  // getEventsBySingerId(): Observable<Event[]> {
  //   return this.http.get<Event[]>(
  //     `${this.baseUrl}/singer/` + StorageService.getUserId
  //   );
  // }

  createAuthorizationHeader(): HttpHeaders {
    let authHeader: HttpHeaders = new HttpHeaders();
    return authHeader.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }

  getEventsBySingerId(): Observable<Event[]> {
    const userId = StorageService.getUserId();
    const headers = this.createAuthorizationHeader();
    return this.http.get<Event[]>(`${this.baseUrl}/singer/` + userId, {
      headers: headers,
    });
  }

  filterEventsByDate(startDate: string, endDate: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/filter`, {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });
  }

  filterEventsByDateAndSinger(
    startDate: string,
    endDate: string,
    singerId?: string
  ): Observable<Event[]> {
    let params: any = { startDate: startDate, endDate: endDate };
    if (singerId) {
      params.singerId = singerId;
    }

    return this.http.get<Event[]>(`${this.baseUrl}/filter`, { params });
  }

  filterEventsByDateAndSingerstatic(
    startDate: string,
    endDate: string,
    singerId?: string
  ): Observable<Event[]> {
    const userId = StorageService.getUserId();
    let params: any = { startDate: startDate, endDate: endDate };
    if (singerId) {
      params.singerId = userId;
    }

    return this.http.get<Event[]>(`${this.baseUrl}/filter`, { params });
  }
}
