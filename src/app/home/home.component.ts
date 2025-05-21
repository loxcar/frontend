import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../dto/Prodotto';
import { prodottoServizi } from '../servizi/prodottoServizi';
import { CarrelloItem, CarrelloService } from '../servizi/carrello.service';

@Component({
  selector: 'app-la-tana-del-nerd',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class LaTanaDelNerdComponent implements OnInit{
  prodotti: Prodotto[] = [];
  searchText: string = '';

  constructor(
    private prodottoServizi: prodottoServizi,
    private carrelloService: CarrelloService
  ) { }

   ngOnInit(): void {
    this.caricaProdotti();
  }

  caricaProdotti(): void {
    this.prodottoServizi.getProdotti().subscribe(
      (data: Prodotto[]) => {
        this.prodotti = data;
      },
      error => {
        console.error('Errore nel caricamento dei prodotti:', error);
      }
    );
  }

  get prodottiFiltrati(): Prodotto[] {
    if (!this.searchText) {
      return this.prodotti;
    }
    return this.prodotti.filter(prodotto =>
      prodotto.nome.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

aggiungiAlCarrello(prodotto: Prodotto): void {
    console.log('Prodotto da aggiungere al carrello:', prodotto);
    this.carrelloService.aggiungiAlCarrello(prodotto);
    alert(`${prodotto.nome} aggiunto al carrello!`);
 }

get carrello(): CarrelloItem[] {
    return this.carrelloService.getCarrello();
  }

rimuoviDalCarrello(prodotto: Prodotto) {
  this.carrelloService.rimuoviDalCarrello(prodotto);
  alert(`${prodotto.nome} rimosso dal carrello!`);
}

incrementaQuantita(prodotto: Prodotto) {
  this.carrelloService.incrementaQuantita(prodotto);
}

decrementaQuantita(prodotto: Prodotto) {
  this.carrelloService.decrementaQuantita(prodotto);
}

get totaleCarrello(): number {
  return this.carrelloService.calcolaTotale();
}

}


