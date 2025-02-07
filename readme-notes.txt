SERVERS
****************************************************************************************************
LOCAL
client start:    browser
google start:    local server
                 google server
google end:      local server
client end:      /

GITHUB
client start:    browser
google start:    render server
                 google server
google end:      render server
client end:      /

RENDER
client start:    browser
google start:    render server
                 google server
google end:      render server
client end:      /

GENERAL
****************************************************************************************************
COMMON PORT USE
http                80
https               443
local               3000

INTERFACE
0.0.0.0 accepts connections on any network interface

NOTES
the heroku proxy server will send all requests to process.env.PORT inlcuding http and https
