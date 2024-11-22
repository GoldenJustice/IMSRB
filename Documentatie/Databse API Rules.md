# API Rules op basis van rollen

# PocketBase Toegangsregels voor Incidenten Bekijken

In deze documentatie bespreken we de toegangsregels voor het bekijken van incidenten in PocketBase, gebaseerd op de rol van de gebruiker en de gekoppelde eenheid en brigade.

# Incident bekijken / lijst van incidenten
>## Code voor Toegangsregels
>
>@request.auth.role = "Admin" || 
>@request.auth.role = "BrigadeAdmin" && Brigade:each ?= @request.auth.brigade.id ||
>(@request.auth.role = "Commandant" && Brigade:each ?= @request.auth.brigade.id ||
>(@request.auth.role = "Eenheid"  && Brigade:each ?= @request.auth.brigade.id

