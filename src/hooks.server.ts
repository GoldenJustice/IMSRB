import PocketBase from 'pocketbase';
import {env} from '$env/dynamic/private';
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from '@sveltejs/kit/hooks';

/**
 * Authentication handle function.
 *
 * This function initializes PocketBase, loads the authentication state from cookies,
 * verifies the authentication, and refreshes the auth store state if necessary.
 *
 * - Initializes `PocketBase` with the base URL from environment variables.
 * - Loads the store data from the request cookies.
 * - Attempts to refresh the authentication to maintain an up-to-date auth store.
 * - Attaches the updated auth store to the response cookies.
 */
export const authentication: Handle = async ({event, resolve}) => {
    // Initialize PocketBase with the URL from environment variables.
    event.locals.pb = new PocketBase(env.PB_URL);

    // Load the store data from the request cookie string.
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // Get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any).
        if (event.locals.pb.authStore.isValid) {
            await event.locals.pb.collection('users').authRefresh();

        }
    } catch (_) {
        // Clear the auth store on failed refresh to reset authentication state.
        event.locals.pb.authStore.clear();
    }
    

    // Proceed with the request resolution.
    const response = await resolve(event);

    // Send back the updated 'pb_auth' cookie to the client with the latest store state.
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({sameSite: 'Lax' , httpOnly: false}));

    return response;
}

/**
 * Authorization handle function.
 *
 * This function is used to protect specific routes that require authentication.
 * It checks whether the user is logged in, and if not, redirects them to the login page.
 *
 * - Protects any routes that are not explicitly listed as unprotected.
 * - Redirects unauthenticated users to the login page if they attempt to access a protected route.
 */
const unprotectedPrefix = ['/login', '/auth' ];
export const authorization: Handle = async ({ event, resolve }) => {
    // Protect any routes that are not prefixed with paths in `unprotectedPrefix`.
    if (!unprotectedPrefix.some((path) => event.url.pathname.startsWith(path))) {
        // Check if the user is logged in by verifying if `authStore.model` exists.
        const loggedIn = await event.locals.pb.authStore.model;
        if (loggedIn) {
            // Redirect unauthenticated users to the login page.
            
            
            
            const path = event.url.pathname.toLowerCase();

        //     if (!path.startsWith(`/${event.locals.pb.authStore.model?.role.toLowerCase()}`)){
        //         console.log('Rol is niet in url')
        //     switch (event.locals.pb.authStore.model?.role) {
        //         case 'Eenheid':
        //             throw redirect(303, `/${event.locals.pb.authStore.model?.role.toLowerCase()}${path}`)
        //         break;

        //     }
        //      // doe niks want de url gaat goed.
        //     console.log('Rol is wel in url')
        // }


        } else {throw redirect(303, '/login');}
    }
   

    // Proceed with the request resolution as usual.
    const result = await resolve(event);
    return result;
};

/**
 * Main handle function combining authentication and authorization.
 *
 * Uses the `sequence` helper function to chain `authentication` and `authorization` handlers.
 * The `authentication` handler is executed first, followed by the `authorization` handler.
 */
export const handle = sequence(authentication, authorization);
