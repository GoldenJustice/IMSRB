<script lang="ts">
	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
    import type { SvelteComponent } from 'svelte';



	const modalStore = getModalStore();

	// Form Data
	export let formData = {
    Area: '',
    Brigade: '',
    IncidentType: '',
    Location: '',
    Melding: '',
    Notepad: '',
    OGS: false,
    Priority: 1,
    Status: '',
    Units: [],
    VictimCount: 0
  };

  formData.Brigade = $modalStore[0].meta.userdata.Brigade;
  
  // Make a list of all Units in the modalstore Units
	function getUnitsListOptions(): string[] {
		return $modalStore[0].meta.userdata.Units.map((unit: any) => `${unit.expand?.brigadeID?.shortcode || ''} ${unit.name || ''} (36${unit.expand?.brigadeID?.number || '??'}${unit.unitnumber || '??'})`);
	}
  
	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

const unitsOptions = getUnitsListOptions(); // Replace this with dynamic data if available
  let selectedUnits: never[] = [];


	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
<div class="modal-example-form {cBase}">
	<header class="skeleton-modal-header">Test o</header>
	<article>
	  <form class="skeleton-modal-form grid-form" on:submit|preventDefault={onFormSubmit}>
		<div class="form-row">
		  <label class="label">
			<span>Gebied (Area)</span>
			<input class="input" type="text" bind:value={formData.Area} placeholder="Voer gebied in..." />
		  </label>
		  <label class="label">
			<span>Brigade</span>
			<input class="input" type="text" bind:value={formData.Brigade} placeholder="Voer brigade in..." />
		  </label>
		</div>
		<div class="form-row">
		  <label class="label">
			<span>Incident Type</span>
			<select class="input" bind:value={formData.IncidentType}>
			  <option value="EHBO">EHBO</option>
			  <option value="Vermissing">Vermissing</option>
			  <option value="Brand">Brand</option>
			</select>
		  </label>
		  <label class="label">
			<span>Locatie (Location)</span>
			<input class="input" type="text" bind:value={formData.Location} placeholder="Voer locatie in..." />
		  </label>
		</div>
		<div class="form-row">
		  <label class="label">
			<span>Melding</span>
			<input class="input" type="text" bind:value={formData.Melding} placeholder="Voer melding in..." />
		  </label>
		  <label class="label">
			<span>Notitieblok (Notepad)</span>
			<textarea class="input" bind:value={formData.Notepad} placeholder="Voer extra informatie in..."></textarea>
		  </label>
		</div>
		<div class="form-row">
		  <label class="label">
			<span>OGS</span>
			<input type="checkbox" bind:checked={formData.OGS} />
		  </label>
		  <label class="label">
			<span>Prioriteit (Priority)</span>
			<input class="input" type="number" min="1" max="5" bind:value={formData.Priority} />
		  </label>
		</div>
		<div class="form-row">
		  <label class="label">
			<span>Status</span>
			<select class="input" bind:value={formData.Status}>
			  <option value="Actief">Actief</option>
			  <option value="Inactief">Inactief</option>
			  <option value="Afgerond">Afgerond</option>
			</select>
		  </label>
		  <label class="label">
			<span>Betrokken Eenheden (Units)</span>
			<select class="input" multiple bind:value={selectedUnits}>
			  {#each unitsOptions as unit}
				<option value={unit}>{unit}</option>
			  {/each}
			</select>
		  </label>
		</div>
		<div class="form-row">
		  <label class="label">
			<span>Aantal Slachtoffers (Victim Count)</span>
			<input class="input" type="number" min="0" bind:value={formData.VictimCount} />
		  </label>
		</div>
	  </form>
	</article>
	<footer class="modal-footer">
	  <button class="btn btn-neutral" on:click={() => modalStore.close()}>Annuleren</button>
	  <button class="btn btn-primary" on:click={onFormSubmit}>Opslaan</button>
	</footer>
  </div>

{/if}


<style>
  .modal-example-form {
    padding: 1rem;
  }

  .grid-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-row {
    display: flex;
    gap: 1rem;
  }

  .label {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  </style>