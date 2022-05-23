import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Work } from 'src/app/Model/work';
import { Worker } from 'src/app/Model/worker';
import { WorkService } from 'src/app/Services/work.service';
import { WorkerService } from 'src/app/Services/worker.service';
import { Tab1PageModule } from '../../tab1/tab1.module';
import { Tab1Page } from '../../tab1/tab1.page';

@Component({
  selector: 'app-addwork',
  templateUrl: './addwork.page.html',
  styleUrls: ['./addwork.page.scss'],
})
export class AddworkPage implements OnInit {
  workForm: FormGroup | any;
  Work: Work | any;
  workers: any[] = [];

  constructor(private modalController: ModalController,private fb: FormBuilder,
    private WorkerS: WorkerService,
    private WorkS: WorkService,
    private router: Router) {

  }

  /**
   * Consulta de todos los trabajadores.
   */
  async ionViewDidEnter() {
    this.workers = await this.WorkerS.getAllWorkers();
  }

  /**
   * Creación del validador del fomulario a rellenar.
   */
  ngOnInit(){
    this.workForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      chief: ['', Validators.required]
    });
  }

  /**
   * Método de creación de obra en la BBDD
   */
  onSubmit() {
    this.Work = this.saveWork();
    delete this.Work.chief.workerWork;
    this.WorkS.createWork(this.Work);
    this.workForm.reset();
    this.modalController.dismiss();
  }

  /**
   * Método que devuelve work con los datos introducidos.
   * @returns obra con nombre, descripcion y encargado(Worker).
   */
  saveWork() {
    const saveWork = {
      name: this.workForm.get('name').value,
      description: this.workForm.get('description').value,
      chief: this.workForm.get('chief').value,
    };
    return saveWork;
  }

}
