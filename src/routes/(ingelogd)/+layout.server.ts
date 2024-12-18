import type { BrigadesResponse, UnitsResponse } from '$lib/algemeen/pocketbase-types';
import type { LayoutServerLoad } from './$types';



export const load = (async ({locals}) => {
    const user = locals.pb.authStore.model;
    // Voeg fetch toe om uit pocketbase units de units van de brigade id te halen.

    const units = await locals.pb.collection('units').getFullList<UnitsResponse>({
        filter: `"${user?.brigade}" ~ brigadeID:each`,
        expand: 'brigadeID'
    });

    
    const brigades = await locals.pb.collection('Brigades').getFullList<BrigadesResponse>({
        filter: `"${user?.brigade}" ~ id`
    });

    const ritten = await locals.pb.collection('rittenstaat').getFullList<BrigadesResponse>({
        filter: `"${units.map((unit) => unit.id).join(', ')}" ~ voertuig.id`,
        sort: '-created'
    }); 


    if (user == null || user == undefined) {
        return {user: null};
    }

    // console.log(ritten)
    // console.log(units.map((unit) => unit.id).join(', '))

    return {user,units,brigades, ritten};

}) satisfies LayoutServerLoad;