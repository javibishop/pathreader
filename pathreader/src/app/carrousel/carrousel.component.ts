import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaminoHttpService, Camino } from '../services/camino.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  caminos : Camino[];
  constructor(private caminoHttpService: CaminoHttpService, private router: Router) { }

  ngOnInit() {
    this.caminoHttpService.getAll().subscribe(c => this.caminos = c);
  }

  verRecorrido(camino: Camino){
    this.router.navigate(['recorrido', camino._id]);
  }
}
