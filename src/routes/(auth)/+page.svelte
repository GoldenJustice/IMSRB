<script lang="ts">
    import IncidentenKaart from "$lib/componenten/IncidentenKaart.svelte";
    import type { IncidentsResponse } from "$lib/pocketbase-types.js";
    import { onMount } from "svelte";
    import PocketBase from 'pocketbase'
    import { env } from "$env/dynamic/public";
    import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
    import { getTime, notificatie } from "$lib/utils";


    let {data} = $props();
    let pb: PocketBase;

    let actieveIncidenten = $state(data.incidenten);
    let userUnit = $state(data.user?.unit_id);
    const IncidentenNotiStore = getToastStore();



//          toastStore.trigger(test);



  function IncidentToevoegen(melding: IncidentsResponse){
    actieveIncidenten.push(melding);
    notificatie(IncidentenNotiStore, `Nieuw incident: ${melding.Melding}`);
    return 'Incident toegevoegd!';
  }


  function IncidentVerwijderen(melding: IncidentsResponse){
    const incidentIndex = actieveIncidenten.findIndex((incident) => incident.id === melding.id);

    if(incidentIndex === -1){return 'Incident is niet bekend'}
    actieveIncidenten.splice(incidentIndex, 1);

    notificatie(IncidentenNotiStore, `Incident: ${melding.Melding} is nu afgesloten!`);
    return 'Incident verwijderd';
  }

  function IncidentUpdate(nieuweMelding: IncidentsResponse) {
    const incidentIndex = actieveIncidenten.findIndex((incident) => incident.id === nieuweMelding.id);

    if (incidentIndex !== -1) {
        let currentIncident = actieveIncidenten[incidentIndex];
        let updatedIncident = nieuweMelding;
        console.log('Update database van een var die wel in de lijst staat.')
        // Check and update properties if they have changed
        if (currentIncident.Priority !== updatedIncident.Priority) {
          currentIncident.Priority = updatedIncident.Priority;
          console.log(`Prioriteit van incident met ID ${currentIncident.id} is gewijzigd naar: ${updatedIncident.Priority}`);
          notificatie(IncidentenNotiStore, `Prioriteit van incident: ${updatedIncident.Melding}, veranderd naar: ${updatedIncident.Priority}`,'variant-ghost-error')

        }
        if (currentIncident.OGS !== updatedIncident.OGS) {
          currentIncident.OGS = updatedIncident.OGS;
          console.log(`OGS van incident met ID ${currentIncident.id} is gewijzigd naar: ${updatedIncident.OGS}`);
          if (updatedIncident.OGS){notificatie(IncidentenNotiStore, `OGS Afgegeven voor incident: ${updatedIncident.Melding}`,'variant-filled-error', 8)}
          
        }
        if (currentIncident.Melding !== updatedIncident.Melding) {
          currentIncident.Melding = updatedIncident.Melding;
          notificatie(IncidentenNotiStore, `Melding aangepast voor incident: ${updatedIncident.Melding}!`, 'variant-ringed-tertiary')

          console.log(`Melding van incident met ID ${currentIncident.id} is gewijzigd naar: ${updatedIncident.Melding}`);
        }
        if (currentIncident.Location !== updatedIncident.Location) {
          currentIncident.Location = updatedIncident.Location;
          notificatie(IncidentenNotiStore, `Locatie aangepast voor incident: ${updatedIncident.Melding}!`, 'variant-ringed-tertiary')

          console.log(`Locatie van incident met ID ${currentIncident.id} is gewijzigd naar: ${updatedIncident.Location}`);
        }
        if (currentIncident.Area !== updatedIncident.Area) {
          currentIncident.Area = updatedIncident.Area;
          console.log(`Gebied van incident met ID ${currentIncident.id} is gewijzigd naar: ${updatedIncident.Area}`);
          notificatie(IncidentenNotiStore, `Locatie aangepast voor incident: ${updatedIncident.Melding}!`, 'variant-ringed-tertiary')
        }
        if (JSON.stringify(currentIncident.Units) !== JSON.stringify(updatedIncident.Units)) {
          currentIncident.Units = updatedIncident.Units;

          notificatie(IncidentenNotiStore, `Opgeschaald voor incident: ${updatedIncident.Melding}!`, 'variant-ringed-tertiary')

          console.log(`Eenheden van incident met ID ${currentIncident.id} zijn gewijzigd naar: ${JSON.stringify(updatedIncident.Units)}`);
        }
      }

  }

  function isIncidentAanwezig(melding: IncidentsResponse){
    const incidentIndex = actieveIncidenten.findIndex((incident) => incident.id === melding.id);
    if (incidentIndex === -1) {return false;}
    return true;
  }

  function moetIncidentInLijst(record: IncidentsResponse): boolean {
  const heeftOverlap = userUnit.some((eenheid: string) => record.Units.includes(eenheid));
  const isActief = record.Status === 'Actief';
  return heeftOverlap && isActief;
}

// Functie om het incident toe te voegen of te verwijderen uit de lijst
function werkIncidentLijstBij(record: IncidentsResponse): void {
  const incidentAanwezig = isIncidentAanwezig(record);
  const moetInLijst = moetIncidentInLijst(record);

  if (incidentAanwezig && !moetInLijst) {
    console.log("Incident wordt verwijderd uit de lijst");
    IncidentVerwijderen(record);
  } else if (!incidentAanwezig && moetInLijst) {
    console.log("Incident wordt toegevoegd aan de lijst");
    IncidentToevoegen(record);
  } 
  if (incidentAanwezig && moetInLijst){
    IncidentUpdate(record)
  }


}


    onMount(() => {
    pb = new PocketBase(env.PUBLIC_PB_URL);
	pb.authStore?.loadFromCookie(document.cookie || '');

	pb.collection('Incidents').subscribe<IncidentsResponse>('*', async function (e) {
    
    if(e.action == 'update' || e.action == 'create'){
      
      werkIncidentLijstBij(e.record)
    }

    if (e.action == 'delete'){
      console.log('delete actie')
      if(isIncidentAanwezig(e.record)) {IncidentVerwijderen(e.record)}
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