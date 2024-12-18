
import type { IncidentsResponse, UsersRecord, UsersResponse } from "$lib/algemeen/pocketbase-types";
import type { PageServerLoad } from "./$types";




export const load = (async ({locals, parent}) => {

    let {user} = await parent();
    let expand = "Units.brigadeID"


    let filter = `Units:each ?= "${user?.unit_id}" && Status = "Actief"`;

    if(user?.role === 'Commandant' || user?.role === 'BrigadeAdmin' || user?.role === 'Admin'){
        filter = `Status = "Actief"`
    }
   
    let incidenten = await locals.pb.collection('Incidents').getFullList<IncidentsResponse>({
        
        filter,
        expand
        
    });
    

    // incidenten[0].expand.Units.forEach((element: { name: any; }) => {
    //     console.log(element.expand.brigadeID.shortcode)
    //     console.log(element.name)
        
    // });


    
   

    return {user, incidenten};
}) satisfies PageServerLoad;