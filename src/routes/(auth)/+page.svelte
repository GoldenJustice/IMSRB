<script lang="ts">
    import IncidentenKaart from "$lib/componenten/IncidentenKaart.svelte";


let incidenten = [{
    prio: 1,
    OGS: true,
    Melding: "Badmeester TW",
    Locatie: "Z1",
    Gebied: "CLG",
    eenheden:  "CLG120, CLG130",
    Starttijd: "12:30"

},{
    prio: 5,
    OGS: false,
    Melding: "Badmeester TW",
    Locatie: "Z1",
    Gebied: "CLG",
    eenheden:  "CLG120, CLG130",
    Starttijd: "12:30"

},{
    prio: 2,
    OGS: false,
    Melding: "Badfasdfmeester TW",
    Locatie: "Z2",
    Gebied: "CLG",
    eenheden:  "CLG120, CLG130",
    Starttijd: "12:30"

},{
    prio: 3,
    OGS: false,
    Melding: "Ongeval klein letsel oorzaak onbekend",
    Locatie: "N2",
    Gebied: "GK",
    eenheden:  "CLG120, CLG130",
    Starttijd: "12:30"

}]


</script>
<section class="incidenten-overzicht">

       
     
{#each incidenten as incident}
<IncidentenKaart prio='{incident.prio}' OGS={incident.OGS} Melding={incident.Melding} 
Locatie={incident.Locatie} Gebied={incident.Gebied} eenheden={incident.eenheden} Starttijd={incident.Starttijd} />
 
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