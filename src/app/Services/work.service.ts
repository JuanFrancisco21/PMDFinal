import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Work } from '../Model/work';
import { AuthService } from './auth.service';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  public endpoint = environment.endpoint + environment.apiWork;

  constructor(public http: HttpClient,
    public notification: NotificationsService) { }

  /**
  * Metodo que nos devuelve todas las obras almacenadas en la Base de Datos
  * @returns lista de todas las obras.
  */
  public async getAllWorks(): Promise<Work[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.endpoint).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
  * Metodo que usaremos para guardar la obra en la base de datos
  * @param id de la obra
  * @returns la obra con el id dado
  */
  public async getWorkById(id): Promise<Work> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.endpoint + "/" + id).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
  * Método que nos devuelve una obra por un nombre dado
  * @param nombre 
  * @returns obra
  */
  public getWorkByName(nombre?: String): Promise<Work> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.endpoint + "/name/" + nombre).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
  * Método que usaremos para crear una obra
  * @param work que queremos guardar
  * @returns es void porque no devuelve nada
  */
  public async createWork(work: Work): Promise<Work[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.post(this.endpoint, work).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
  * Método que usaremos para actualizar una obra
  * @param work que queremos actualizar
  * @returns
  */
  public async updateWork(work: Work) {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.put(this.endpoint, work).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }


  /**
  * Metodo que devuelve las obras de un usuario
  * @param id del trabajador para buscar
  * @returns Obras de un trabajador
  */
  public getWorkByUser(id?: Number): Promise<Work[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.endpoint + "idworker/" + id).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
  * Metodo que devuelve las obras de un usuario
  * @param id del trabajador para buscar
  * @returns Obras de un trabajador
  */
  public getActiveWorkByUser(id?: Number, active?:boolean): Promise<Work[]> {
    if (id!=null && active!=null) {
      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.get(this.endpoint + "activeidworker/" + id + "/" + active).toPromise();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }else{
      this.notification.presentToast("Id o estado a buscar vacio", "Datos vacios en la busqueda");
    }
    
  }

  /**
  * Metodo que usaremos para borrar una obra por su id
  * @param id de la obra
  * @returns es void porque no devuelve nada
  */
  public async deleteWork(id: Number) {
    return new Promise(async (resolve, reject) => {
      try {
        const result: any = this.http.delete(this.endpoint + id).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

}
