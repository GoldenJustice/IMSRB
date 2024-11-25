import type { IncidentsResponse } from "$lib/algemeen/pocketbase-types";
import type { PageServerLoad } from "../../$types";


export const load = (async ({locals, params}) => {

    let user = locals.pb.authStore.model;

    let incidentID = params.incidentID;

    let expand = "Units.brigadeID,Brigade";



    let incident = await locals.pb.collection('Incidents').getOne<IncidentsResponse>(incidentID, {expand})
    // @ts-expect-error
    let Brigade = incident.expand.Brigade;
    // @ts-expect-error
    let Units = incident.expand.Units;



    
   

    return {user, incident, Brigade, Units};
}) satisfies PageServerLoad;