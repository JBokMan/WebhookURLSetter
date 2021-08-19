## What does it do?

It automates starting a local ngrok server and setting the webhook url in sipgate.io.

---

## How does it work?

1. First it checks if ngrok is already running and if so it kills the process.
2. Then it starts ngrok in the background.
3. The NgrokUrlFetcher script is run to fetch the URL if it does not work ngrok is killed.
4. Now xclip is used to copy the URL to the clipboard.
5. Finally the SipgateioWebhookUrlSetter script is run to set the WebhookUrl in sipgateio. If that does not work the ngrok server is also killed.

---

## Setup

### Things you should have installed:

- [node.js](https://nodejs.org/en/) for fetching and setting the URL
- [ngrok](https://ngrok.com/) for providing the local server
- [xclip](https://github.com/astrand/xclip) for copying the URL to clipboard
- [firefox](https://www.mozilla.org/en-US/firefox/new/) for fetching the URL with Selenium
- [GeckoDriver](https://github.com/mozilla/geckodriver) for fetching the URL with Selenium with Firefox

---

### Ngrok

Ngrok should be installed in the users home folder such that it can be run using:

```bash
~/ngrok
```
To do this install ngrok in your home folder as instructed on the ngrok website.

Otherwise you have to change the "start ngrok" part in set-io-webhook.sh.

After running the script successfully ngrok runs in the background. If you want to shut it down you can use something like this:

```
kill $(pgrep -f ngrok)
```
Additionally you could append 
```bash
alias ngrok='~/ngrok'
```
to your .bashrc. This allows you to run ngrok in your shell by just writing 
```bash
ngrok
```

---

### sipgate team

You need a sipgate team account with sipgate.io booked. Then you need to create a PAT (Personal Access Token) with the scopes:

 ```settings:sipgateio:read, settings:sipgateio:write```

 The created PAT and PAT-ID should be copied to the .env file of the SipgateioWebhookUrlSetter script.

---

### How to run

To run the script just use:

```bash
bash set-io-webhook.sh
```

Addidtionally you can create a new alias in the .bashrc file so you can run it from everywhere.

```bash
alias set-io-webhook='bash ~/<Path_to_set-io-webhook.sh>'
```

Then you can just run it like this:

```bash
set-io-webhook
```
