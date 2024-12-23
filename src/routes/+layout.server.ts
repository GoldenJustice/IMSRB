
import type { LayoutServerLoad } from "./$types";



export const load = (async ({locals}) => {

    let user = locals.pb.authStore.model;
    let gebruikerBrigade, gebruikerRol;


    if (user == null || user == undefined) {
        return {gebruikerBrigade: null, gebruikerRol: null};
    }

    try {
       [gebruikerBrigade, gebruikerRol] = await Promise.all([
        
            locals.pb.collection('Brigades').getFullList({filter: `users_via_brigade.id ?~ "${user?.id}"`}),
          locals.pb.collection('roles').getOne(`${user?.role}`)   
          
         
      ])

    } catch (error) {
        console.log("Kon data niet laden! Error code #7F001")
    }



   

    return {user, gebruikerBrigade, gebruikerRol};
}) satisfies LayoutServerLoad;