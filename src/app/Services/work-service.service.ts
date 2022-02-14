import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Work } from '../Model/work';

@Injectable({
  providedIn: 'root'
})
export class WorkServiceService {
  
  public API = 'http://localhost:8080/';
  public OBRA_API = this.API + 'work';
  public endpoint=environment.endpoint+environment.apiWork;


  constructor(public http: HttpClient) {}

 
  /**
   * Metodo que nos devuelve todas las obras almacenadas en la Base de Datos
   * @returns lista de todas las obras.
   */
   public async getAllObras(): Promise<Work[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.endpoint,this.header).toPromise();
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  private get header():any{
    return{
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json'
    }
  }

}
