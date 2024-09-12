import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin/admin.service'; // Adjust path accordingly

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.scss'],
})
export class AddEventsComponent implements OnInit {
  eventForm: FormGroup;
  singers: any[] = [];

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      location: ['', Validators.required],
      eventDateTime: ['', Validators.required],
      assignedSingerId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSingers();
  }

  loadSingers(): void {
    this.adminService.getAllSingers().subscribe((singers) => {
      this.singers = singers;
      console.log("hi",singers)
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.adminService.createEvent(this.eventForm.value).subscribe(
        (response) => {
          alert('Event added successfully!');
          this.eventForm.reset();
        },
        (error) => {
          alert('Error adding event');
          console.error(error);
        }
      );
    } else {
      alert('Please fill all required fields.');
    }
  }
}
