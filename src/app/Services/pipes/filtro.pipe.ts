import { Pipe, PipeTransform } from '@angular/core';
import { Work } from 'src/app/Model/work';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(obras: Work[], texto: string):Work[] {
    if (texto.length==0) { return obras}
    return obras.filter(obra=>{
      return obra.name.toLocaleLowerCase().includes(texto.toLowerCase()) || obra.description.toLowerCase().includes(texto.toLowerCase());
    })
  }

}
