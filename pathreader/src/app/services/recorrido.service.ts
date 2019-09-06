import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RecorridoHttpService {
  private url =  'http://localhost:3000/'+ 'recorrido';
  constructor(private HttpClient: HttpClient) 
  {
  }

  getAll() {
    return this.HttpClient.get<Recorrido[]>(this.url)
  }
  
  getById(id: string) : Observable<Recorrido> {
          //const url = this.url + '/' + id.toString();
          const url = `${this.url}/${id}`; /*interpolacion */
          return this.HttpClient.get<Recorrido>(url)
  }
  
  getByCamino(caminoId: string) : Observable<Recorrido[]> {
    //const url = this.url + '/' + id.toString();
    const url = `${this.url}/porcamino/${caminoId}`; /*interpolacion */
    return this.HttpClient.get<Recorrido[]>(url)
}

  filterByNombreApellido(titulo: string) : Observable<Recorrido[]>{
      return this.HttpClient.get<Recorrido[]>(this.url)
      .pipe(
        map(Recorridos => Recorridos.filter(a =>a.titulo.toLowerCase().includes(titulo.toLowerCase())))
      )
  }
  
  update(Recorrido: Recorrido): Observable<void>{
      // var index = this.Recorridos.findIndex(a => a.id === Recorrido.id);
      // this.Recorridos[index] = Recorrido;
      const url = `${this.url}/${Recorrido._id}`; /*interpolacion */
      /* */
      return this.HttpClient.put<void>(url, Recorrido)
      .pipe(tap(() =>{return this.getAll()}));
      //tap sirve para ejecutar algo si interrumpir la llamada del observable.
  }

  insert(Recorrido: Recorrido): Observable<void>{
    // var index = this.Recorridos.findIndex(a => a.id === Recorrido.id);
    // this.Recorridos[index] = Recorrido;
    //const url = `${this.url}/${Recorrido.id}`; /*interpolacion */
    /* */
    return this.HttpClient.post<void>(this.url, Recorrido);
    }
}

export class Recorrido {
    constructor(
        public _id: string,
        public fecha: Date,
        public titulo: string,
        public contenido: string,
        public estado: boolean,
        public orden: number,
        public pathImagen :string
    ){}
}

