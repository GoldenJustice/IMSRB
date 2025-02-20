
import type { LayoutServerLoad } from "./$types";



export const load = (async ({locals}) => {

    let user = locals.pb.authStore.model;
    let gebruikerBrigade, gebruikerRol;


    if (user == null || user == undefined) {
        return {gebruikerBrigade: null, gebruikerRol: null};
    }

    try {
        gebruikerRol = await locals.pb.collection('roles').getOne(`${user?.role}`);

                
        // console.log(gebruikerRol)

    } catch (error) {
        console.log("Kon data niet laden! Error code #7F001")
        console.log(error)
    }

    // try {


    //    gebruikerBrigade = await locals.pb.collection('Brigades').getFullList({filter: `users_via_brigade.id ?~ "${user?.id}"`});
                
    //     console.log(gebruikerBrigade)

    // } catch (error) {
    //     console.log("Kon data niet laden! Error code #7F002")
    //     console.log(error)
    // }

   

    return {user, gebruikerRol};
}) satisfies LayoutServerLoad;