
import type { IncidentsResponse, UsersRecord, UsersResponse } from "$lib/algemeen/pocketbase-types";
import type { PageServerLoad } from "./$types";




export const load = (async ({locals}) => {

    let user = locals.pb.authStore.model;


    let filter = `Units:each ?= "${user?.unit_id}" && Status = "Actief"`;

    if(user?.role === 'Commandant' || user?.role === 'BrigadeAdmin' || user?.role === 'Admin'){
        filter = `Status = "Actief"`
    }
   
    let incidenten = await locals.pb.collection('incidents').getFullList<IncidentsResponse>({filter});
    


    
   

    return {user, incidenten};
}) satisfies PageServerLoad;