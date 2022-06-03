import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Work } from 'src/app/Model/work';
import { DailylogService } from 'src/app/Services/dailylog.service';
import { ExcelService } from 'src/app/Services/excel.service';

@Component({
  selector: 'app-work-excel-export',
  templateUrl: './work-excel-export.component.html',
  styleUrls: ['./work-excel-export.component.scss'],
})
export class WorkExcelExportComponent implements OnInit {
  @Input() work: Work;
  dateTime: String = new Date().toISOString();

  constructor(private modalController: ModalController, private dailyLogService: DailylogService, private excelService: ExcelService) { }

  ngOnInit() { }

  private async loadLogs(): Promise<any> {
    const logs: any[] = [];
    await this.dailyLogService.getLogsByWork(this.work.id).then(res => {
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
    await this.dailyLogService.getLogsByMonthWork(year, month, this.work.id).then(res => {
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
      this.excelService.exportAsExcelFile(logs, this.work.name + '.xlsx');
    }).catch(err => {
      console.log(err);
    });
  }

  public exportExcel() {
    this.loadLogs().then(logs => {
      console.log(logs);
      this.excelService.exportAsExcelFile(logs, this.work.name + '.xlsx');
    }).catch(err => {
      console.log(err);
    });
  }

  public async closeEditor() {
    this.modalController.dismiss();
  }

}
