import type { IncidentsResponse } from "$lib/algemeen/pocketbase-types";
import type { PageServerLoad } from "../../$types";


export const load = (async ({locals, params}) => {

    let user = locals.pb.authStore.model;
    let incidentID = params.id;
    
    console.log(incidentID)

    let expand = "Units.brigadeID,Brigade";



    let incident = await locals.pb.collection('Incidents').getOne<IncidentsResponse>(incidentID, {expand})

    let Brigade = incident.expand.Brigade;

    let Units = incident.expand.Units;



    
   

    return {user, incident, Brigade, Units, expand};
}) satisfies PageServerLoad;