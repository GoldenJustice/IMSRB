  
  <script>
// @ts-nocheck

    // Functie om het accordeon-item te openen/sluiten
    /**
     * @param {string | number} index
     */
    function toggleAccordion(index) {
      const content = document.querySelectorAll('.accordion-content')[index];
      if (content.classList.contains('open')) {
        content.classList.remove('open');
      } else {
        content.classList.add('open');
      }
    }
  </script>

<div class="incident-pagina">
    <!-- Linker gedeelte: Incidentinformatie -->
    <div class="incident-info">
      <h2>Incident Informatie</h2>
      <div class="incident-details">
        <p><strong>Incident Type:</strong> EHBO / Vermissing / Overig</p>
        <p><strong>Locatie:</strong> Adres of coördinaten</p>
        <p><strong>Gebied:</strong> Gebiedsbeschrijving</p>
        <p><strong>Prioriteit:</strong> Laag / Middel / Hoog</p>
        <p><strong>OGS:</strong> Ja</p>
        <p><strong>Status:</strong> Actief / Afgerond</p>
        <p><strong>Betrokken Eenheden:</strong> Lijst van UnitID's (in JSON)</p>
        <p><strong>Aantal Slachtoffers:</strong> 1</p>
        <div class="incident-notitieblok">
          <h3>Notitieblok</h3>
          <textarea placeholder="Voeg hier notities toe..."></textarea>
        </div>
      </div>
  
      <div class="incident-chat-log">
        <h3>Chat & Logboek</h3>
        <!-- Chat en logboek UI toevoegen -->
        <div class="chat-log-container">
          <textarea placeholder="Typ een bericht..."></textarea>
        </div>
      </div>
    </div>
  
    <!-- Rechter gedeelte: Slachtoffer accordeon -->
    <div class="victim-accordion">
      <h2>Slachtoffers</h2>
      <div class="accordion-item">
        <button class="accordion-header" onclick='{toggleAccordion(0)}'>Slachtoffer 1</button>
        <div class="accordion-content">
          <p>Details van Slachtoffer 1</p>
        </div>
      </div>
      <div class="accordion-item">
        <button class="accordion-header" onclick="{toggleAccordion(1)}">Slachtoffer 2</button>
        <div class="accordion-content">
          <p>Details van Slachtoffer 2</p>
        </div>
      </div>
      <!-- Voeg meer slachtoffers toe indien nodig -->
    </div>
  </div>
  
  <style>
    .incident-pagina {
      display: flex;
      height: 100vh;
      gap: 20px;
      padding: 20px;
      box-sizing: border-box;
     
      width: 100vw;
    }
  
    /* Incidentinformatie aan de linkerkant */
    .incident-info {
      flex: 1; /* Zorgt ervoor dat dit gedeelte evenveel ruimte gebruikt als de rechterkolom */
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
    }
  
    .incident-details p {
      margin: 10px 0;
    }
  
    .incident-notitieblok textarea {
      width: 100%;
      height: 100px;
      border-radius: 8px;
      padding: 10px;
      box-sizing: border-box;
    }
  
    .incident-chat-log {
      margin-top: 20px;
    }
  
    .chat-log-container textarea {
      width: 100%;
      height: 80px;
      border-radius: 8px;
      padding: 10px;
      box-sizing: border-box;
    }
  
    /* Slachtoffer accordeon aan de rechterkant */
    .victim-accordion {
      flex: 1; /* Zorgt ervoor dat dit gedeelte evenveel ruimte gebruikt als de linkerkolom */
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
    }
  
    .accordion-item {
      margin-bottom: 10px;
    }
  
    .accordion-header {
      width: 100%;
      background-color: #ffd700;
      border: none;
      padding: 10px;
      font-weight: bold;
      cursor: pointer;
      text-align: left;
      outline: none;
      border-radius: 8px;
      transition: background-color 0.2s ease;
    }
  
    .accordion-header:hover {
      background-color: #ffb700;
    }
  
    .accordion-content {
      padding: 10px;
      background-color: #f0f0f0;
      border-radius: 8px;
      display: none; /* Begin verstopt */
    }
  
    .accordion-content.open {
      display: block; /* Toon de inhoud wanneer geopend */
    }
  </style>