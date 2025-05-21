import { Injectable } from '@angular/core';
import { Prodotto } from '../dto/Prodotto';
import { ParseFlags } from '@angular/compiler';

export interface CarrelloItem {
  prodotto: Prodotto;
  quantita: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
  private _carrello: CarrelloItem[] = [];

  constructor() {
    // Recupera il carrello dal localStorage al caricamento del servizio
    const savedCarrello = localStorage.getItem('carrello');
    if (savedCarrello) {
      try {
        this._carrello = JSON.parse(savedCarrello);
      } catch (e) {
        console.error('Errore nel parsing del carrello salvato:', e);
        this._carrello = [];
      }
    }
  }

  // Salva il carrello nel localStorage
  private salvaCarrello(): void {
    localStorage.setItem('carrello', JSON.stringify(this._carrello));
  }

  // Ottieni tutti gli elementi nel carrello
  getCarrello(): CarrelloItem[] {
    return this._carrello;
  }

  aggiungiAlCarrello(prodotto: Prodotto): void {
  // Crea una copia profonda del prodotto per evitare problemi di riferimento
  const prodottoCopy = JSON.parse(JSON.stringify(prodotto));

  console.log('Aggiungendo prodotto con codice:', prodottoCopy.codice);
  console.log('Stato attuale del carrello:', this._carrello);

  // Cerca il prodotto nel carrello utilizzando il codice
  const prodottoId = Number(prodottoCopy.codice);
  const index = this._carrello.findIndex(item => Number(item.prodotto.codice) === prodottoId);
  console.log('Indice trovato:', index);

  if (index !== -1) {
    // Se il prodotto esiste già, incrementa la quantità usando il metodo esistente
    console.log('Prodotto già presente, incremento quantità');
    this.incrementaQuantita(prodotto);
  } else {
    // Altrimenti, aggiungi un nuovo elemento al carrello
    console.log('Prodotto nuovo, aggiungo al carrello');
    this._carrello.push({ prodotto: prodottoCopy, quantita: 1 });
  }

  console.log('Nuovo stato del carrello:', this._carrello);
  this.salvaCarrello();
}

  // Incrementa la quantità di un prodotto
  incrementaQuantita(prodotto: Prodotto): void {
  const prodottoId = Number(prodotto.codice);
  const index = this._carrello.findIndex(i => i.prodotto && i.prodotto.codice === prodottoId);
  if (index !== -1) {
    this._carrello[index].quantita++;
    this.salvaCarrello();
  }
}

  // Decrementa la quantità di un prodotto
  decrementaQuantita(prodotto: Prodotto): void {
  console.log('Service decrementaQuantita chiamato:', prodotto);

  // Gestione speciale per ID null - usiamo il nome del prodotto come fallback
  const prodottoId = prodotto.codice ? Number(prodotto.codice) : null;
  console.log('ID prodotto da decrementare:', prodottoId);

  let index = -1;

  if (prodottoId !== null) {
    // Cerca per ID se disponibile
    index = this._carrello.findIndex(i => {
      const currentId = Number(i.prodotto.codice);
      console.log('Confronto ID:', currentId, 'con', prodottoId);
      return i.prodotto && currentId === prodottoId;
    });
  } else {
    // Se ID è null, cerca per nome del prodotto
    console.log('ID è null, cerco per nome:', prodotto.nome);
    index = this._carrello.findIndex(i => {
      console.log('Confronto nome:', i.prodotto.nome, 'con', prodotto.nome);
      return i.prodotto && i.prodotto.nome === prodotto.nome;
    });
  }

  console.log('Indice trovato per decremento:', index);

  if (index !== -1) {
    console.log('Quantità attuale:', this._carrello[index].quantita);

    if (this._carrello[index].quantita > 1) {
      this._carrello[index].quantita--;
      console.log('Quantità decrementata a:', this._carrello[index].quantita);
    } else {
      console.log('Rimuovo prodotto dal carrello');
      this._carrello.splice(index, 1);
    }

    console.log('Stato carrello dopo decremento:', this._carrello);
    this.salvaCarrello();
  } else {
    console.log('Prodotto non trovato nel carrello');
  }
}

  // Rimuovi un prodotto dal carrello
  rimuoviDalCarrello(prodotto: Prodotto): void {
  console.log('Service rimuoviDalCarrello chiamato:', prodotto);

  let index = -1;

  if (prodotto.codice !== null && prodotto.codice !== undefined) {
    // Cerca per ID se disponibile
    const prodottoId = Number(prodotto.codice);
    console.log('Cerco per ID:', prodottoId);
    index = this._carrello.findIndex(item => Number(item.prodotto.codice) === prodottoId);
  } else {
    // Se ID è null, cerca per nome del prodotto
    console.log('ID è null, cerco per nome:', prodotto.nome);
    index = this._carrello.findIndex(item => {
      console.log('Confronto nome:', item.prodotto.nome, 'con', prodotto.nome);
      return item.prodotto.nome === prodotto.nome;
    });
  }

  console.log('Indice trovato per rimozione:', index);

  if (index !== -1) {
    console.log('Prodotto rimosso:', this._carrello[index]);
    this._carrello.splice(index, 1);
    this.salvaCarrello();
    console.log('Carrello dopo rimozione:', this._carrello);
  } else {
    console.log('Prodotto non trovato per la rimozione');
  }
}

  // Svuota il carrello
  svuotaCarrello(): void {
    this._carrello = [];
    this.salvaCarrello();
  }

  // Calcola il totale del carrello
  calcolaTotale(): number {
    return this._carrello.reduce((totale, item) =>
      totale + (item.prodotto.prezzo * item.quantita), 0);
  }

  // Numero di prodotti nel carrello
  getNumeroArticoli(): number {
    return this._carrello.reduce((total, item) => total + item.quantita, 0);
  }
}
