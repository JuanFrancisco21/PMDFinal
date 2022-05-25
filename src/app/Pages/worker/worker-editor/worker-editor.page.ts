import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Worker } from 'src/app/Model/worker';
import { DailylogService } from 'src/app/Services/dailylog.service';
import { ExcelService } from 'src/app/Services/excel.service';

@Component({
  selector: 'app-worker-editor',
  templateUrl: './worker-editor.page.html',
  styleUrls: ['./worker-editor.page.scss'],
})
export class WorkerEditorPage implements OnInit {
  @Input() worker: Worker;
  private logs: any[] = [];

  constructor(private modalController: ModalController, private dailyLogService: DailylogService, private excelService: ExcelService) { }

  ngOnInit() {
    this.loadLogs();
  }

  private async loadLogs() {
    await this.dailyLogService.getLogsByWorker(this.worker.id).then(res => {
      res.forEach(element => {
        this.logs.push({
          'Nombre y apellidos': element.workerWork.worker.name + ' ' + element.workerWork.worker.surname,
          'Obra': element.workerWork.work.name,
          'Fecha': element.date,
          'Horas': element.hours + ' horas',
        });
      });
      console.log(this.logs);
    });
  }

  exportExcel() {
    this.excelService.exportAsExcelFile(this.logs, this.worker.name + ' ' + this.worker.surname + '.xlsx');
  }

  public async closeEditor() {
    this.modalController.dismiss();
  }

}
