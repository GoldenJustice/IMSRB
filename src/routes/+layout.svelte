<script lang="ts">
    import ModalIncidentAdd from "$lib/modals/modalIncidentAdd.svelte";


    import "../app.css";


    import { initializeStores, Modal, Toast, type ModalComponent } from '@skeletonlabs/skeleton';


    
    let {children} = $props();

    initializeStores();


    const modalRegistry: Record<string, ModalComponent> = {
        ModalIncidentAdd: {ref: ModalIncidentAdd}

    };


    </script>

    <Toast position="tr" />   
    <Modal components={modalRegistry} />

    {@render children()}
    