<script lang="ts">
    import { env } from '$env/dynamic/public';
    import type { IncidentsResponse } from '$lib/algemeen/pocketbase-types.js';
    import { notificatie } from '$lib/algemeen/Utils';
import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
import PocketBase from 'pocketbase';

  let {data, children} = $props();

  let pb: PocketBase;
  pb = new PocketBase(env.PUBLIC_PB_URL);

  const IncidentenNotiStore = getToastStore();


  const modalStore = getModalStore();
  

  const IncidentenAdd: ModalSettings = {
        type: 'component',
        component: 'ModalIncidentAdd',
        response: (r: IncidentsResponse) => {
            console.log('reactie')
            if (pb) {
               createIncident(r);
            } else {
            notificatie(IncidentenNotiStore, "Kon incident niet aanmaken! Foutcode:#1F3045", "variant-ghost-error", 4);
}
            
        },
        meta: {
            userdata: {
                aangeslotenBrigades: data.brigades ?? [],
                Units: data.units ?? []
            }
        }
    }
  
  
    async function createIncident(newIncident: IncidentsResponse) {
        try {
            const createdIncident = await pb.collection('Incidents').create(newIncident);
            
        } catch (error) {
          notificatie(IncidentenNotiStore, "Kon incident niet aanmaken! Waarschijnlijk kloppen sommige velden niet. code:#1F3049", "variant-ghost-error", 4);

        }
    }
    function openNieuwIncidentModal() {
        modalStore.trigger(IncidentenAdd);
       
    }



  
  </script>
  
  <div class="app-container">
    <!-- Linker navigatiebalk -->
    <div class="sidebar">
      <!-- Logo bovenaan -->
      <div class="logo">
        <img src="/logo.svg" alt="Logo" />
      </div>
  
      <!-- Navigatiebollen gecentreerd in het midden -->
      <div class="nav-bollen">
        
        <a href="/" class="nav-bol-link"><div class="nav-bol">Incidenten</div></a>
  
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div class="nav-bol" role="button" tabindex="0" onclick={openNieuwIncidentModal}>Incident<br>Starten</div>
        
      </div>
  
      <!-- Gebruikersbol onderaan -->
      <div class="gebruiker">
        <div class="gebruiker-bol">{data.user?.username || "User"}</div> <!-- Voorbeeld initialen -->
      </div>
    </div>
  
      <!-- Hoofdinhoud -->
      <main class="main-content">
          
          {@render children()}
  
      </main>
    </div>
    
    <style>
      /* Container voor de hele applicatie */
      .app-container {
        display: flex;
        height: 100vh; /* Volledige hoogte van het scherm */
      }
    
     /* Linker navigatiebalk */
    .sidebar {
      width: 10%;
      background-color: #121c22; /* Donkere achtergrondkleur voor de navigatiebalk  2d2d2d */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between; /* Verdeel ruimte tussen boven, midden en onderkant */
      padding: 20px 0;
      box-sizing: border-box;
    }
  
    .logo {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .logo img {
      max-width: 40%; /* Vergroot het logo voor betere zichtbaarheid */
      height: auto;
    }
  
    .nav-bollen {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
      flex-grow: 1;
      justify-content: center;
      width: 100%; /* Maak de bollen zo breed mogelijk */
    }
  
    .nav-bol-link {
      width: 100%; /* Zorg ervoor dat de link de volledige breedte heeft */
      text-decoration: none; /* Verwijder onderlijning van de link */
      display: flex;
      justify-content: center;
    }
  
    .nav-bol {
      width: 80%; /* Zorg ervoor dat de bol zo breed mogelijk is binnen de sidebar */
      aspect-ratio: 1; /* Houd de bol vierkant */
      border: 3px solid #FF4500; /* Oranje kleur voor de outline */
      border-radius: 50%;
      cursor: pointer;
      transition: transform 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FF4500; /* Zelfde kleur als de outline */
      font-weight: bold;
      font-size: 1rem;
      background-color: transparent; /* Geen opvulling, alleen de outline zichtbaar */
      align-content: center;
    }
  
    .nav-bol:hover {
      transform: scale(1.1); /* Zoom-in effect bij hover */
    }
  
    .gebruiker {
      margin-bottom: 20px; /* Ruimte onderaan voor de gebruiker */
    }
  
    .gebruiker-bol {
      width: auto;
      height: auto;
      min-width: 50px; /* Minimale breedte voor de bol */
      min-height: 50px; /* Minimale hoogte voor de bol */
      padding: 10px; /* Padding om tekst niet tegen de rand te laten komen */
      background-color: #3f51b5; /* Blauwe kleur voor de gebruikersbol */
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-weight: bold;
      font-size: 1rem;
      text-align: center;
      overflow: hidden;
      aspect-ratio: 1 / 1; /* Zorgt ervoor dat de bol altijd rond blijft */
      box-sizing: border-box; /* Houd padding en border in de grootte */
    }
    
      /* Hoofdinhoud */
      .main-content {
        width: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
        overflow-y: hidden; /* Scrollen als de inhoud te groot is */
        background-color: #f0f0f0; /* Lichtgrijze achtergrondkleur */
      }
    
    </style>
  