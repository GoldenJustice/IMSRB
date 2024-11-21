# API Rules op basis van rollen

# PocketBase Toegangsregels voor Incidenten Bekijken

In deze documentatie bespreken we de toegangsregels voor het bekijken van incidenten in PocketBase, gebaseerd op de rol van de gebruiker en de gekoppelde eenheid en brigade.

# Incident bekijken / lijst van incidenten
## Code voor Toegangsregels
```text
@request.auth.role = "Admin" || 
@request.auth.role = "BrigadeAdmin" && Brigade:each ?= @request.auth.brigade.id ||
(@request.auth.role = "Commandant" && Brigade:each ?= @request.auth.brigade.id && Status = "Actief") ||
(@request.auth.role = "Eenheid"  && Brigade:each ?= @request.auth.brigade.id && Units:each ?= @request.auth.unit_id.id && Status = "Actief")
```

## Uitleg van de Toegangsregels
Deze regels bepalen welke gebruikers toegang hebben tot incidenten op basis van hun rol en hun koppeling aan een brigade of eenheid.

1. **Admin**: Gebruikers met de rol `Admin` hebben toegang tot alle incidenten, zonder beperkingen.

2. **BrigadeAdmin**: Gebruikers met de rol `BrigadeAdmin` hebben toegang tot alle incidenten die bij hun eigen brigade horen. De regel `Brigade:each ?= @request.auth.brigade.id` zorgt ervoor dat alleen incidenten van de specifieke brigade van de `BrigadeAdmin` zichtbaar zijn.

3. **Commandant**: Gebruikers met de rol `Commandant` hebben alleen toegang tot incidenten die bij hun eigen brigade horen en waarvan de status `Actief` is. Dit zorgt ervoor dat `Commandant` alleen relevante actieve incidenten kan bekijken.

4. **Eenheid**: Gebruikers met de rol `Eenheid` hebben toegang tot incidenten onder de volgende voorwaarden:
   - Het incident hoort bij hun eigen brigade (`Brigade:each ?= @request.auth.brigade.id`).
   - De eenheid is betrokken bij het incident (`Units:each ?= @request.auth.unit_id.id`).
   - Het incident heeft de status `Actief`.

5. **Lid**: Gebruikers met de rol `Lid` kunnen geen incidenten bekijken met deze specifieke regels. Indien deze regel wordt aangepast, zou het mogelijk zijn dat leden toegang krijgen tot de incidenten waarbij hun eenheid betrokken is en die onder hun brigade vallen, op voorwaarde dat het incident de status `Actief` heeft.

### Overzicht van de Toegang
| Rol            | Toegang tot Incidenten                 | Status Voorwaarden |
|----------------|----------------------------------------|--------------------|
| **Admin**      | Alle incidenten                        | Geen               |
| **BrigadeAdmin** | Incidenten binnen eigen brigade        | Geen               |
| **Commandant** | Incidenten binnen eigen brigade        | Status = `Actief`  |
| **Eenheid**    | Incidenten binnen eigen brigade en gekoppeld aan hun eenheid | Status = `Actief`  |

### Conclusie
Deze toegangsregels zorgen ervoor dat alleen gebruikers met de juiste bevoegdheden toegang krijgen tot specifieke incidenten. De combinatie van brigade- en eenheidskoppelingen, samen met de status van een incident, maakt het mogelijk om de toegang tot gevoelige gegevens nauwkeurig te beheren en zorgt ervoor dat gebruikers alleen relevante informatie kunnen zien.
