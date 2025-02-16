

GOOGLE AUTH STEPS
****************************************************************************************************

- user clicks google button with path /auth/google

- render server 302-redirects to google authorization server where the user can login if needed

- authorization server - accounts.google.com
    issues the authorization code
    302-redirects to render server using callbackURL set via google console

- render server sends authorization code to token server

- token server - oauth2.googleapis.com
    exchanges the authorization code for access token and refresh token
    refresh token is a long lived base64 string that is refreshed ~1 month, it is used to refresh the access token
    access token is a short lived base64 string that is refreshed ~1 hour
- render now has access tokens and refresh token

- final 302-redirect is from render server to render server pass or fail paths


GENERAL
****************************************************************************************************
COMMON PORT USE
http                80
https               443
local               3000
