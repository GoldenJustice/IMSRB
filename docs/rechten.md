# Rechten en Rollen - Documentatie

Welkom bij de documentatie over de rechten en rollen binnen de applicatie. In dit document worden de verschillende rollen en bijbehorende rechten uitgelegd. Elk recht wordt gedetailleerd beschreven, zodat duidelijk is wat ermee gedaan kan worden.

---

## Hoe zijn de Rechten opgebouwd?

De rechten in de applicatie zijn opgebouwd uit drie delen:

1. **Type van het recht (Soort)**  
   Het eerste gedeelte geeft het type van het recht aan. Dit kan zijn:
   - **interface**: Dit type recht heeft betrekking op de gebruikersinterface en wordt vaak gekoppeld aan de tabletinterface van een eenheid.
   - **beheer**: Rechten die verband houden met het beheer van gebruikers, instellingen en andere administratieve taken.
   - **analytisch**: Rechten voor toegang tot en beheer van rapportages en gegevensanalyse.

2. **Categorie (Wat voor soort het gaat)**  
   Het tweede gedeelte beschrijft de categorie van het recht. Dit kan betrekking hebben op bijvoorbeeld:
   - **incidenten**: Rechten die verband houden met het creëren, beheren en bekijken van incidenten.
   - **gebruikers**: Rechten die betrekking hebben op het beheren van gebruikersaccounts.
   - **rapportages**: Rechten voor het inzien van analyses en rapporten.

3. **Actie (Wat je ermee kunt)**  
   Het laatste gedeelte van het recht geeft aan welke acties je kunt uitvoeren binnen de betreffende categorie. 
   - **`*` (Wildcard)**: Een `*` betekent dat je toegang hebt tot **alles** binnen die categorie. Bijvoorbeeld:
     - `interface.*`: Toegang tot alles binnen de interface.
     - `interface.incidenten.*`: Toegang tot alles binnen de incidenten in de interface, maar niet tot andere onderdelen van de interface.

---

## Rollen en hun Rechten

De applicatie heeft verschillende rollen, en elke rol heeft specifieke rechten. Hieronder worden de verschillende rollen beschreven, evenals de rechten die aan die rollen gekoppeld zijn. Klik op een recht om meer informatie te krijgen over wat je ermee kunt doen.

### Brigade Admin
De Beheerder heeft volledige toegang tot de applicatie en kan alles beheren en aanpassen.

**Rechten van Brigade Admin:**
- [interface.incidenten.*](#interfaceincident)
- [beheer.*](#beheer)
- [analytisch.*](#analytisch)

### Postcommandant
De postcommandant heeft toegang tot het bewerken van content, maar kan geen gebruikers beheren of systeeminstellingen wijzigen.

**Rechten van Editor:**
- [interface.incidenten.*](#interface-incidenten)
- [interface.gebruikers.*](#interface-gebruikers)

### Eenheid
De Eenheid heeft alleen toegang tot hun eigen gegevens en kan deze bewerken.

**Rechten van Gebruiker:**
- [interface.incidenten.lezen](#interface-incidenten-lezen)
- [interface.gebruikers.bewerken](#interface-gebruikers-bewerken)

### Lid
De Lid heeft alleen toegang tot hun eigen gegevens en kan deze bewerken.

**Rechten van Gebruiker:**
- [interface.incidenten.lezen](#interface-incidenten-lezen)
- [interface.gebruikers.bewerken](#interface-gebruikers-bewerken)
---

# Overzicht van alle rechten

## Incidenten
<details>
  <summary>Incidenten Wildcards</summary>
  
#### interface.incident.*
Dit recht geeft toegang tot alle onderstaande rechten
</details>
<details>
  <summary>Aanmaken van een incident - (interface.incidenten.aanmaken)</summary>
  
#### interface.incident.aanmaken
Dit recht geeft de mogelijkheid om nieuwe incidenten aan te maken binnen de interface, dit betekend dat alle normale velden ingevuld kunnen worden. Hierbij is een enkele uitzondering: Het afgeven van OGS vereist een extra recht: interface.incidenten.ogs.afgeven
</details>

<details>
  <summary>Bewerken van een incident - (interface.incidenten.bewerken)</summary>
  
#### interface.incident.bewerken
Dit recht geeft de mogelijkheid om bestaande incidenten waartoe de gebruiker toegang heeft te bewerken.
</details>

<details>
  <summary>Incident afsluiten - (iterface.incidenten.sluiten)</summary>
  
#### interface.incidenten.sluiten
Dit recht geeft de mogelijkheid om incidenten die de gebruiker kan zien af te sluiten. Het afsluiten gebeurd via de specifieke weergaven. Deze recht is dus ook vereist omhiervan gebruik te kunnen maken.
</details>

<details>
  <summary>Incidenten Overzicht (Eigen)</summary>
  
#### interface.incidenten.overzicht.eigen
Dit recht geeft de gebruiker de mogelijkheid om alle actieve incidenten te zien in de interface waartoe zij gekoppeld zijn.
</details>

<details>
 <summary>Incidenten Overzicht (Brigade)</summary>
  
#### interface.incidenten.overzicht.brigade
Dit recht geeft de gebruiker de mogelijkheid om alle actieve incidenten te zien in de interface van zijn volledige reddingsbrigade.
</details>

<details>
 <summary>Incidenten Details</summary>
  
#### interface.incidenten.specifiek.bekijken
Dit recht geeft de gebruiker de mogelijkheid om van zijn incidenten de voleldige weergaven te zien met die hierbij behoorende info.
</details>

---

