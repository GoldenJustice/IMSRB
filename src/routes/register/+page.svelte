<script lang="ts">
    import { env } from '$env/dynamic/public';
    import type { PageData } from './$types';
    import PocketBase from 'pocketbase';
    
    let { ...props }: PageData = $props();

    function handleGoogleRegister() {
    // Dit is een vereenvoudigd voorbeeld. In werkelijkheid gebruik je de Google API.
    console.log('Registreren met Google knop geklikt');
    // Hier zou je de Google OAuth2-logica integreren
  }



  let email = $state('');
  let password = $state('');




</script>

<div class="register-container">
    <div class="register-box">
      <h2>Registreren bij Incident Management</h2>
      <p>Maak een nieuw account aan om toegang te krijgen tot het platform</p>
  
      <!-- Registreren met Google knop -->
      <button class="google-register-button" onclick="{handleGoogleRegister}">
        <img src="google-logo.svg" alt="Google Logo" class="google-logo" />
        Registreren met Google
      </button>
  
      <!-- Handmatige registratie velden -->
      <div class="manual-register">
        <h3>Of maak een nieuw account aan</h3>
          <form >
            <input type="text" placeholder="Gebruikersnaam" class="register-input" />
            <input type="email" bind:value={email} placeholder="E-mailadres" class="register-input" />
            <input type="password" bind:value={password} placeholder="Wachtwoord" class="register-input" />
            <input type="password" placeholder="Bevestig wachtwoord" class="register-input" />
            <button class="register-button" type="submit">Registreren</button>
      	 </form>
      </div>
    </div>
  </div>
  
  <style>
    .register-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh; /* Volledige schermhoogte */
      width: 100vw; /* Volledige schermbreedte */
      background-color: #f0f0f0; /* Lichtgrijze achtergrondkleur */
    }
  
    .register-box {
      background-color: #ffffff; /* Witte achtergrond */
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 400px;
      width: 100%;
    }

    h2 {
        font-weight: 600;
        margin-bottom: 20px;

    }
  
    .google-register-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      background-color: #FF4200; /* Google-blauw */
      color: #ffffff;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      margin-top: 20px;
      transition: background-color 0.2s ease;
    }
  
    .google-register-button:hover {
      background-color: #dc3b00; /* Donkerder blauw bij hover */
    }
  
    .google-logo {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  
    .manual-register {
      margin-top: 30px;
    }
  
    .register-input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border-radius: 8px;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }
  
    .register-button {
      width: 100%;
      background-color: #3f51b5; /* Blauwe knop */
      color: #ffffff;
      border: none;
      padding: 10px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.2s ease;
    }
  
    .register-button:hover {
      background-color: #303f9f; /* Donkerder blauw bij hover */
    }
  </style>