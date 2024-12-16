<script lang="ts">
    import ModalIncidentAdd from "$lib/modals/modalIncidentAdd.svelte";
    import ModalRittenStaatAdd from "$lib/modals/modalRittenStaatAdd.svelte";



    import "../app.css";


    import { initializeStores, Modal, Toast, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';


    
    let {children} = $props();

    initializeStores();


    const modalRegistry: Record<string, ModalComponent> = {
        ModalIncidentAdd: {ref: ModalIncidentAdd},
        ModalRittenStaatAdd: {ref: ModalRittenStaatAdd}

    };


    </script>

    <Toast position="tr" />   
    <Modal components={modalRegistry} />

    {@render children()}
    