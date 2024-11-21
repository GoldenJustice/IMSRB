
import type { IncidentsResponse } from "$lib/pocketbase-types";
import type { PageServerLoad } from "./$types";




export const load = (async ({locals}) => {

    const user = await locals.pb.authStore.model;
   
    let incidenten = await locals.pb.collection('incidents').getFullList<IncidentsResponse>();

    
   

    return {user, incidenten};
}) satisfies PageServerLoad;