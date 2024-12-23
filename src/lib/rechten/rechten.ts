import type { RolesRecord, UsersRecord, UsersResponse } from "../algemeen/pocketbase-types";

/**
 * Controleert of een gebruiker de opgegeven permissie heeft.
 *
 * @param user De gebruiker die gecontroleerd moet worden.
 * @param userRolPermissions De Rol van de gebruiker.
 * @param permissionToCheck De permissie die gecontroleerd moet worden.
 * @returns True als de gebruiker toegang heeft, anders False.
 */
export function hasPermission(user: any, userRolPermissions: any, permissionToCheck: string): boolean {
    // Haal permissies van de rol op
    const rolePerms = userRolPermissions.permissies || [];
    const userPerms = user.permissies || [];

    // Combineer rol- en persoonlijke permissies
    const allPermissions = [...rolePerms, ...userPerms];



    // Controleer specifieke permissie
    if (allPermissions.includes(permissionToCheck)) {
        return true;
    }

    // Controleer wildcards
    for (const perm of allPermissions) {
        if (isWildcardMatch(perm, permissionToCheck)) {
            return true;
        }
    }

    return false;
}

/**
 * Controleert of een permissie overeenkomt met een wildcard.
 *
 * @param wildcard De wildcard permissie (bijv. 'interface.incidenten.*').
 * @param permission De te controleren permissie (bijv. 'interface.incidenten.bekijken').
 * @returns True als de permissie overeenkomt, anders False.
 */
function isWildcardMatch(wildcard: string, permission: string): boolean {
    if (wildcard === "*") return true; // Universele toegang
    const pattern = "^" + wildcard.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$";
    const regex = new RegExp(pattern);
    return regex.test(permission);
}
