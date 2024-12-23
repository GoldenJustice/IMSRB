<script lang="ts">
    import ModalIncidentAdd from "$lib/modals/modalIncidentAdd.svelte";
    import ModalIncidentEdit from "$lib/modals/modalIncidentEdit.svelte";
    import ModalRittenStaatAdd from "$lib/modals/modalRittenStaatAdd.svelte";



    import "../app.css";


    import { initializeStores, Modal, Toast, type ModalComponent } from '@skeletonlabs/skeleton';


    
    let {children} = $props();

    initializeStores();


    const modalRegistry: Record<string, ModalComponent> = {
        ModalIncidentAdd: {ref: ModalIncidentAdd},
        ModalIncidentEdit: {ref: ModalIncidentEdit},
        ModalRittenStaatAdd: {ref: ModalRittenStaatAdd},


    };


    </script>

    <Toast position="tr" />   
    <Modal components={modalRegistry} />

    {@render children()}
    