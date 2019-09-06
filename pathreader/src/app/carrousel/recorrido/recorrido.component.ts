import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecorridoHttpService, Recorrido } from '../../services/recorrido.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './recorrido.component.html',
  styleUrls: ['./recorrido.component.scss']
})
export class RecorridoComponent implements OnInit {
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  recorridos : Recorrido[];
  constructor(private recorridoHttpService: RecorridoHttpService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    /*cuando me llega la data la asigno al especialidad */
    if(id !== '')
      this.recorridoHttpService.getByCamino(id).subscribe(recs => this.recorridos = recs); 
  }

  volver(){
    this.router.navigate(['caminos']);
  }
}
