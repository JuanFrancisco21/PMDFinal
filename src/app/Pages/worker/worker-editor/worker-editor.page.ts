import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Worker } from 'src/app/Model/worker';

@Component({
  selector: 'app-worker-editor',
  templateUrl: './worker-editor.page.html',
  styleUrls: ['./worker-editor.page.scss'],
})
export class WorkerEditorPage implements OnInit {
  @Input() worker: Worker;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  public async closeEditor() {
    this.modalController.dismiss();
  }

}
