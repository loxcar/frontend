import { Component, OnInit } from '@angular/core';
import { CarrelloService, CarrelloItem } from '../servizi/carrello.service'; // Assicurati che il percorso sia corretto
import { Router } from '@angular/router';
import { Prodotto } from '../dto/Prodotto';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {
  carrello: CarrelloItem[] = [];
  totaleCarrello: number = 0; // Dichiarazione della proprietà

 constructor(
    private carrelloService: CarrelloService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.aggiornaCarrello();
  }

  aggiornaCarrello(): void {
    this.carrello = this.carrelloService.getCarrello();
    this.totaleCarrello = this.carrello.reduce(
      (tot, item) => tot + item.prodotto.prezzo * item.quantita,
      0
    );
  }

  // I metodi accettano un CarrelloItem invece di Prodotto
  incrementaQuantita(item: any):void {
    this.carrelloService.incrementaQuantita(item.prodotto);
    this.aggiornaCarrello();
  }

  decrementaQuantita(item: any): void {
  this.carrelloService.decrementaQuantita(item.prodotto);
  // Non modificare direttamente item.quantita qui - lascia che il servizio gestisca tutto
  this.aggiornaCarrello(); // Ricarica i dati dal servizio
}

  rimuoviDalCarrello(item: any): void {
    // Se è un CarrelloItem, estrai il prodotto
    this.carrelloService.rimuoviDalCarrello(item.prodotto);
    this.aggiornaCarrello();
  }

  svuotaCarrello(): void {
    this.carrelloService.svuotaCarrello();
    this.aggiornaCarrello();
  }

  procediAllOrdine(): void {
    console.log('Procedi all\'ordine');
    alert('Funzionalità di checkout non ancora implementata');
  }
}
