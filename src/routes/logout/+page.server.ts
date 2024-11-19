import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) => {

    if (locals.pb.authStore.model) {
        locals.pb.authStore.clear();
        redirect(303, '/login');
    }

    return {};
};