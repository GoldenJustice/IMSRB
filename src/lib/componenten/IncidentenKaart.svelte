<script lang='ts'>
    import type { Snippet } from "svelte";

    interface IncidentenData {
        prio: number;
        OGS: Boolean;
        Melding: String;
        Locatie: String;
        Gebied: String;
        eenheden:  String;
        Starttijd: String;
        children?: Snippet;
    }


    let {prio, OGS, Melding, Locatie, Gebied, eenheden, Starttijd, children}:IncidentenData = $props();
    // Definieer kleuren op basis van prioriteit
    let prioriteitsKleur = $state('');
    if (prio === 1) {
      prioriteitsKleur = '#ff0000'; // Rood voor hoge prioriteit
    } else if (prio === 2) {
      prioriteitsKleur = '#ff8000'; // Oranje voor medium-hoge prioriteit
    } else if (prio === 3) {
      prioriteitsKleur = '#008000'; // Geel voor medium prioriteit
    } else if (prio === 4) {
      prioriteitsKleur = '#008000'; // Groen voor lage prioriteit
    }
  
    // Titeltekst opbouwen
    let titel = $state(`Prio ${prio}`);
    if (OGS) {
      titel += ' - OGS';
    }
  </script>
  
  <div class="incident-kaart">
    <div class="incident-header" 
    class:incident-kaart-gestreept={prio==5}
        style="background-color: {prioriteitsKleur}">
      <h2>{titel}</h2>
    </div>
    <div class="incident-body">
      <p><strong>Melding:</strong> {Melding}</p>
      <p><strong>Locatie:</strong> {Locatie}</p>
      <p><strong>Gebied:</strong> {Gebied}</p>
      <p><strong>Eenheden:</strong> {eenheden}</p>
    </div>
    <div class="incident-footer">
      <p><strong>Start tijd:</strong> {Starttijd}</p>
    </div>
  </div>
  
  <style>
    .incident-kaart {
      width: 250px;
      border-radius: 8px;
      margin: 10px;
      overflow: hidden;
      background-color: #1c1c1e;
      color: #ffffff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      
    }

    .incident-kaart-gestreept {
    background: repeating-linear-gradient(
      45deg,
      #000000, /* Zwart */
      #000000 10px,
      #FF4500 10px, /* Geel */
      #FF4500 20px
    );
    border-radius: 8px; /* Optioneel: maakt de hoeken afgerond */
    padding: 20px; /* Optioneel: zorgt voor ruimte binnen de kaart */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* Optioneel: voegt schaduw toe */
  }

    .incident-header {
      padding: 10px;
      text-align: center;
    }
  
    .incident-header h2 {
      margin: 0;
      font-size: 1.2rem;
      color: #ffffff;
      font-weight: 700;
     
    }
  
    .incident-body {
      padding: 10px;
      font-size: 0.95rem;
    }
  
    .incident-body p {
      margin: 5px 0;
    }
  
    .incident-footer {
      padding: 10px;
      font-size: 0.9rem;
      border-top: 1px solid #333;
    }
  </style>