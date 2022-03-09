import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Work } from '../Model/work';
import { Worker } from '../Model/worker';
import { Workerwork } from '../Model/workerwork';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  public ENDPOINT = environment.endpoint + environment.apiWorker;

  constructor(public http: HttpClient) { }

  /**
   * Function which gathers all worker from the database
   * @returns all workers stored in the database
   */
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

  /**
   * Function which finds a worker in the database based on their id
   * @param workerId the id we will use to search the database
   * @returns the worker with the matching id
   */
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

  /**
   * Function which finds a worker in the database based on their name
   * @param workerName the name we will use to search the database
   * @returns the woker with the matching name
   */
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
  /**
     * Function which finds a worker in the database based on their email
     * @param workerEmail the email we will use to search the database
     * @returns the woker with the matching email
     */
  public async getWorkerByEmail(workerEmail: String): Promise<Worker> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.ENDPOINT + environment.apiEmail + workerEmail, this.header).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Function which gathers all workers who's active is the desginated value
   * @param active the boolean which contains the value we will search for
   * @returns the workers with the matching value
   */
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

  /**
   * Function which instantiates a worker into the database
   * @param worker the worker to be instantiated
   * @returns the instantiated worker
   */
  public async createWorker(formData: any): Promise<Worker[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: Worker[] = await this.http.post(this.ENDPOINT + "foto", formData).toPromise() as Worker[];
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
  * Método que crea Worker en la BD
  * @param Worker 
  * @returns el ticket creado
  */
  public createTicket(formData: any): Promise<Worker[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let Worker: Worker[] = await this.http.post(this.ENDPOINT, formData,).toPromise() as Worker[];
        resolve(Worker);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Function which updates a worker in the database
   * @param worker the worker to be instantiated
   * @returns the updated worker
   */
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

  /**
   * Function which deletes a worker from the database
   * @param workerId the id of the worker to be purged from the database
   * @returns the deleted worker
   */
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

  /**
   * Function which instantiates a worker into the database
   * @param worker the worker to be instantiated
   * @returns the instantiated worker
   */
   public async addWorkertoWork(worker: Worker, work: Work): Promise<Workerwork> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.post(this.ENDPOINT + 'add/' + worker.id + '/' + work.id, this.header).toPromise();
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
