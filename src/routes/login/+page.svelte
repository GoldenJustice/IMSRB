<script lang="ts">
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';

  /**
   * Extract data and form properties from the component's props.
   *
   * - `data`: Contains additional data passed to the component, such as status or error messages.
   * - `form`: Represents the form state, which may include previous submission attempts or errors.
   */
  let {data, form} = $props();

  /**
   * Define reactive state variables for the login form.
   *
   * - `username`: Represents the user's email address, initialized from form data if available.
   * - `password`: Represents the user's password.
   * - `disabled`: A derived state that is true when either the `username` or `password` is empty, disabling the login button to prevent empty form submissions.
   * - `loadingmanual`: A reactive state that indicates whether the manual login request is in progress, used to show a loading spinner.
   * - `loadinggoogle`: A reactive state that indicates whether the Google login request is in progress, used to show a loading spinner.
   */
  let username = $state(form?.mail ?? '');
  let password = $state('');
  let disabled = $derived(!username || !password);
  let loadingmanual = $state(false);
  let loadinggoogle = $state(false);
</script>

<!-- Login form container -->
<div class="login-container">
  <div class="login-box">
    <h2>Incident Management Systeem Inloggen</h2>
    
    <!-- Error message if login fails -->
    {#if form?.fail || data?.fail}
    <div class="error-message">
      {data?.fail ? "Het lijkt erop dat je google account (email) niet bekend is, neem contact op met je beheerder als je denkt dat dit niet klopt" : form?.message}
    </div>
    {:else}
    <p>Log in om toegang te krijgen tot het platform</p> 
    {/if} 

    <!-- Google login button -->
    <form method="POST" use:enhance={() => {
      /**
       * Set loading state to true when the Google login form is being submitted.
       */
      loadinggoogle = true;

      /**
       * Return an async function to handle the `update` event after the form submission.
       * This function will set `loadinggoogle` back to false once the update completes.
       */
      return async ({ update }) => {
        await update();
        loadinggoogle = false;
      };
    }}>
      <button class="google-login-button" formaction="?/google">
        {#if loadinggoogle}
          <span class="spinner"></span> Bezig met inloggen...
        {:else}
          <img src="google-logo.svg" alt="Google Logo" class="google-logo" />
          Inloggen met Google
        {/if}
      </button>
    </form>
    
    <!-- Manual login fields -->
    <div class="manual-login">
      <h3>Of log in met je account</h3>
      <form action="?/login" method="POST" use:enhance={() => {
        /**
         * Set loading state to true when the manual login form is being submitted.
         */
        loadingmanual = true;
  
        /**
         * Return an async function to handle the `update` event after the form submission.
         * This function will set `loadingmanual` back to false once the update completes.
         */
        return async ({ update }) => {
          await update();
          loadingmanual = false;
        };
      }}>
          <input bind:value={username} type="email" placeholder="Email adres" class="login-input" name="email" required/>
          <input bind:value={password} type="password" placeholder="Wachtwoord" class="login-input" name='password' required/>
          <button {disabled} class="login-button" type="submit">   
            {#if loadingmanual}
              <span class="spinner"></span> Bezig met inloggen...
            {:else}
              Inloggen
            {/if}
        </button>
      </form>
    </div>
  </div>
</div>

<!-- Styling for the login form and messages -->
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
      height: 100vh;
      width: 100vw;
      background-color: #f0f0f0;
  }

  h2 {
      font-weight: 600;
      margin-bottom: 10px;
  }

  .login-box {
      background-color: #ffffff;
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
      background-color: #FF4500;
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
      background-color: #dc3b00;
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
      background-color: #3f51b5;
      color: #ffffff;
      border: none;
      padding: 10px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.2s ease;
  }

  .login-button:hover {
      background-color: #303f9f;
  }

  .spinner {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid #fff;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        animation: spin 1s linear infinite;
        display: inline-block;
        margin-right: 5px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
