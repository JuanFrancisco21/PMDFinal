import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Dailylog } from '../Model/dailylog';

@Injectable({
  providedIn: 'root'
})
export class DailylogService {

  public ENDPOINT = environment.endpoint + environment.apiDailylog;

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
   * Método que devuelve una lista de dailylogs de un trabajador
   * @param workerId La id del trabajador
   * @returns Una lista de dailylogs
   */
  public async getLogsByWorker(workerId: Number): Promise<Dailylog[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.ENDPOINT + "/worker/" + workerId).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Método que devuelve una lista de dailylogs de un trabajo
   * @param workId id del trabajador
   * @returns Una lista de dailylogs
   */
  public async getLogsByWork(workId: Number): Promise<Dailylog[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.ENDPOINT + "/work/" + workId).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Método que devuelve una lista de dailylogs de un periodo de tiempo
   * @param month es el mes del periodo de tiempo
   * @param year es el año del periodo de tiempo
   * @returns Una lista de dailylogs
   */
  public async getLogsByMonth(month: Number, year: Number): Promise<Dailylog[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.ENDPOINT + "/month/" + year + '/' + month).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Método que devuelve una lista de dailylogs de un trabajador en un periodo de tiempo
   * @param month es el mes del periodo de tiempo
   * @param year es el año del periodo de tiempo
   * @param workerId es la id del trabajador
   * @returns Una lista de dailylogs
   */
  public async getLogsByMonthUser(month: Number, year: Number, workerId: Number): Promise<Dailylog[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.ENDPOINT + "/worker/" + workerId + "/month/" + year + '/' + month).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Método que devuelve una lista de dailylogs de un trabajo en un periodo de tiempo
   * @param month es el mes del periodo de tiempo
   * @param year es el año del periodo de tiempo
   * @param workId es la id del trabajo
   * @returns Una lista de dailylogs
   */
  public async getLogsByMonthWork(month: Number, year: Number, workId: Number): Promise<Dailylog[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.ENDPOINT + "/work/" + workId + "/month/" + year + '/' + month).toPromise();
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

}
