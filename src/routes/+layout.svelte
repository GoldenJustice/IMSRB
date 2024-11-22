<script lang="ts">

    import "../app.css";


    import { initializeStores, Toast } from '@skeletonlabs/skeleton';


    
    let {children} = $props();

    initializeStores();


    </script>

    <Toast position="tr" />   

    {@render children()}
    