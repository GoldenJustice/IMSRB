<script lang="ts">
  import { env } from '$env/dynamic/public';
  import type { IncidentsResponse, RittenstaatResponse } from '$lib/algemeen/pocketbase-types.js';
  import { notificatie } from '$lib/algemeen/Utils';
  import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
  import PocketBase from 'pocketbase';

  let {data, children} = $props();

  let pb: PocketBase;
  pb = new PocketBase(env.PUBLIC_PB_URL);

  let version = $state(env.PUBLIC_VERSION);

  const IncidentenNotiStore = getToastStore();


  const modalStore = getModalStore();
  

  const IncidentenAdd: ModalSettings = {
        type: 'component',
        component: 'ModalIncidentAdd',
        response: (r) => {
            if (r === undefined || r === false) {
              
              return;
            }

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
    const RittenstaatAdd: ModalSettings = {
        type: 'component',
        component: 'ModalRittenStaatAdd',
        response: (r) => {
            

            if (r === undefined || r === false) {
              return;
            }

            if (pb) {
              
               createRittenStaat(r);
            } else {
           console.log('Foutcode:#1F3046');
}
            
        },
        meta: {
            userdata: {
                User: data.user ?? [],
                aangeslotenBrigades: data.brigades ?? [],
                Units: data.units ?? [],
                ritten: data.ritten ?? []
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

    async function createRittenStaat(newRittenStaat: RittenstaatResponse) {
        try {
            const createdRittenStaat = await pb.collection('RittenStaat').create(newRittenStaat);
            notificatie(IncidentenNotiStore, "Ritten staat aangemaakt!", "variant-ghost-success", 4);
        } catch (error) {
          notificatie(IncidentenNotiStore, "Kon incident niet aanmaken! Waarschijnlijk kloppen sommige velden niet. code:#1F3049", "variant-ghost-error", 4);
        }
      }

    function openNieuwIncidentModal() {
        modalStore.trigger(IncidentenAdd);
       
    }

    function openRittenstaatAddModal() {
        modalStore.trigger(RittenstaatAdd);
       
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
      <a href="/" class="nav-bol-link">
        <div class="nav-bol">Incidenten</div>
      </a>

      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div class="nav-bol" role="button" tabindex="0" onclick={openNieuwIncidentModal}>
        Incident<br />Starten
      </div>
    </div>

    <!-- Gebruikersbol onderaan -->

      <!-- Gebruikersbol -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div
        class=" gebruiker gebruiker-bol"
        role="button"
        tabindex="0"
        onclick={openRittenstaatAddModal}
      >
        {`${data.user?.username}` || "User"}
      </div>


    <!-- Tekst onderaan -->
    <div class="footer-text">
      DonkerSolutions - V{version}
    </div>
  </div>

  <!-- Hoofdinhoud -->
  <main class="main-content">
    {@render children()}
  </main>
</div>

<style>
/* Algemene stijlen */
.app-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 10%;
  max-width: 20%;
  background-color: #121c22;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* Zorgt ervoor dat items netjes verdeeld worden */
  padding: 1rem 0;
  box-sizing: border-box;
  position: relative; /* Voor positionering van de footer-text */
}

.logo {
  max-width: 40%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}

.nav-bollen {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  width: 100%;
}

.nav-bol-link {
  width: 100%;
  text-decoration: none;
  display: flex;
  justify-content: center;
}

.nav-bol {
  width: 70%;
  aspect-ratio: 1;
  border: 2px solid #ff4500;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease, border-width 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff4500;
  font-weight: bold;
  font-size: clamp(0.9rem, 1.2vw, 1.2rem);
  background-color: transparent;
  text-align: center;
  padding: 0.5rem;
  box-sizing: border-box;
}

.nav-bol:hover {
  transform: scale(1.1);
  border-width: 3px;
}

.gebruiker {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem; /* Zorgt voor voldoende ruimte boven de footer */
}

.gebruiker-bol {
  width: 40%;
  aspect-ratio: 1;
  background-color: rgba(var(--color-surface-500) / 1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: clamp(0.9rem, 1.2vw, 1.2rem);
  text-align: center;
  box-sizing: border-box;
}

/* Tekst onderaan */
.footer-text {
  position: absolute; /* Plaats de tekst altijd onderaan */
  bottom: 1rem; /* Houd een kleine afstand van de onderkant */
  width: 100%; /* Zorg ervoor dat de tekst gecentreerd is */
  text-align: center;
  font-size: clamp(0.7rem, 1vw, 0.8rem); /* Klein maar leesbaar */
  color: #6a6a6a99; /* Subtiel wit met transparantie */
}

/* Hoofdinhoud */
.main-content {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #f0f0f0;
}
@media (max-width: 1350px) {
  .sidebar {
    width: 15%;
  }
  
  .main-content{width: 85%;}

}


@media (max-width: 768px) {
  .sidebar {
    width: 20%;
  }



  .nav-bol {
    width: 70%;
    font-size: clamp(0.7rem, 1vw, 0.9rem);
  }
  .gebruiker-bol {
    width: 50%;
    font-size: clamp(0.7rem, 1vw, 0.9rem);
  }
  .footer-text {
    font-size: clamp(0.6rem, 0.8vw, 0.7rem); /* Kleinere tekst op kleinere schermen */
  }
}
</style>
