# **Deans Dashboard**

## **Currently deployed on https://dashboard.police.gatech.edu**

 **User access contolled by AuthorizedUsers file**
(Users will be authorized by AD group in the future.)

- Be in GT network or connect to it via VPN.
- Since cas authentication should redirect back to our website, please use fully qualified domain name instead of localhost. (even for browsing)
  Domain name can be configured with the following node command. (the domain name should be under gt network)
  - require('node-fqdn')()
  - Browsers may automatically replace all capital letters with lowercase letters.
    So it would be better to use lowercased domain name.
    Or you can just add every possible domain names into REST serer cors header.
    - e.g. gtpd-columbo.police.gatech.edu instead of GTPD-Columbo.police.gatech.edu
- Authorized users list managed in AuthorizedUsers file

- When running in "development mode"
  - Copy certificate file to webpack-dev-server/ssl
    - cp server.pem node_modules/webpack-dev-server/ssl/ (don't need to copy on subsequent runs)
  - Since session is used for cas authentication, the REST server should run under https protocol.
    But, unless the certificate is authorized one such as dashboard_police_gatech_edu_cert.cer,
      Chrome will not allow any api calls to REST server.
    In order to go around this issue, enter chrome://flags/#allow-insecure-localhost in the address bar and make it 'enabled'
    Then, restart Chrome.
  - Ports configuration
    - To run client on port XX, modify followings
      - client/.env --> PORT=XX
      - server/index.js --> res.header("Access-Control-Allow-Origin", "https://[domain_name]:XX"); (This is to enable cors)
    - To run server on port YY, modify followings
      - client/src/config.js --> module.exports.server = 'https://[server_domain_name]:YY'
      - server/index.js --> console.log("\n\n[Server] Starting server on port YY")
      - server/index.js --> .listen(YY, '0.0.0.0')

- When deploying on dashboard.police.gatech.edu
  - Suppose server is going to run on port XX.
  [Client]
  - cd /home/DeansDashboard
  - modify client/src/config.js
    - module.exports.server = 'https://dashboard.police.gatech.edu:YY'
  - sudo npm run build
  - sudo systemctl restart nginx (--> starts webserver on nginx)
	[Server]
	- modify server/index_deploy.js
		-  listen(XX, '0,0,0,0')
	- sudo node server/index_deploy.js --deploy [gt-username] [password]


- Extras
    - Enable service worker for performance(but only on deployment)

- Concerns
    - REST server is not failure resistance
