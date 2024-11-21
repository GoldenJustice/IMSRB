# Rollen en Rechten voor de Incident Registratie App

Gebaseerd op de informatie die je hebt gegeven over de opbouw van de applicatie en de behoeften van verschillende gebruikersgroepen, zou ik de volgende rollen voorstellen:

## 1. Applicatie Administrator (`Admin`)
- **Beschrijving**: Beheert de volledige applicatie en heeft toegang tot alle brigades en alle functionaliteiten.
- **Rechten**:
  - Beheren van gebruikers en hun rollen binnen de hele applicatie.
  - Bekijken en bewerken van incidenten van alle brigades.
  - Bekijken en beheren van het incidentenarchief.
  - Beheren van alle actieve en historische gegevens binnen de app.

## 2. Brigade Bestuurslid (`BrigadeAdmin`)
- **Beschrijving**: Beheert alle aspecten binnen hun eigen brigade.
- **Rechten**:
  - Incidenten aanmaken, bewerken, afsluiten en het volledige incidentenarchief van hun brigade bekijken.
  - Gebruikers en hun rollen beheren binnen hun eigen brigade.
  - Alle actieve en historische incidenten van hun brigade kunnen zien en beheren.

## 3. Post/Commandant (`Commandant`)
- **Beschrijving**: Heeft verantwoordelijkheden op operationeel niveau binnen een brigade en heeft toegang tot alle incidenten binnen hun brigade.
- **Rechten**:
  - Alle actieve incidenten inzien, bewerken en afsluiten.
  - Incidenten kunnen aanmaken voor hun brigade.
  - Toegang tot alle actieve incidenten binnen hun brigade, zelfs als ze zelf niet aan het incident zijn toegevoegd.
  - Geen toegang tot historische incidenten.

## 4. Voertuig (`Voertuig`)
- **Beschrijving**: Toegang tot incidenten waarbij ze betrokken zijn binnen hun eigen brigade. Ze kunnen alleen de actieve incidenten van hun brigade inzien en bewerken.
- **Rechten**:
  - Actieve incidenten van hun brigade bekijken waarbij ze zijn toegevoegd.
  - Informatie binnen een actief incident kunnen aanpassen en toevoegen (zoals updates over de locatie of slachtoffers).
  - Geen rechten om incidenten af te sluiten of nieuwe incidenten aan te maken.

## 5. Lid (`Lid`)
- **Beschrijving**: Een lid kan incidenten volgen binnen hun brigade, maar mag niets bewerken. Dit kan ook van toepassing zijn op externe partijen zoals KNRM of Alarmploeg DHD.
- **Rechten**:
  - Actieve incidenten inzien binnen hun eigen brigade.
  - Geen rechten om incidenten te bewerken, aan te maken of af te sluiten.

## Overzicht van Rollen en Rechten

| Rol            | Actieve Incidenten Bekijken | Incidenten Bewerken | Incidenten Aanmaken | Incidenten Afsluiten | Incidenten Archief Bekijken | Gebruikers Beheren |
|----------------|-----------------------------|---------------------|---------------------|----------------------|----------------------------|---------------------|
| **Admin**      | Alle                        | Alle                | Alle                | Alle                 | Alle                       | Alle                |
| **BrigadeAdmin** | Eigen Brigade               | Eigen Brigade       | Eigen Brigade       | Eigen Brigade        | Eigen Brigade              | Eigen Brigade       |
| **Commandant** | Eigen Brigade (Alle)        | Eigen Brigade (Alle)| Eigen Brigade       | Eigen Brigade        | Geen                       | Geen                |
| **Voertuig**   | Betrokken Incidenten        | Betrokken Incidenten| Geen                | Geen                 | Geen                       | Geen                |
| **Lid**        | Eigen Brigade (Actieve)     | Geen                | Geen                | Geen                 | Geen                       | Geen                |

## Implementatie in PocketBase

### Rollen in PocketBase
Je kunt in de `users` collectie een veld `role` toevoegen om de rol van elke gebruiker te definiëren. De rollen die je nodig hebt zijn:
- `Admin`
- `BrigadeAdmin`
- `Commandant`
- `Voertuig`
- `Lid`

Voorbeeld van een gebruiker met een rol in PocketBase:
```json
{
    "id": "user123",
    "email": "bestuurslid1@brigade.nl",
    "role": "BrigadeAdmin",
    "created": "2024-11-21T10:00:00Z"
}


```

Toegangsregels (Rules) in PocketBase

Met PocketBase kun je per collectie regels instellen die bepalen welke rol toegang heeft tot welke acties:

Incidenten Aanmaken:

Alleen Admin, BrigadeAdmin, en Commandant mogen incidenten aanmaken.

@request.auth.role = "Admin" || @request.auth.role = "BrigadeAdmin" || @request.auth.role = "Commandant"

Incidenten Bewerken:

Admin, BrigadeAdmin, Commandant, en betrokken Voertuig mogen incidenten bewerken.

@request.auth.role = "Admin" || @request.auth.role = "BrigadeAdmin" || @request.auth.role = "Commandant" || (@request.auth.role = "Voertuig" && @request.auth.id in @collection.incident.vehicles)

Incidenten Bekijken:

Admin en BrigadeAdmin mogen alle incidenten zien. Commandant en Voertuig mogen de actieve incidenten zien, waarbij Voertuig alleen de incidenten kan zien waarin ze betrokken zijn. Lid kan alleen de actieve incidenten zien van hun brigade.

@request.auth.role = "Admin" || @request.auth.role = "BrigadeAdmin" || @request.auth.role = "Commandant" || (@request.auth.role = "Voertuig" && @request.auth.id in @collection.incident.vehicles) || (@request.auth.role = "Lid" && @collection.incident.status = "active")

Incidenten Afsluiten:

Alleen Admin, BrigadeAdmin, en Commandant kunnen incidenten afsluiten.

@request.auth.role = "Admin" || @request.auth.role = "BrigadeAdmin" || @request.auth.role = "Commandant"

Gebruikers Beheren:

Alleen Admin en BrigadeAdmin kunnen gebruikers beheren.

@request.auth.role = "Admin" || @request.auth.role = "BrigadeAdmin"

Samenvatting

Rollen-gebaseerde Toegangscontrole (RBAC) is de beste aanpak voor jouw applicatie. Het gebruik van rollen zoals Admin, BrigadeAdmin, Commandant, Voertuig, en Lid zorgt ervoor dat toegang eenvoudig te beheren blijft, zonder te veel complexiteit toe te voegen.

Toegangsbeheer in PocketBase: Gebruik regels om specifieke acties te beperken op basis van de rol van de gebruiker. Dit maakt het beheer eenvoudig en voorkomt dat je uitzonderingen moet maken voor individuele gebruikers.

Deze aanpak zorgt voor een duidelijke en gestructureerde toegang tot jouw Incident Registratie App, terwijl de complexiteit beheersbaar blijft en alle gebruikers hun taken kunnen uitvoeren binnen de juiste kaders van hun verantwoordelijkheid.