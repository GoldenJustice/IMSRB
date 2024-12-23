import type { IncidentsResponse } from "$lib/algemeen/pocketbase-types";
import { hasPermission } from "$lib/rechten/rechten";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../$types";
import { Permissions } from "$lib/rechten/permissions";


export const load = (async ({locals, params}) => {

    let user = locals.pb.authStore.model;
    let incidentID = params.id;
    
    // console.log(incidentID)

    if(hasPermission(user, user?.permissies, Permissions.INCIDENTEN.SPECIFIEK) == false) {
        redirect(303, '/');
       
    }

    let expand = "Units.brigadeID,Brigade";



    let incident = await locals.pb.collection('Incidents').getOne<IncidentsResponse>(incidentID, {expand})

    let Brigade = incident.expand.Brigade;

    let Units = incident.expand.Units;



    
   

    return {user, incident, Brigade, Units, expand};
}) satisfies PageServerLoad;