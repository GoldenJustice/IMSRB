import type { UnitsResponse } from '$lib/algemeen/pocketbase-types';
import type { LayoutServerLoad } from './$types';



export const load = (async ({locals}) => {
    const user = locals.pb.authStore.model;
    // Voeg fetch toe om uit pocketbase units de units van de brigade id te halen.

    const units = await locals.pb.collection('units').getFullList<UnitsResponse>({
        filter: `brigadeID = "${user?.brigade}"`,
        expand: 'brigadeID'
    });

    

    if (user == null || user == undefined) {
        return {user: null};
    }

    return {user,units};

}) satisfies LayoutServerLoad;