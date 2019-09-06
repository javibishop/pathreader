import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CaminoHttpService {
  private url =  'http://localhost:3000/'+ 'camino';
  constructor(private HttpClient: HttpClient) 
  {
  }

  getAll() {
    return this.HttpClient.get<Camino[]>(this.url)
  }
  
  getById(id: string) : Observable<Camino> {
          //const url = this.url + '/' + id.toString();
          const url = `${this.url}/${id}`; /*interpolacion */
          return this.HttpClient.get<Camino>(url)
  }
  
  filterByNombreApellido(titulo: string) : Observable<Camino[]>{
      return this.HttpClient.get<Camino[]>(this.url)
      .pipe(
        map(Caminos => Caminos.filter(a =>a.titulo.toLowerCase().includes(titulo.toLowerCase())))
      )
  }
  
  update(Camino: Camino): Observable<void>{
      // var index = this.Caminos.findIndex(a => a.id === Camino.id);
      // this.Caminos[index] = Camino;
      const url = `${this.url}/${Camino._id}`; /*interpolacion */
      /* */
      return this.HttpClient.put<void>(url, Camino)
      .pipe(tap(() =>{return this.getAll()}));
      //tap sirve para ejecutar algo si interrumpir la llamada del observable.
  }

  insert(Camino: Camino): Observable<void>{
    // var index = this.Caminos.findIndex(a => a.id === Camino.id);
    // this.Caminos[index] = Camino;
    //const url = `${this.url}/${Camino.id}`; /*interpolacion */
    /* */
    return this.HttpClient.post<void>(this.url, Camino);
    }
}

export class Camino {
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

