import type { ClientResponseError } from "pocketbase";
import type { PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export const load: PageServerLoad = async ({locals, url}) => {

    if (locals.pb.authStore.model) {
        return redirect (303, '/');
    }

    const authMethods = await locals.pb.collection('users').listAuthMethods();
    const fail = url.searchParams.get('fail') === 'true';

    return {providers: authMethods.authProviders, fail};
};


export const actions = {

    register: async ({locals, request}) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        console.log('request ontvangen');

        if (!email || !password) {
            console.log('request invalid');
            return fail(400, {emailRequired: email == null, passwordRequired: password ==null});

        }

        data.set('passwordConfirm', password?.toString())
        console.log(data.getAll.toString());

        try {
            await locals.pb.collection('users').create(data);
            await locals.pb.collection('users').authWithPassword(email.toString(), password.toString());
            await locals.pb.collection('users').requestVerification(email.toString());
            
        } catch (error) {
            const eroorObj = error as ClientResponseError;

            return fail(500, {fail: true, message: eroorObj.data.message});
            
        }
        throw redirect(303, '/');

    },

    login: async ({locals, request}) => {

        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        console.log('authenticate');

        if (!email || !password) {
            console.log('request invalid');
            return fail(400, {emailRequired: email == null, passwordRequired: password ==null});

        }

        try {
            
            await locals.pb.collection('users').authWithPassword(email.toString().toLocaleLowerCase(), password.toString());
         
            
        } catch (error) {
            const eroorObj = error as ClientResponseError;

            return fail(500, {fail: true, message: "We konden je niet inloggen, controleer je gegevens en probeer het opnieuw! ", mail: email});
            
        }
        throw redirect(303, '/');


    },

    reset: async ({locals, request}) => {

        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email || !password) {

            return fail(400, {emailRequired: email == null, passwordRequired: password ==null});

        }

        try {
            
            await locals.pb.collection('users').requestPasswordReset(email.toString());
         
            
        } catch (error) {
            const eroorObj = error as ClientResponseError;

            return fail(500, {fail: true, message: eroorObj.data.message});
            
        }
        throw redirect(303, '/login');


    },
    google: async ({ locals, cookies }) => {
        const provider = (await locals.pb.collection('users').listAuthMethods()).authProviders.find((p: any) => p.name === 'google');
        cookies.set('provider', JSON.stringify(provider), {httpOnly: true, path: `/auth/callback/google`});

        throw redirect(303, provider?.authUrl + env.REDIRECT_URL + provider?.name);
    },

}