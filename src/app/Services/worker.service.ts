import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Worker } from '../Model/worker';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  public ENDPOINT = environment.endpoint + environment.apiWorker;

  constructor(public http: HttpClient) { }

  public async getAllWorkers(): Promise<Worker[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.ENDPOINT, this.header).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async getWorkerById(workerId: Number): Promise<Worker> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.ENDPOINT + workerId, this.header).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async getWorkerByName(workerName: String): Promise<Worker> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.ENDPOINT + environment.apiName + workerName, this.header).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async getWorkerByActive(active: Boolean): Promise<Worker[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.ENDPOINT + environment.apiActive + active, this.header).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async createWorker(worker: Worker): Promise<Worker> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.post(this.ENDPOINT, worker).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async updateWorker(worker: Worker): Promise<Worker> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.put(this.ENDPOINT, worker).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async deleteWorkerById(workerId: Number): Promise<Worker> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.delete(this.ENDPOINT + workerId, this.header).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  private get header(): any {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  }
}
