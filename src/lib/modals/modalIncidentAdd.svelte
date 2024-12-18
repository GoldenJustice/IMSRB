<script lang="ts">
    import type { BrigadesResponse, UnitsResponse } from '$lib/algemeen/pocketbase-types';
	import { getModalStore } from '@skeletonlabs/skeleton';





	const modalStore = getModalStore();

	// Form Data
	let formData =  $state({
    Area: 'CLG',
    Brigade: '',
    IncidentType: 'EHBO',
    Location: '',
    Melding: '',
    Notepad: '',
    OGS: false,
    Priority: 1,
    Status: 'Actief',
    Units: [],
    VictimCount: 1
  });

  let prio: string = $state('0');

$effect(() => {
	if(prio === '0') {
	formData.Priority = 1;
	formData.OGS = true;
  } else {
	formData.Priority = parseInt(prio);
	formData.OGS = false;	}
})

    formData.Brigade = ($modalStore[0].meta.userdata.aangeslotenBrigades.map((brigade: BrigadesResponse) => brigade.id).join(','));

  
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

const unitsOptions = $modalStore[0].meta.userdata.Units.map((unit: UnitsResponse) => unit);
const BrigadesOptions = $modalStore[0].meta.userdata.aangeslotenBrigades.map((brigade: BrigadesResponse) => brigade);





</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}

	<div class="incident-modal">
	  <div class="incident-header">
		<h2>Incident aanmaken</h2>
		<button class="close-btn" onclick={() => modalStore.close()}>&times;</button>
	  </div>
  
	  <div class="incident-body">
		<div class="form-section">
		  <div class="form-group">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label>Gebied:</label>
			<select bind:value={formData.Area} class="input-field" placeholder="Voer gebied in..." >
				{#each BrigadesOptions as brigade}
          {#each JSON.parse(brigade.Areas) as area}
        <option value={area}>{area}</option>
          {/each}
				{/each}
			</select>
		  </div>
		  <div class="form-group">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label>Prioriteit</label>
			<select bind:value={prio} class="input-field">
			  <option value=0>Prio 1 - OGS</option>
			  <option value=1>Prio 1</option>
			  <option value=2>Prio 2</option>
			  <option value=3>Prio 3</option>
			  <option value=4>Prio 4</option>
			  <option value=5>Prio 5</option>
			</select>
		  </div>
		  <div class="form-group">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label>Locatie:</label>
			<input bind:value={formData.Location} type="text" class="input-field" placeholder="Voer locatie in...">
		  </div>
		  <div class="form-group">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label>Incident Type</label>
			<select bind:value={formData.IncidentType} class="input-field">
			  <option value="EHBO">EHBO</option>
			  <option value="Vermissing">Vermissing</option>
			  <option value="Overig">Overig</option>
			</select>
		  </div>
		  
		  
		  <div class="form-group">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label>Betrokken Eenheden:</label>
			<select bind:value={formData.Units} class="input-field" multiple>

			{#each unitsOptions as unit}
				<option value={unit.id}>{unit.expand?.brigadeID?.shortcode || ''} {unit.name || ''} (36{unit.expand?.brigadeID?.number || ''}{unit.unitnumber || ''})</option>
			{/each}
			</select>
		</div>
		  </div>
		  <div class="form-group full-width">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label>Melding</label>
			<textarea bind:value={formData.Melding} class="input-field" rows="1" placeholder="Voer melding in..."></textarea>
		  </div>

		
		<div class="form-group full-width">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label>Notitieblok:</label>
			<textarea bind:value={formData.Notepad} class="input-field" rows="3" placeholder="Voer notitie in..."></textarea>
		  </div>
		
	  </div>
	  <div class="incident-footer">
		<button class="btn btn-neutral" onclick={() => modalStore.close()}>Annuleren</button>
		<button class="btn btn-primary" onclick={onFormSubmit}>Opslaan</button>
	  </div>
	</div>

 
 

{/if}


<style>
/* Incident Modal */
.incident-modal {
  background-color: #121c22;
  color: #fff;
  width: 90%; /* Standaard breedte */
  max-width: 800px; /* Maximale breedte */
  border-radius: 12px; /* Ronde hoeken */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4); /* Subtiele schaduw */
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-height: 95%; /* Zorg ervoor dat de modal niet groter wordt dan 85% van het scherm */
  overflow-y: auto; /* Scrollen mogelijk maken indien nodig */
  position: fixed; /* Altijd zichtbaar en gecentreerd */
  top: 50%; /* Verticaal centreren */
  left: 50%; /* Horizontaal centreren */
  transform: translate(-50%, -50%); /* Fixeer exact midden */
  box-sizing: border-box; /* Inclusief padding en borders */
}

.incident-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #444; /* Lichte scheiding */
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
  gap: 20px; /* Ruimte tussen elementen */
  padding-right: 10px; /* Extra ruimte aan de rechterkant */
  margin-bottom: 20px; /* Ruimte tussen body en footer */
}

.form-section {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Twee kolommen standaard */
  gap: 20px; /* Ruimte tussen invoervelden */
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
  border-radius: 4px; /* Afgeronde hoeken */
  border: 1px solid #ccc; /* Randkleur */
  background-color: #2c2c2e; /* Donkere invoerveldkleur */
  color: #fff;
}

.full-width {
  grid-column: span 2; /* Velden die de volledige breedte nemen */
}

.incident-footer {
  border-top: 1px solid #444; /* Lichte scheiding */
  padding-top: 20px;
  padding-bottom: 10px; /* Extra ruimte onder de knoppen */
  display: flex;
  justify-content: flex-end; /* Knoppen naar rechts uitlijnen */
  gap: 10px; /* Ruimte tussen knoppen */
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
  opacity: 0.9; /* Subtiele hover-effect */
}

/* Responsief ontwerp voor kleinere schermen */
@media (max-width: 768px) {
  .form-section {
    grid-template-columns: 1fr; /* Op mobiel één kolom */
  }

  .incident-modal {
    width: 95%; /* Breder op kleine schermen */
    max-height: 90%; /* Hoogte beperkt tot 85% */
    padding: 15px; /* Compactere padding */
    overflow-y: auto; /* Scrollen mogelijk maken voor inhoud */
  }

  .incident-footer {
    flex-direction: column; /* Knoppen onder elkaar */
    align-items: stretch; /* Knoppen vullen de volledige breedte */
    padding-bottom: 10px; /* Extra ruimte onderaan */
  }

  .btn {
    width: 100%; /* Knoppen nemen volledige breedte in */
    margin-bottom: 10px; /* Ruimte tussen knoppen */
  }
}


  </style>