import { getToastStore } from "@skeletonlabs/skeleton";
import type { LayoutServerLoad } from "./$types";


export const load = (async ({locals}) => {

    let user = locals.pb.authStore.model;




    if (user == null || user == undefined) {
        return {gebruikerBrigade: null, gebruikerRol: null};
    }

    let [gebruikerBrigade, gebruikerRol] = await Promise.all([
        locals.pb.collection('Brigades').getFullList({filter: `users_via_brigade.id ?~ "${user?.id}"`}),
        locals.pb.collection('roles').getOne(`${user?.role}`)
    ])

   

    return {user, gebruikerBrigade, gebruikerRol};
}) satisfies LayoutServerLoad;