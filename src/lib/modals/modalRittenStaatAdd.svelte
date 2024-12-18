<script lang="ts">
    import { RittenstaatActiviteitOptions, type RittenstaatRecord, type RittenstaatResponse, type UnitsResponse } from '$lib/algemeen/pocketbase-types';
import { getModalStore } from '@skeletonlabs/skeleton';


const modalStore = getModalStore();
  let indienenToegestaan = $state(true);


let formData = $state({

    voertuig: $modalStore[0].meta.userdata.User.unit_id[0],
    begin_km: getLatestKMFromVoertuig($modalStore[0].meta.userdata.User.unit_id[0]),
    eind_km: 0,
    totaal_km: 123,
    gekoppeldIncident: "",
    chauffeur: "",
    activiteit: RittenstaatActiviteitOptions,
    vertrekadres: {},
    aankomstadres: {}
})


let activiteiten = $state(Object.values(RittenstaatActiviteitOptions))

const unitsOptions = $modalStore[0].meta.userdata.Units.map((unit: UnitsResponse) => unit);

function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

$effect(() => {

  formData.begin_km = getLatestKMFromVoertuig(formData.voertuig);
formData.totaal_km = formData.eind_km - formData.begin_km;

if (formData.totaal_km > 0 && formData.eind_km > formData.begin_km) {
  indienenToegestaan = false;

} else {
  indienenToegestaan = true;
} 

})

 
function getLatestKMFromVoertuig(voertuigID: string) {
      const ritten = $modalStore[0].meta.userdata.ritten ?? [];
      const filteredRitten = ritten.filter((rit: { voertuig: string | string[]; }) => rit.voertuig.includes(voertuigID));
      const sortedRitten = filteredRitten.sort((a: { eind_km: number; }, b: { eind_km: number; }) => b.eind_km - a.eind_km);
      return sortedRitten.length > 0 ? sortedRitten[0].eind_km : 0;
    }
      


  
  const cBase = 'card p-5 w-modal shadow-xl space-y-4 bg-neutral-800 text-surface-50';

</script>

{#if $modalStore[0]}


	<div class="incident-modal">
	  <div class="incident-header">
		<h2>Ritenstaat toevoegen</h2>
		<button class="close-btn" onclick={() => modalStore.close()}>&times;</button>
	  </div>
  
	  <div class="incident-body">
		<div class="form-section">
		  
		  <div class="form-group">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label>Voertuig:</label>
        <select bind:value={formData.voertuig} class="input-field">
  
          {#each unitsOptions as unit}
          <option value={unit.id}>{unit.expand?.brigadeID?.shortcode || ''} {unit.name || ''} (36{unit.expand?.brigadeID?.number || ''}{unit.unitnumber || ''})</option>
        {/each}
        </select>
      </div>
		  <div class="form-group">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label>Activiteit</label>
			<select bind:value={formData.activiteit} class="input-field">
			  {#each activiteiten as option}
                <option value={option}>{option}</option>   
              {/each}
			</select>
		  </div>
		  
		  <div class="form-group">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label>Begin KM:</label>
        <input bind:value={formData.begin_km} class="input-field" type="number" />

        </div>

		  <div class="form-group">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label>Eind KM:</label>
        <input bind:value={formData.eind_km} class="input-field" type="number" />

        </div>
        		  
		  <div class="form-group">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label>Chauffeur:</label>
        <input bind:value={formData.chauffeur} class="input-field" type="text" />

        </div>
      
        <div class="form-group">
          <!-- svelte-ignore a11y_label_has_associated_control -->
          <label>Totaal KM:</label>
          <input bind:value={formData.totaal_km} class="input-field" type="number" disabled />
  
          </div>
          
          <div class="form-group"></div>
      
          {#if formData.activiteit === RittenstaatActiviteitOptions.Anders}
          <div class="form-group">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label>Vertrek addres:</label>
            <input bind:value={formData.vertrekadres} class="input-field" type="json" />




              <!-- svelte-ignore a11y_label_has_associated_control -->
              <label>Aankomst address:</label>
              <input bind:value={formData.aankomstadres} class="input-field" type="text" />
          </div>
          {/if}
		</div>
	  </div> 

	  <div class="incident-footer">
		<button class="btn btn-neutral" onclick={() => modalStore.close()}>Annuleren</button>
		<button class="btn btn-primary" onclick={onFormSubmit} disabled={indienenToegestaan}>Indienen</button>
	  </div>
	</div>

 
 


{/if}


<style> 
/* Incident Modal */
.incident-modal {
  background-color: #121c22;
  color: #fff;
  width: 90%; /* Dynamische breedte */
  max-width: 800px; /* Maximale breedte */
  border-radius: 12px; /* Afgeronde hoeken */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4); /* Subtiele schaduw */
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-height: 90%; /* Lagere max-height voor scrollproblemen */
  overflow-y: auto; /* Schakelt scrollen in als inhoud te groot is */
  position: fixed; /* Gecentreerd op het scherm */
  top: 50%; /* Verticaal centreren */
  left: 50%; /* Horizontaal centreren */
  transform: translate(-50%, -50%); /* Exacte centrering */
  box-sizing: border-box;
}

.incident-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #444;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.incident-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
}

.incident-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-right: 10px;
  overflow-y: auto; /* Schakelt scrollen in als de inhoud te groot is */
}

.form-section {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Twee kolommen standaard */
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.input-field {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #2c2c2e;
  color: #fff;
}

.full-width {
  grid-column: span 2; /* Volledige breedte van het formulier */
}

.incident-footer {
  border-top: 1px solid #444; /* Scheiding tussen inhoud en footer */
  padding-top: 20px;
  padding-bottom: 10px; /* Voorkomt dat de knoppen tegen de rand aanzitten */
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px; /* Afgeronde knoppen */
  cursor: pointer;
  font-size: 1rem;
}

.btn-neutral {
  background-color: #6c757d;
  color: #fff;
}

.btn-primary {
  background-color: #c86100;
  color: #fff;
}

.btn:hover {
  opacity: 0.9; /* Subtiel hover-effect */
}

/* Responsief ontwerp voor kleinere schermen */
@media (max-width: 768px) {
  .form-section {
    grid-template-columns: 1fr; /* Eén kolom op mobiel */
  }

  .incident-modal {
    width: 95%; /* Modal neemt bijna de volledige breedte in */
    max-height:90%; /* Hoogte beperkt tot 85% */
    padding: 15px;
    overflow-y: auto; /* Schakelt scrollen in indien nodig */
  }

  .incident-footer {
    flex-direction: column; /* Knoppen onder elkaar */
    align-items: stretch; /* Knoppen vullen de volledige breedte */
    padding-bottom: 10px; /* Ruimte onderaan de footer */
  }

  .btn {
    width: 100%; /* Knoppen vullen de breedte */
    margin-bottom: 10px; /* Ruimte tussen knoppen */
  }
}

</style>

