<script lang="ts">
    import IncidentenKaart from "$lib/componenten/IncidentenKaart.svelte";
    import type { IncidentsResponse } from "$lib/pocketbase-types.js";
    import { getTime } from "$lib/Utils.js";
    import { onMount } from "svelte";
    import PocketBase from 'pocketbase'
    import { env } from "$env/dynamic/public";

    let {data} = $props();
    let pb: PocketBase;

    let actieveIncidenten = $state(data.incidenten);

    onMount(() => {
    pb = new PocketBase(env.PUBLIC_PB_URL);
	pb.authStore?.loadFromCookie(document.cookie || '');

	pb.collection('Incidents').subscribe<IncidentsResponse>('*', async function (e) {
    if (e.action == 'create'){
      actieveIncidenten.push(e.record);
    }

    if(e.action == "delete"){
      const incidentIndex = actieveIncidenten.findIndex((incident) => incident.id === e.record.id);
      actieveIncidenten.splice(incidentIndex, 1);
      
    }

    // if(e.action == 'update'){
    //   const incidentIndex = actieveIncidenten.findIndex((incident) => incident.id === e.record.id);
    //  actieveIncidenten = actieveIncidenten.map((inci) => {

    //     if (inci.id === e.record.id){
    //       return e.record;
    //     } return inci;
    //   })
    // }

    if (e.action === 'update') {
      const incidentIndex = actieveIncidenten.findIndex((incident) => incident.id === e.record.id);
      if (incidentIndex !== -1) {
        let currentIncident = actieveIncidenten[incidentIndex];
        let updatedIncident = e.record;

        // Check and update properties if they have changed
        if (currentIncident.Priority !== updatedIncident.Priority) {
          currentIncident.Priority = updatedIncident.Priority;
          console.log(`Prioriteit van incident met ID ${currentIncident.id} is gewijzigd naar: ${updatedIncident.Priority}`);
        }
        if (currentIncident.OGS !== updatedIncident.OGS) {
          currentIncident.OGS = updatedIncident.OGS;
          console.log(`OGS van incident met ID ${currentIncident.id} is gewijzigd naar: ${updatedIncident.OGS}`);
        }
        if (currentIncident.Melding !== updatedIncident.Melding) {
          currentIncident.Melding = updatedIncident.Melding;
          console.log(`Melding van incident met ID ${currentIncident.id} is gewijzigd naar: ${updatedIncident.Melding}`);
        }
        if (currentIncident.Location !== updatedIncident.Location) {
          currentIncident.Location = updatedIncident.Location;
          console.log(`Locatie van incident met ID ${currentIncident.id} is gewijzigd naar: ${updatedIncident.Location}`);
        }
        if (currentIncident.Area !== updatedIncident.Area) {
          currentIncident.Area = updatedIncident.Area;
          console.log(`Gebied van incident met ID ${currentIncident.id} is gewijzigd naar: ${updatedIncident.Area}`);
        }
        if (JSON.stringify(currentIncident.Units) !== JSON.stringify(updatedIncident.Units)) {
          currentIncident.Units = updatedIncident.Units;
          console.log(`Eenheden van incident met ID ${currentIncident.id} zijn gewijzigd naar: ${JSON.stringify(updatedIncident.Units)}`);
        }
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