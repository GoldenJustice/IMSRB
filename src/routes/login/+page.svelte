<script lang="ts">

    import { page } from '$app/stores';


   
  let username = $state('')
	let password = $state('')
	let disabled = $derived(!username || !password)

  let data, form = $props();



</script>

<div class="login-container">
    <div class="login-box">
      <h2>Incident Management Systeem Inloggen</h2>
      <p>Log in om toegang te krijgen tot het platform</p>
  
      <!-- Inloggen met Google knop -->
      <button class="google-login-button" >
        <!-- <img src="google-logo.svg" alt="Google Logo" class="google-logo" /> -->
        Inloggen met Google
      </button>
  
      <!-- Handmatige inlog velden -->
      <div class="manual-login">
        <h3>Of log in met je account</h3>
        {#if form?.fail}

				<div class="subtekst bg-error">{form?.message}</div>
			{/if}
        <form action="?/login" method="POST">
          <input bind:value={username} type="email" placeholder="Email addres" class="login-input" name="email" required/>
          <input type="password" placeholder="Wachtwoord" class="login-input" name='password' required/>
          <button class="login-button" type="submit">Inloggen</button>
        </form>
        </div>
      </div>
  </div>
  
  <style>
    .login-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh; /* Volledige schermhoogte */
      width: 100vw; /* Volledige schermbreedte */
      background-color: #f0f0f0; /* Lichtgrijze achtergrondkleur */
      
    }

    h2{
        font-weight: 600;
        margin-bottom: 10px;
    }
  
    .login-box {
      background-color: #ffffff; /* Witte achtergrond */
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 400px;
      width: 100%;
    }
  
    .google-login-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #FF4500; /* Google-blauw */
      width: 100%;
      color: #ffffff;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      margin-top: 20px;
      transition: background-color 0.2s ease;
    }
  
    .google-login-button:hover {
      background-color: #dc3b00; /* Donkerder blauw bij hover */
    }
  
    .google-logo {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  
    .manual-login {
      margin-top: 30px;
    }
  
    .login-input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border-radius: 8px;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }
  
    .login-button {
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
  
    .login-button:hover {
      background-color: #303f9f; /* Donkerder blauw bij hover */
    }
  </style>
  
