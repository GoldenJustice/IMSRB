
import type { IncidentsResponse, UsersRecord, UsersResponse } from "$lib/algemeen/pocketbase-types";
import { Permissions } from "$lib/rechten/permissions";
import { hasPermission } from "$lib/rechten/rechten";
import type { PageServerLoad } from "./$types";


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const load = (async ({locals, parent}) => {

    let {user,gebruikerRol} = await parent();

    let expand = "Units.brigadeID"

    if (hasPermission(user, gebruikerRol, Permissions.INCIDENTEN.OVERZICHT.EIGEN) || 
        hasPermission(user, gebruikerRol, Permissions.INCIDENTEN.OVERZICHT.BRIGADE)) {

            let filter = "";
            if (hasPermission(user, gebruikerRol, Permissions.INCIDENTEN.OVERZICHT.EIGEN) && 
                !(hasPermission(user, gebruikerRol, Permissions.INCIDENTEN.OVERZICHT.BRIGADE))) {
                    filter = `Units:each ?= "${user?.unit_id}" && Status = "Actief"`;
                } else {

                    filter = `Status = "Actief"`
                }
            
               let incidenten = locals.pb.collection('Incidents').getFullList<IncidentsResponse>({
                        filter,
                        expand
                        
                    });
                    
                  

    return {user, incidenten};

    }

    

    // if(user?.role === 'Commandant' || user?.role === 'BrigadeAdmin' || user?.role === 'Admin'){
    //     filter = `Status = "Actief"`
    // }

    

    // incidenten[0].expand.Units.forEach((element: { name: any; }) => {
    //     console.log(element.expand.brigadeID.shortcode)
    //     console.log(element.name)
        
    // });


    
   

    return {user, incidenten: []};
}) satisfies PageServerLoad;