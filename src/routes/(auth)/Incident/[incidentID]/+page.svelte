    <script lang='ts'>
    import { onDestroy, onMount } from 'svelte';
    import PocketBase from 'pocketbase';
    import type { IncidentsResponse } from '$lib/algemeen/pocketbase-types.js';
    import { env } from '$env/dynamic/public';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { notificatie } from '$lib/algemeen/Utils.js';



    // Functie om het accordeon-item te openen/sluiten
    /**
     * @param {string | number} index
     */
     // @ts-expect-error
    function toggleAccordion(index) {
     
    }

    let {data} = $props(); 

    let incident = $state(data.incident);
    // let inciBrigade = data.Brigade;
    // let inciUnits = data.Units;
    // let user = data.user;

// Notificatiestore voor het weergeven van meldingen
const IncidentenNotiStore = getToastStore();

    let pb: PocketBase;






  function getUnitsInfo(): string {
      // @ts-expect-error
      return incident.expand.Units.map((unit: any) => {
        const brigadeShortcode = unit.expand?.brigadeID?.shortcode || 'N/A';
        const unitName = unit.name || 'N/A';
        return `${brigadeShortcode}${unitName}`;
      }).join(', ');
 }

function notificeerVeranderingen(updatedIncident: IncidentsResponse){
       // Controleer op specifieke veranderingen en log deze naar de console
       if (incident.Priority !== updatedIncident.Priority) {
          notificatie(IncidentenNotiStore, `Prioriteit veranderd naar: ${updatedIncident.Priority}`,'variant-ghost-error',4);
          //console.log(`Priority gewijzigd van ${incident.Priority} naar ${updatedIncident.Priority}`);
        }
        if (incident.OGS !== updatedIncident.OGS) {
          notificatie(IncidentenNotiStore, `OGS status veranderd naar: ${updatedIncident? "OGS Toegestaan!":  "Ingetrokken!"}`,'variant-ghost-error',4);
         // console.log(`OGS gewijzigd van ${incident.OGS} naar ${updatedIncident.OGS}`);
        }
        if (incident.Melding !== updatedIncident.Melding) {
          notificatie(IncidentenNotiStore, `Melding veranderd naar: ${updatedIncident.Melding}`,'variant-ghost-error',4);
        //  console.log(`Melding gewijzigd van ${incident.Melding} naar ${updatedIncident.Melding}`);
        }
        if (incident.Location !== updatedIncident.Location) {
          notificatie(IncidentenNotiStore, `Locatie aangepast naar: ${updatedIncident.Location}`,'variant-ghost-error',4);
        //  console.log(`Locatie gewijzigd van ${incident.Location} naar ${updatedIncident.Location}`);
        }
        if (incident.Area !== updatedIncident.Area) {
          notificatie(IncidentenNotiStore, `Gebied aangepast naar: ${updatedIncident.Area}`,'variant-ghost-error',4);
         // console.log(`Gebied gewijzigd van ${incident.Area} naar ${updatedIncident.Area}`);
        }
        if (incident.Notepad !== updatedIncident.Notepad) {
          notificatie(IncidentenNotiStore, `Notities aangepast naar: ${updatedIncident.Notepad}`,'variant-ghost-error',4);
         // console.log(`Notitieblok gewijzigd van ${incident.Notepad} naar ${updatedIncident.Notepad}`);
        }
        if (JSON.stringify(incident.Units) !== JSON.stringify(updatedIncident.Units)) {
          notificatie(IncidentenNotiStore, `Betrokken eenheden veranderd!}`,'variant-ghost-error',4);
          //console.log(`Betrokken eenheden gewijzigd van ${JSON.stringify(incident.Units)} naar ${JSON.stringify(updatedIncident.Units)}`);
        }
}


 onMount(() => {
    // Initialiseer PocketBase met de publieke URL
    pb = new PocketBase(env.PUBLIC_PB_URL);
    pb.authStore?.loadFromCookie(document.cookie || '');

    // Abonneer op veranderingen in de 'Incidents' collectie
    pb.collection('Incidents').subscribe<IncidentsResponse>(incident?.id, async function (e) {
      console.log("Incident veranderd, nieuwe gegevens:");
      
      // Haal de nieuwe gegevens van het incident op, inclusief expand
      const updatedIncident = await pb.collection('Incidents').getOne<IncidentsResponse>(e.record.id, { expand: "Units.brigadeID,Brigade" });

      notificeerVeranderingen(updatedIncident);

      // Werk het incident bij naar de nieuwste waarden
      incident = updatedIncident;
    });
  });

  
 

  </script>

  

<div class="incident-pagina">

    <!-- Linker gedeelte: Incidentinformatie -->
    <div class="incident-info">
      <h2>Incident Informatie</h2>
      <div class="incident-details">
        <p><strong>Melding:</strong> {incident.Melding}</p>
        <p><strong>Incident Type:</strong> {incident.IncidentType}</p>
        <p><strong>Gebied:</strong> {incident.Area}</p>
        <p><strong>Locatie:</strong> {incident.Location}</p>
        <p><strong>Prioriteit:</strong> Prio {incident.Priority}</p>
        <p><strong>OGS:</strong> {incident.OGS? "OGS Afgegeven!" : "Nee"}</p>
        <p><strong>Betrokken Eenheden:</strong> {getUnitsInfo()}</p>
        <p><strong>Aantal Slachtoffers:</strong> {incident.VictimCount}</p>

        <div class="incident-notitieblok">
          <h2><strong>Notitieblok:</strong></h2>
          <div>{incident.Notepad? incident.Notepad:"Geen extra informatie"}</div>
        </div>
      </div>
  
      <!-- <div class="incident-chat-log">
        <h3>Chat & Logboek</h3>
        Chat en logboek UI toevoegen 
        <div class="chat-log-container">
          <textarea placeholder="Typ een bericht..."></textarea>
        </div>
      </div> -->
    </div>

  
    <!-- Rechter gedeelte: Slachtoffer accordeon -->
    <div class="victim-accordion">
      <h2>Slachtoffers</h2>

     {#each Array(incident.VictimCount) as _, i}
     <div class="accordion-item">
      <button class="accordion-header" >Slachtoffer {i+1}</button>
      <div class="accordion-content">
        <p>Details van Slachtoffer {i+1}</p>
      </div>
    </div>
      
     {/each}
      Voeg meer slachtoffers toe indien nodig 
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