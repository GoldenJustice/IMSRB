import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

/**
 * Request handler for GET requests to handle OAuth2 login flow.
 *
 * This handler processes the OAuth2 redirect, verifying the state parameter,
 * and authenticates the user using PocketBase's OAuth2 functionality.
 */
export const GET: RequestHandler = async ({locals, url, cookies}) => {
    // Retrieve the OAuth2 provider information from cookies.
    // The provider information should include details like name, state, and code verifier.
    const provider = JSON.parse(cookies.get('provider') || '{}');
    // console.log(provider);
    
    // Validate that the state parameter matches the one sent during the initial request.
    // This is an important security measure to prevent CSRF attacks.
    if (provider.state !== url.searchParams.get('state')) {
        throw new Error('State parameters don\'t match');
    }

    try {
        // Authenticate with PocketBase using the OAuth2 code provided in the URL.
        // The following parameters are used:
        // - provider.name: The name of the OAuth2 provider (e.g., Google, GitHub).
        // - url.searchParams.get('code'): The authorization code returned by the OAuth2 provider.
        // - provider.codeVerifier: The code verifier for PKCE flow.
        // - env.REDIRECT_URL + provider.name: The redirect URL used during the initial OAuth2 request.
        const res = await locals.pb.collection('users').authWithOAuth2Code(
            provider.name,
            url.searchParams.get('code') || '',
            provider.codeVerifier,
            env.REDIRECT_URL + provider.name
        )        
    } catch (error) {
        // If there's an error during authentication (e.g., invalid code, network issues),
        // redirect the user to the login page with a fail query parameter.
        // console.error(error);
        return redirect(303, '/login?fail=true');
    }

    // If authentication is successful, redirect the user to the login page.
    // This can be customized to redirect the user to a different page after login.
    throw redirect(303, '/login');
};
