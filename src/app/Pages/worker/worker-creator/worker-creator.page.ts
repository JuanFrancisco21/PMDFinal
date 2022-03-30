import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Work } from 'src/app/Model/work';
import { Worker } from 'src/app/Model/worker';
import { Workerwork } from 'src/app/Model/workerwork';
import { WorkerService } from 'src/app/Services/worker.service';

@Component({
  selector: 'app-worker-creator',
  templateUrl: './worker-creator.page.html',
  styleUrls: ['./worker-creator.page.scss'],
})
export class WorkerCreatorPage implements OnInit {
  public worker: Worker;
  public workerForm: FormGroup;

  public image: String;

  constructor(private modalController: ModalController, private workerService: WorkerService, private formBuilder: FormBuilder) {
    this.workerForm = this.formBuilder.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["", Validators.required],
      multipartFile: [null]
    });
  }

  ngOnInit() {
  }

  public async saveWorker() {
    this.worker = {
      name: this.workerForm.get("name").value,
      surname: this.workerForm.get("surname").value,
      email: this.workerForm.get("email").value,
      active: true,
      picture: "",
      chiefWorkList: Array<Work>(),
      workerWork: Array<Workerwork>()
    }

    var formData: any=new FormData();
    formData.append("worker", new Blob([JSON.stringify(this.worker)],{
      type:"application/json"
    }));
    formData.append("multipartFile", this.workerForm.get('multipartFile').value)

    // console.log(this.worker);
    await this.workerService.createWorker(formData).then(response =>{
      console.log(response);
    });
  }

  public async pickPhoto() {
    await Camera.getPhoto({
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl,
      quality: 100,
      allowEditing: false
    }).then((result) => {
      this.image = result.dataUrl;
      console.log(this.image);
    }, (error) => {
      alert(error);
    });
  }

  uploadFile(event) {
    this.workerForm.patchValue({
      multipartFile: (event.target as HTMLInputElement).files[0]
    });
    this.workerForm.get('multipartFile').updateValueAndValidity()
    //console.log(this.workerForm.get('multipartFile').value);
  }

  public async closeEditor() {
    this.modalController.dismiss();
  }

}
