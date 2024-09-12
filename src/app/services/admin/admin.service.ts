import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  getEventsBySingerId(singerId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/singer/${singerId}`);
  }

  filterEventsByDate(startDate: string, endDate: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/filter`, {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });
  }
}
