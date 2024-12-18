    <script lang='ts'>
    import { onDestroy, onMount } from 'svelte';
    import PocketBase from 'pocketbase';
    import type { IncidentsResponse, IncidentsStatusOptions } from '$lib/algemeen/pocketbase-types.js';
    import { env } from '$env/dynamic/public';
    import { getModalStore, getToastStore, ListBox, ListBoxItem, SlideToggle, type ModalSettings } from '@skeletonlabs/skeleton';
    import { notificatie } from '$lib/algemeen/Utils.js';
    import { goto } from '$app/navigation';




    let {data} = $props(); 

    let incident = $state(data.incident);
  
    let inciBrigade = $state(data.Brigade);
    let brigadeGebieden = $state(JSON.parse(inciBrigade.Areas))

    const modalStore = getModalStore();

    // let inciUnits = data.Units;
    // let user = data.user;

// Notificatiestore voor het weergeven van meldingen
const IncidentenNotiStore = getToastStore();

    let pb: PocketBase;




  function getUnitsInfo(): string {

    if (incident.expand && incident.expand.Units) {
      return incident.expand.Units.map((unit: any) => {
        const brigadeShortcode = unit.expand?.brigadeID?.shortcode || 'N/A';
        const unitName = unit.name || 'N/A';
        return `${brigadeShortcode}${unitName}`;
      }).join(', ');
    }
    return 'Geen Units beschikbaar';
    
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
      // console.log("Incident veranderd, nieuwe gegevens:");
      
      // Haal de nieuwe gegevens van het incident op, inclusief expand
      const updatedIncident = await pb.collection('Incidents').getOne<IncidentsResponse>(e.record.id, { expand: "Units.brigadeID,Brigade" });

      notificeerVeranderingen(updatedIncident);

      // Werk het incident bij naar de nieuwste waarden
      incident = updatedIncident;
    });
  });

  let isEditing = $state(false);

// Functie om bewerkingsstatus te wisselen
    async function toggleEditMode() {
    isEditing = !isEditing;
    if (!isEditing) {
        // Hier kun je code toevoegen om de wijzigingen op te slaan, bijvoorbeeld een API-aanroep
        // console.log(`Incident update: ${incident.IncidentType}`);
        pb = new PocketBase(env.PUBLIC_PB_URL);
        pb.authStore?.loadFromCookie(document.cookie || '');

        try{
        const record = await pb.collection('Incidents').update(incident.id, incident);
        } catch (error){
            console.log("Update failed")
        }
        

    }
}
 
const modalAfsluitenbevestiging: ModalSettings = {
    type: 'confirm',
    title: 'Incident Afsluiten',
    body: 'Weet je zeker dat je dit incident wilt afsluiten?',
    response: (r: boolean) => {
      if (r) {
        incident.Status = "Afgerond" as IncidentsStatusOptions; 
        toggleEditMode();
        goto('/');
    }
}
}

  </script>

  

<div class="incident-pagina">

    <!-- Linker gedeelte: Incidentinformatie -->
    <div class="incident-info">
      <div class="incident-titel-container">
        <div class="title">{incident.Melding}</div>
         {#if !isEditing}
        <button type="button" class="btn-icon variant-filled-warning" aria-label="Bewerk incident" onclick={toggleEditMode}>
         
           <img src="/bewerkicoon.svg" alt="Bewerk icoon">  
        </button>
        {:else}
        <button type="button" class="btn-icon variant-filled-success" aria-label="Incident Opslaan" onclick={toggleEditMode}>
         
          <img src="/saveicoon.svg" alt="Opslaan icoon">  
       </button>
        {/if}
      </div>
      
      <!-- Zorg ervoor dat je de font-awesome CSS link opneemt om het icoon te laten werken -->
      <div class="incident-details">
        <p><strong>Incident Type:</strong>
          {#if isEditing}
          <select bind:value={incident.IncidentType} class="select">
            <option value="EHBO">EHBO</option>
            <option value="Vermissing">Vermissing</option>
            <option value="Overig">Overig</option>
          </select>
          {:else}
          {incident.IncidentType}
          {/if} </p>

        <p><strong>Gebied:</strong> 
          {#if isEditing}
          <select bind:value={incident.Area} class="select">
          {#each brigadeGebieden as gebied}
          <option value={gebied}>{gebied}</option>
            
          {/each}
          </select>
            {:else}
             {incident.Area}
          {/if}
         
        
        </p>
        <p><strong>Locatie:</strong> 
          {#if isEditing}
            <input class="input" bind:value={incident.Location} type="text" placeholder={incident.Location} />
            {:else}
            {incident.Location}
          {/if}
          
        
        </p>
        <p><strong>Prioriteit:</strong> 
          {#if isEditing}

          <select bind:value={incident.Priority} class="select">
            <option value="1">P1</option>
            <option value="2">P2</option>
            <option value="3">P3</option>
            <option value="4">P4</option>
            <option value="5">P5</option>
          </select>

            {:else}
            Prio {incident.Priority}
          {/if}
          </p>
        <p><strong>OGS:</strong> 
          {#if isEditing}

          <SlideToggle bind:checked={incident.OGS} name="slider" active="variant-filled-error" size="sm"/>

          {:else}
            {incident.OGS? "OGS Afgegeven!" : "Nee"}
          {/if}
          </p>
        <p><strong>Betrokken Eenheden:</strong> {getUnitsInfo()}</p>
        <p><strong>Aantal Slachtoffers:</strong> {incident.VictimCount}</p>

        <div class="incident-notitieblok">
          <h2><strong>Notitieblok:</strong></h2>
          <div>
          {#if isEditing}
          <textarea bind:value={incident.Notepad} class="textarea" rows="4" placeholder={incident.Notepad}></textarea>
          {:else}
          {incident.Notepad? incident.Notepad:"Geen extra informatie"}
          {/if}
          </div>
        </div>
        {#if isEditing}
        <div class="">
          <div>
            
            <button type="button" onclick={()=>{modalStore.trigger(modalAfsluitenbevestiging)}} class="btn variant-filled-error">Incident Afronden</button>
          </div> 
                  
        </div>
     {/if}  
      </div>

  
      <!-- <div class="incident-chat-log">
        <h3>Chat & Logboek</h3>
        Chat en logboek UI toevoegen 
        <div class="chat-log-container">
          <textarea placeholder="Typ een bericht..."></textarea>
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
  
    .incident-titel-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
  }
  .title {
    font-size: 1.2rem;
    font-weight: bold;
  }

    .incident-details p {
      margin: 10px 0;
    }
  
    /* .incident-notitieblok textarea {
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
    } */
  
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
  
    /* .accordion-content.open {
      display: block; /* Toon de inhoud wanneer geopend 
    } */
  </style>