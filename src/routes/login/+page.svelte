<script lang="ts">
    import { enhance } from '$app/forms';


  let {data, form} = $props();

   
  let username = $state(form?.mail ?? '')
	let password = $state('')
	let disabled = $derived(!username || !password)






</script>

<div class="login-container">
    <div class="login-box">
      <h2>Incident Management Systeem Inloggen</h2>
      
      {#if form?.fail || data?.fail}
      <div class="error-message">{data?.fail ? "Het lijkt erop dat je google account (email) niet bekend is, neem contact op met je beheerder als je denkt dat dit niet klopt" : form?.message}</div>
      {:else}
      <p>Log in om toegang te krijgen tot het platform</p> 
      
      {/if} 

      <!-- Inloggen met Google knop -->
      <form method="POST">
        
        <button class="google-login-button" formaction="?/google">
          <img src="google-logo.svg" alt="Google Logo" class="google-logo" />
          Inloggen met Google
        </button>
      </form>
        
      <!-- Handmatige inlog velden -->
      <div class="manual-login">
        <h3>Of log in met je account</h3>

        <form action="?/login" method="POST" use:enhance>
          <input bind:value={username} type="email" placeholder="Email addres" class="login-input" name="email" required/>
          <input bind:value={password} type="password" placeholder="Wachtwoord" class="login-input" name='password' required/>
          <button {disabled} class="login-button" type="submit">Inloggen</button>
        </form>
        </div>
      </div>
  </div>
  
  <style>
      .error-message {
    color: #ffffff;
    background-color: #ff4d4f;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    text-align: center;
    font-weight: 500;
  }

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
  
