import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [InputTextModule,ButtonModule],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.scss'
})
export class PredictionComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
  ){

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const encoded = params['data'];
      console.log('encoded',encoded);

      const values = JSON.parse(decodeURI(encoded))
      console.log('values',values)
    });
}


}
