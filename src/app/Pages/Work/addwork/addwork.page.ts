import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Work } from 'src/app/Model/work';
import { Worker } from 'src/app/Model/worker';
import { WorkService } from 'src/app/Services/work.service';
import { WorkerService } from 'src/app/Services/worker.service';

@Component({
  selector: 'app-addwork',
  templateUrl: './addwork.page.html',
  styleUrls: ['./addwork.page.scss'],
})
export class AddworkPage implements OnInit {
  workForm: FormGroup | any;
  Work: Work|any;
  worker: any[] = [];

  constructor(private fb: FormBuilder, 
    private WorkerS: WorkerService, 
    private WorkS: WorkService) {

  }

  ngOnInit(): void {
    this.workForm = this.fb.group({
      id: ['-1', this.workForm.required],
      name: ['', this.workForm.required],
      description: ['', this.workForm.required],
      location: ['', this.workForm.required],
      chief: ['', this.workForm.required],
      workers: [ '', this.workForm.required]
    });
  }

  onSubmit() {
    this.Work = this.saveWork();
    this.WorkS.createObra(this.Work);
    this.workForm.reset();
  }

  saveWork() {
    const saveWork = {
      name: this.workForm.get('name').value,
      description: this.workForm.get('description').value,
      location: [this.workForm.get('x').value,
                this.workForm.get('y').value],
      chief: this.workForm.get('chief').value,
      workers: this.workForm.get('workers').value,
    };
    return saveWork;
  }
}
