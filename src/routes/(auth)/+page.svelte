<script lang="ts">
    import IncidentenKaart from "$lib/componenten/IncidentenKaart.svelte";
    import type { IncidentsResponse } from "$lib/algemeen/pocketbase-types.js";
    import { onMount } from "svelte";
    import PocketBase from 'pocketbase'
    import { env } from "$env/dynamic/public";
    import { getToastStore} from "@skeletonlabs/skeleton";
    import { getTime, notificatie } from "$lib/algemeen/Utils.js";





// Haal de benodigde data uit de component properties
let { data } = $props();
let pb: PocketBase;

// Definieer de lijst van actieve incidenten en de eenheden van de gebruiker
let actieveIncidenten = $state(data.incidenten);
let gebruikerEenheden = $state(data.user?.unit_id || "");

// Notificatiestore voor het weergeven van meldingen
const IncidentenNotiStore = getToastStore();

/**
 * Voeg een incident toe aan de lijst van actieve incidenten.
 * @param incident Het incident dat moet worden toegevoegd.
 */
function incidentToevoegen(incident: IncidentsResponse) {
  // Voeg het incident toe aan de actieve incidenten
  actieveIncidenten.push(incident);

  // Toon een notificatie dat er een nieuw incident is
  notificatie(IncidentenNotiStore, `Nieuw incident: ${incident.Melding}`);

  return 'Incident toegevoegd!';
}

/**
 * Verwijder een incident uit de lijst van actieve incidenten.
 * @param incident Het incident dat moet worden verwijderd.
 */
function incidentVerwijderen(incident: IncidentsResponse) {
  // Zoek het index van het incident in de actieve incidenten
  const incidentIndex = actieveIncidenten.findIndex((item) => item.id === incident.id);

  // Controleer of het incident gevonden is
  if (incidentIndex === -1) {
    return 'Incident is niet bekend';
  }

  // Verwijder het incident uit de actieve incidenten
  actieveIncidenten.splice(incidentIndex, 1);

  // Toon een notificatie dat het incident is afgesloten
  notificatie(IncidentenNotiStore, `Incident: ${incident.Melding} is nu afgesloten!`);

  return 'Incident verwijderd';
}

/**
 * Update een bestaand incident in de lijst van actieve incidenten.
 * @param nieuweIncident De bijgewerkte gegevens van het incident.
 */
function incidentBijwerken(nieuweIncident: IncidentsResponse) {
  // Zoek het index van het incident in de actieve incidenten
  const incidentIndex = actieveIncidenten.findIndex((item) => item.id === nieuweIncident.id);

  // Controleer of het incident aanwezig is
  if (incidentIndex !== -1) {
    let huidigIncident = actieveIncidenten[incidentIndex];

    //console.log('Incident wordt bijgewerkt in de database.');

    // Controleer en update de prioriteit indien gewijzigd
    if (huidigIncident.Priority !== nieuweIncident.Priority) {
      huidigIncident.Priority = nieuweIncident.Priority;
      //console.log(`Prioriteit van incident met ID ${huidigIncident.id} is gewijzigd naar: ${nieuweIncident.Priority}`);
      notificatie(
        IncidentenNotiStore,
        `Prioriteit van incident: ${nieuweIncident.Melding}, veranderd naar: ${nieuweIncident.Priority}`,
        'variant-ghost-error'
      );

      
    }

    // Controleer en update OGS indien gewijzigd
    if (huidigIncident.OGS !== nieuweIncident.OGS) {
      huidigIncident.OGS = nieuweIncident.OGS;
      //console.log(`OGS van incident met ID ${huidigIncident.id} is gewijzigd naar: ${nieuweIncident.OGS}`);
      if (nieuweIncident.OGS) {
        notificatie(
          IncidentenNotiStore,
          `OGS Afgegeven voor incident: ${nieuweIncident.Melding}`,
          'variant-filled-error',
          8
        );
      }
    }

    // Controleer en update de melding indien gewijzigd
    if (huidigIncident.Melding !== nieuweIncident.Melding) {
      huidigIncident.Melding = nieuweIncident.Melding;
      notificatie(
        IncidentenNotiStore,
        `Melding aangepast voor incident: ${nieuweIncident.Melding}!`,
        'variant-ringed-tertiary'
      );
      //console.log(`Melding van incident met ID ${huidigIncident.id} is gewijzigd naar: ${nieuweIncident.Melding}`);
    }

    // Controleer en update de locatie indien gewijzigd
    if (huidigIncident.Location !== nieuweIncident.Location) {
      huidigIncident.Location = nieuweIncident.Location;
      notificatie(
        IncidentenNotiStore,
        `Locatie aangepast voor incident: ${nieuweIncident.Melding}!`,
        'variant-ringed-tertiary'
      );
      //console.log(`Locatie van incident met ID ${huidigIncident.id} is gewijzigd naar: ${nieuweIncident.Location}`);
    }

    // Controleer en update het gebied indien gewijzigd
    if (huidigIncident.Area !== nieuweIncident.Area) {
      huidigIncident.Area = nieuweIncident.Area;
      //console.log(`Gebied van incident met ID ${huidigIncident.id} is gewijzigd naar: ${nieuweIncident.Area}`);
      notificatie(
        IncidentenNotiStore,
        `Gebied aangepast voor incident: ${nieuweIncident.Melding}!`,
        'variant-ringed-tertiary'
      );
    }

    // Controleer en update de eenheden indien gewijzigd
    if (JSON.stringify(huidigIncident.Units) !== JSON.stringify(nieuweIncident.Units)) {
      huidigIncident.Units = nieuweIncident.Units;
      notificatie(
        IncidentenNotiStore,
        `Opgeschaald voor incident: ${nieuweIncident.Melding}!`,
        'variant-ringed-tertiary'
      );
      // console.log(
      //   `Eenheden van incident met ID ${huidigIncident.id} zijn gewijzigd naar: ${JSON.stringify(nieuweIncident.Units)}`
      // );
    }
  }
}

/**
 * Controleer of een incident aanwezig is in de lijst van actieve incidenten.
 * @param incident Het incident dat moet worden gecontroleerd.
 * @returns True als het incident aanwezig is, anders false.
 */
function isIncidentAanwezig(incident: IncidentsResponse): boolean {
  return actieveIncidenten.some((item) => item.id === incident.id);
}

/**
 * Bepaal of een incident in de lijst van actieve incidenten moet worden opgenomen.
 * @param incident Het incident dat moet worden geëvalueerd.
 * @returns True als het incident in de lijst moet staan, anders false.
 */
function moetIncidentInLijst(incident: IncidentsResponse): boolean {
  // Controleer of er overlap is tussen de eenheden van de gebruiker en die van het incident
  const heeftOverlap = gebruikerEenheden.some((eenheid: string) => incident.Units.includes(eenheid));

  // Controleer of het incident de status 'Actief' heeft
  const isActief = incident.Status === 'Actief';

  return heeftOverlap && isActief;
}

/**
 * Werk de lijst van actieve incidenten bij op basis van het opgegeven incident.
 * @param incident Het incident dat moet worden verwerkt.
 */
function werkIncidentLijstBij(incident: IncidentsResponse): void {
  const incidentAanwezig = isIncidentAanwezig(incident);
  const moetInLijst = moetIncidentInLijst(incident);

  if (incidentAanwezig && !moetInLijst) {
    // Incident staat in de lijst maar hoeft er niet meer in te staan
   // console.log('Incident wordt verwijderd uit de lijst');
    incidentVerwijderen(incident);
  } else if (!incidentAanwezig && moetInLijst) {
    // Incident staat niet in de lijst maar moet er wel in staan
    //console.log('Incident wordt toegevoegd aan de lijst');
    incidentToevoegen(incident);
  } else if (incidentAanwezig && moetInLijst) {
    // Incident staat in de lijst en moet worden bijgewerkt
    incidentBijwerken(incident);
  }
}

// Wanneer de component wordt geladen
onMount(() => {
  // Initialiseer PocketBase met de publieke URL
  pb = new PocketBase(env.PUBLIC_PB_URL);
  pb.authStore?.loadFromCookie(document.cookie || '');

  // Abonneer op veranderingen in de 'Incidents' collectie
  pb.collection('Incidents').subscribe<IncidentsResponse>('*', async function (e) {
    if (e.action === 'update' || e.action === 'create') {
      // Werk de incidentenlijst bij bij een update of creatie
      werkIncidentLijstBij(e.record);
    }

    if (e.action === 'delete') {
      //console.log('Verwijderactie ontvangen');
      // Verwijder het incident als het aanwezig is in de lijst
      if (isIncidentAanwezig(e.record)) {
        incidentVerwijderen(e.record);
        
      }
    }
  });
});




</script>
<section class="incidenten-overzicht">

       


{#each actieveIncidenten ?? [] as Inci}
<IncidentenKaart prio={Inci.Priority} OGS={Inci.OGS} Melding={Inci.Melding} 
Locatie={Inci.Location} Gebied={Inci.Area} eenheden={Inci.Units.toString()} Starttijd={getTime(Inci.created)}></IncidentenKaart>
{/each}

</section> 


<style>
        /* Incidenten overzicht */
        .incidenten-overzicht {
      display: flex;
      flex-wrap: wrap;
      gap: 20px; /* Spatie tussen kaarten */
      justify-content: center; /* Kaarten worden horizontaal gecentreerd */
    }
</style>