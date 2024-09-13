import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.scss'],
})
export class AddEventsComponent implements OnInit {
  eventForm: FormGroup;
  singers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private spinner: NgxSpinnerService
  ) {
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
      console.log('hi', singers);
    });
  }

  onSubmit(): void {
    this.spinner.show()
    if (this.eventForm.valid) {
      this.adminService.createEvent(this.eventForm.value).subscribe(
        (response) => {
          alert('Event added successfully!');
          this.eventForm.reset();
            this.spinner.hide();
        },
        (error) => {
          alert('Error adding event');
          console.error(error);
            this.spinner.hide();
        }
      );
    } else {
      alert('Please fill all required fields.');
        this.spinner.hide();
    }
  }
}
