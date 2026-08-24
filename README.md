# Weather App (React)

Applicazione web sviluppata in React (Vite) per la consultazione di dati meteorologici attuali, previsioni e dati storici. Il sistema consuma la REST API pubblica e no-auth di [Open-Meteo](https://open-meteo.com/).

Questo progetto è il porting React della versione originale in Vanilla JavaScript.

### Architettura e Struttura Directory

Il progetto adotta la struttura del template React (Vite) aziendale, con componenti funzionali e hook.

```text
├── app/                     # Sorgenti dell'applicazione React
│   ├── components/          # UI Components riutilizzabili (card, tabelle, modali, suggestions)
│   ├── hooks/                # Hook custom (autocomplete città, modale meteo)
│   ├── pages/                # Componenti pagina (una per rotta)
│   ├── services/             # Data access layer (wrapper Fetch API, persistenza localStorage)
│   ├── App.css                # Foglio di stile globale
│   ├── App.jsx                 # Componente radice con le rotte
│   └── main.jsx                 # Entry point React
├── index.html               # Entry point Vite
├── package.json
├── vite.config.js
├── .gitignore
├── LICENSE
└── README.md
```

### Funzionalità Core

* **Geocoding e Forecasting (`app/pages/Search.jsx`, `app/services/api.js`):** Ricerca asincrona di località e parsing del payload JSON per mostrare metriche correnti e previsioni a 7 giorni.
* **Historical Data Recovery (`app/pages/Archive.jsx`):** Estrazione di dati meteorologici passati tramite query parametrizzate su range di date (Start Date / End Date).
* **Client-Side Persistence (`app/services/storage.js`):** Utilizzo delle Web Storage API (`localStorage`) per mantenere persistente lo stato della cronologia di ricerca e dei preferiti dell'utente tra diverse sessioni.
* **Dynamic UI (`app/components/WeatherCard.jsx`, `app/components/DailyForecast.jsx`):** Rendering dei dati meteo, mappatura degli status code meteo in emoji e descrizioni testuali.

### Setup ed Esecuzione

Requisiti minimi: Node.js, Git.

```bash
npm install
npm run dev
```

A quel punto il server di sviluppo sarà raggiungibile all'indirizzo indicato nel terminale (tipicamente `http://localhost:5173`). L'entry point di navigazione è la Home (`/`).

<video controls src="./assets/01_Sito.mp4" title="Title"></video>

# Esercizi da Svolgere

Gli esercizi totali sono suddivisi in 3 macro-aree di intervento, ognuna con un peso specifico in termini di punteggio finale.
I primi due avranno anche dei commenti `TODO` all'interno del codice per guidarvi nei punti esatti in cui intervenire.
Il terzo esercizio richiede invece un'attività di debugging logico, per cui dovrete esplorare autonomamente i file per trovare e risolvere il problema.

### 1. INTEGRAZIONI DATI (60p)

**Obiettivo:** Ripristinare il sistema di autocompletamento per la ricerca delle città. Attualmente, digitando un testo negli input di ricerca, l'applicazione non effettua chiamate di rete e non fornisce suggerimenti.

**Task richiesti:**

1. **Data Fetching in [app/services/api.js](app/services/api.js)**\
   Completa la logica della funzione `getCoordinatesByCity` in modo che effettui la chiamata corretta all'API di Open-Meteo per la ricerca geocoding, gestendo eventuali errori e ritornando i risultati attesi. Segui i TODO nel file per i dettagli tecnici.

2. **Data Binding & UI Rendering in [app/components/CitySuggestions.jsx](app/components/CitySuggestions.jsx)**\
   Completa il componente `SuggestionItems` in modo che i dati recuperati dall'API vengano trasformati in una lista di elementi `<div>` da mostrare nel menu a tendina dei suggerimenti, assicurandoti di agganciare i dati necessari per il corretto funzionamento del click (`onSelect`). Segui i TODO nel file.

### 2. CORREZIONE LAYOUT (30p)

**Obiettivo:** Ripristinare la visualizzazione di alcune sezioni del sito che presentano anomalie strutturali ed estetiche.

**Task richiesti:**

1. **Struttura a Griglia in [app/pages/Home.jsx](app/pages/Home.jsx)**\
   Nella pagina principale (Home), la sezione "Come funziona" mostra le card informative impilate verticalmente in modo errato. Individua la classe CSS corretta (già esistente in `App.css`) e applicala al tag `<div>` contrassegnato dal `TODO` per ripristinare il layout a griglia.

2. **Layout Disallineato in [app/App.css](app/App.css)**\
   Nella pagina di Ricerca, il blocco contenente l'icona gigante del meteo e la temperatura odierna (`.weather-current`) è formattato in modo errato (gli elementi vanno a capo). Modifica la regola CSS per fare in modo che gli elementi si affianchino sulla stessa riga e siano centrati verticalmente.

3. **Design del Componente in [app/App.css](app/App.css)**\
   Il pulsante di salvataggio rapido (quello con la spunta/cuore in alto a destra nella card meteo) ha perso la sua formattazione originaria. Cerca il selettore `.btn-favorite-inline` e ricreane lo stile seguendo le indicazioni specifiche scritte nel `TODO` al suo interno.

### 3. DEBUGGING LOGICO (10p)

**Obiettivo:** Individuare e risolvere un'anomalia nel flusso esecutivo della user interface.

**Problema riscontrato:**\
Nelle sezioni "Cronologia" e "Preferiti" è presente un pulsante per eliminare globalmente tutti i record salvati. Tuttavia, se viene cliccato, la cancellazione avviene in modo contro-intuitivo: i dati vengono eliminati *solo* se l'utente clicca su "Annulla" nel popup di conferma del browser, mentre vengono conservati se si clicca "Ok".

**Task richiesti:**
1. Esamina il codice in [app/components/RecordsTable.jsx](app/components/RecordsTable.jsx), comprendi da dove viene generato il popup di conferma e quale logica viene eseguita in base alla scelta dell'utente.
2. Correggi il bug in modo che i dati vengano eliminati in modo sicuro e coerente con la scelta effettuata.
