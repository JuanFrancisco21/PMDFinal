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
  dateTime: String = new Date().toISOString();;

  constructor(private modalController: ModalController, private dailyLogService: DailylogService, private excelService: ExcelService) { }

  ngOnInit() { }

  private async loadLogs(): Promise<any> {
    const logs: any[] = [];
    await this.dailyLogService.getLogsByWorker(this.worker.id).then(res => {
      res.forEach(element => {
        logs.push({
          'Nombre y apellidos': element.workerWork.worker.name + ' ' + element.workerWork.worker.surname,
          'Obra': element.workerWork.work.name,
          'Fecha': element.date,
          'Horas': element.hours + ' horas',
        });
      });
    });
    return logs;
  }

  private async loadDateLogs(year: Number, month: Number): Promise<any> {
    const logs: any[] = [];
    await this.dailyLogService.getLogsByMonthUser(year, month, this.worker.id).then(res => {
      res.forEach(element => {
        logs.push({
          'Nombre y apellidos': element.workerWork.worker.name + ' ' + element.workerWork.worker.surname,
          'Obra': element.workerWork.work.name,
          'Fecha': element.date,
          'Horas': element.hours + ' horas',
        });
      });
    });
    return logs;
  }

  exportExcelDate() {
    this.loadDateLogs(Number(this.dateTime.split('-')[0]), Number(this.dateTime.split('-')[1])).then(logs => {
      console.log(logs);
      this.excelService.exportAsExcelFile(logs, this.worker.name + ' ' + this.worker.surname + '.xlsx');
    }).catch(err => {
      console.log(err);
    });
  }

  public exportExcel() {
    this.loadLogs().then(logs => {
      console.log(logs);
      this.excelService.exportAsExcelFile(logs, this.worker.name + ' ' + this.worker.surname + '.xlsx');
    }).catch(err => {
      console.log(err);
    });
  }

  public async closeEditor() {
    this.modalController.dismiss();
  }

}
