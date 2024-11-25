import type { ClientResponseError } from "pocketbase";
import type { PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

/**
 * Page load function for the login/register page.
 *
 * This function checks if the user is already authenticated.
 * If so, it redirects to the homepage. Otherwise, it retrieves
 * the available authentication providers for OAuth2.
 */
export const load: PageServerLoad = async ({locals, url}) => {
    // If the user is already logged in, redirect them to the homepage.
    if (locals.pb.authStore.model) {
        return redirect (303, '/');
    }

  
    const authMethods = await locals.pb.collection('users').listAuthMethods();
    const fail = url.searchParams.get('fail') === 'true';

    // Return the available providers and the fail status to the page.
    return {providers: authMethods.authProviders, fail};
};

/**
 * Actions for handling different authentication flows, such as registration,
 * login, password reset, and OAuth2 authentication.
 */
export const actions = {

    /**
     * Registration action to create a new user.
     *
     * This function handles registration by accepting email and password,
     * validates them, creates the user in PocketBase, and then authenticates.
     */
    register: async ({locals, request}) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        // console.log('request ontvangen');

        // Validate email and password fields.
        if (!email || !password) {
            console.log('request invalid');
            return fail(400, {emailRequired: email == null, passwordRequired: password == null});
        }

        // Confirm the password by setting the 'passwordConfirm' field.
        data.set('passwordConfirm', password?.toString());
        console.log(data.getAll.toString());

        try {
            // Create the user and authenticate them with PocketBase.
            await locals.pb.collection('users').create(data);
            await locals.pb.collection('users').authWithPassword(email.toString(), password.toString());
            await locals.pb.collection('users').requestVerification(email.toString());
        } catch (error) {
            const eroorObj = error as ClientResponseError;

            // If an error occurs during registration, return a failure response.
            return fail(500, {fail: true, message: eroorObj.data.message});
        }
        // Redirect to the homepage after successful registration.
        throw redirect(303, '/');
    },

    /**
     * Login action to authenticate an existing user.
     *
     * This function handles user login by validating the email and password,
     * and authenticating with PocketBase.
     */
    login: async ({locals, request}) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
         console.log('authenticate');

        // Validate email and password fields.
        if (!email || !password) {
            console.log('request invalid');
            return fail(400, {emailRequired: email == null, passwordRequired: password == null});
        }

        try {
            // Authenticate the user with PocketBase.
            console.log(email)
            console.log(password)

           
            const test = await locals.pb.collection('Users').authWithPassword(email.toString(), password.toString());

        } catch (error) {
            const eroorObj = error as ClientResponseError;
            console.log(eroorObj)
            // If authentication fails, return a failure response.
            return fail(500, {fail: true, message: "We konden je niet inloggen, controleer je gegevens en probeer het opnieuw! ", mail: email});
        }
        // Redirect to the homepage after successful login.
        throw redirect(303, '/');
    },

    /**
     * Password reset action to request a password reset for a user.
     *
     * This function handles password reset requests by validating the email
     * and requesting a password reset from PocketBase.
     */
    reset: async ({locals, request}) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        // Validate email and password fields.
        if (!email || !password) {
            return fail(400, {emailRequired: email == null, passwordRequired: password == null});
        }

        try {
            // Request a password reset for the user.
            await locals.pb.collection('users').requestPasswordReset(email.toString());
        } catch (error) {
            const eroorObj = error as ClientResponseError;

            // If password reset fails, return a failure response.
            return fail(500, {fail: true, message: eroorObj.data.message});
        }
        // Redirect to the login page after requesting password reset.
        throw redirect(303, '/login');
    },

    /**
     * Google OAuth2 authentication action.
     *
     * This function initiates Google OAuth2 login by setting the provider cookie
     * and redirecting the user to the appropriate Google authentication URL.
     */
    google: async ({ locals, cookies }) => {
        // Find the Google OAuth2 provider from the list of available providers.
        const provider = (await locals.pb.collection('users').listAuthMethods()).authProviders.find((p: any) => p.name === 'google');
        cookies.set('provider', JSON.stringify(provider), {httpOnly: true, path: `/auth/callback/google`});

        // Redirect the user to Google's authentication URL.
        throw redirect(303, provider?.authUrl + env.REDIRECT_URL + provider?.name);
    },
};
