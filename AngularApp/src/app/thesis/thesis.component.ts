import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ThesisService } from '../shared/thesis.service';
import { Thesis } from '../shared/thesis.model';

declare var M: any;

@Component({
  selector: 'app-thesis',
  templateUrl: './thesis.component.html',
  styleUrls: ['./thesis.component.css'],
  providers: [ThesisService]
})
export class ThesisComponent implements OnInit {
  // Variable for Search Function
  searchText: any;

  constructor(public thesisService: ThesisService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshThesisList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.thesisService.selectedThesis = {
      _id: "",
      title: "",
      author: "",
      course: "",
      type: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id) {
        this.thesisService.putThesis(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshThesisList();
        M.toast({ html: 'Saved Successfully', classes: 'rounded' });
        });
    } else {
        this.thesisService.postThesis(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshThesisList();
        M.toast({ html: 'Saved Successfully', classes: 'rounded' });
        });
    } 
  }

  refreshThesisList() {
    this.thesisService.getThesisList().subscribe((res) => {
      this.thesisService.theses = res as Thesis[];
    });
  }

  onEdit(ths: Thesis) {
    this.thesisService.selectedThesis = ths;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record?')== true) {
      this.thesisService.deleteThesis(_id).subscribe((res) => {
        this.refreshThesisList();
        this.resetForm(form);
        M.toast({ html: 'Deleted Successfully', classes: 'rounded' });
      });
    }
  }
}
