import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Dailylog } from '../Model/dailylog';
import { Workerwork } from '../Model/workerwork';

@Injectable({
  providedIn: 'root'
})
export class DailylogService {

  public ENDPOINT = environment.endpoint + environment.apiDailylog;
  public ENDPOINTWW = environment.endpoint + environment.apiWorkerWork;

  constructor(public http: HttpClient) { }

  /**
  * Metodo que nos devuelve todas los logs diarios almacenados en la Base de Datos
  * @returns lista de todas los dailylogs.
  */
   public async getAllLogs(): Promise<Dailylog[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.ENDPOINT).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
  * Metodo que usaremos para guardar el dailylog en la base de datos
  * @param id del dailylog
  * @returns dailylog con el id dado
  */
   public async getLog(id): Promise<Dailylog> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.ENDPOINT + "/" + id).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
  * Método que nos devuelve un dailylog por una fecha dada
  * @param date fecha de los dailylogs que queremos obtener
  * @returns una lista de los dailylogs que tengan esa fecha
  */
   public getLogbyDate(date?: String): Promise<Dailylog[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.ENDPOINT + "/date/" + date).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

 /**
  * Método que usaremos para crear un dailylog
  * @param log dailylog que queremos guardar
  * @returns
  */
  public async createLog(log: Dailylog, workerWorkid:Number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.post(this.ENDPOINT + 'add/' + workerWorkid, log).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
  * Método que usaremos para actualizar un dailylog
  * @param log dailylog que queremos actualizar
  * @returns
  */
   public async updateLog(log: Dailylog): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.put(this.ENDPOINT, log).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
  * Método que usaremos para eliminar un dailylog
  * @param id del dailylog que queremos eliminar
  * @returns
  */
   public async deleteLog(id: Number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.delete(this.ENDPOINT + id).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async getLogsByWorker(idWorker: Number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.ENDPOINT + 'worker/' + idWorker).toPromise();
        resolve(result);
      } catch(error) {
        reject(error);
      }
    })
  }

}
