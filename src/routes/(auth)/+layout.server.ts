import {serializeNonPOJOs} from '$lib/algemeen/Utils';
import type { LayoutServerLoad } from './$types';

export const load = (async ({locals}) => {
    const user = locals.pb.authStore.model;




    return {user: serializeNonPOJOs(user)};

}) satisfies LayoutServerLoad;