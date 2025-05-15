## React

### Descrizione dell'Esercizio:

Creare un'applicazione web utilizzando React e TypeScript che implementi la login
tramite un servizio di autenticazione personalizzato. L'applicazione deve gestire i
token JWT e di refresh per mantenere l'utente autenticato.

### Requisiti dell'Esercizio:

1. Pagina di Login: Una semplice pagina di login con campi per email e password
   e un pulsante di login. Applica le validazioni formali
2. Autenticazione: Effettuare il login tramite un servizio API che restituisce un
   token JWT e un token di refresh.
   a. puoi utilizzare questo servizio mock che restituisce un oggetto con un
   token e un refreshToken https://run.mocky.io/v3/8d1199c0-d333-482e87c1-78ee85010b8e
3. Gestione dei Token: Memorizzare il token JWT e il token di refresh
4. Accesso a Risorse Protette: L’utente autenticato deve poter accedere a una
   pagina protetta. Una volta fatto accesso alla pagina protetta effettuare la
   chiamata a questo servizio, che restituisce i dati di un utente, e visualizzali
   nella pagina https://run.mocky.io/v3/20ec8886-ab6e-4141-b8ffa05d93b0d44e
5. Logout: Fornire un pulsante di logout che rimuove i token e reindirizza l'utente
   alla pagina di login.

### Specifiche Tecniche:

Utilizzare React con TypeScript.
Implementare la gestione dello stato utilizzando (redux, jotai, zustand o altre)
Documentare il codice
