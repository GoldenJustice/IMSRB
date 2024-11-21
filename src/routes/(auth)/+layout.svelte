<script lang="ts">



let {children} = $props();

</script>



<div class="app-container">
  
  <!-- Linker navigatiebalk -->
  <aside class="sidebar">
    <!-- Logo bovenaan -->
    <div class="logo">
      <img src="logo.svg" alt="Logo" />
    </div>

    <!-- Navigatiebollen gecentreerd in het midden -->
    <div class="nav-bollen">
      <div class="nav-bol">Incidenten</div>
      <div class="nav-bol">Incident<br>Starten</div>

    </div>

    <!-- Gebruikersbol onderaan -->
    <div class="gebruiker">
      <div class="gebruiker-bol">CLG120</div> <!-- Voorbeeld initialen -->
    </div>
  </aside>


    <!-- Hoofdinhoud -->
    <main class="main-content">
        
        {@render children()}

    </main>
  </div>
  
  <style>
    /* Container voor de hele applicatie */
    .app-container {
      display: flex;
      height: 100vh; /* Volledige hoogte van het scherm */
    }
  
   /* Linker navigatiebalk */
  .sidebar {
    width: 10%;
    background-color: #121c22; /* Donkere achtergrondkleur voor de navigatiebalk  2d2d2d */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; /* Verdeel ruimte tussen boven, midden en onderkant */
    padding: 20px 0;
    box-sizing: border-box;
  }

  .logo {

    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo img {
    max-width: 40%; /* Vergroot het logo voor betere zichtbaarheid */
    height: auto;
  }

  .nav-bollen {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    flex-grow: 1;
    justify-content: center;
    width: 100%; /* Maak de bollen zo breed mogelijk */
  }

  .nav-bol {
    width: 80%; /* Zorg ervoor dat de bol zo breed mogelijk is binnen de sidebar */
    aspect-ratio: 1; /* Houd de bol vierkant */
    border: 3px solid #FF4500; /* Oranje kleur voor de outline */
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FF4500; /* Zelfde kleur als de outline */
    font-weight: bold;
    font-size: 1rem;
    background-color: transparent; /* Geen opvulling, alleen de outline zichtbaar */
    align-content: center;
  }

  .nav-bol:hover {
    transform: scale(1.1); /* Zoom-in effect bij hover */
  }

  .gebruiker {
    margin-bottom: 20px; /* Ruimte onderaan voor de gebruiker */
  }

  .gebruiker-bol {
    width: auto;
    height: auto;
    min-width: 50px; /* Minimale breedte voor de bol */
    min-height: 50px; /* Minimale hoogte voor de bol */
    padding: 10px; /* Padding om tekst niet tegen de rand te laten komen */
    background-color: #3f51b5; /* Blauwe kleur voor de gebruikersbol */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
    overflow: hidden;
    aspect-ratio: 1 / 1; /* Zorgt ervoor dat de bol altijd rond blijft */
    box-sizing: border-box; /* Houd padding en border in de grootte */
  }
  
    /* Hoofdinhoud */
    .main-content {
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
      overflow-y: hidden; /* Scrollen als de inhoud te groot is */
      background-color: #f0f0f0; /* Lichtgrijze achtergrondkleur */
    }
  

  </style>

