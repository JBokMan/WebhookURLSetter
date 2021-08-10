dotenv = require("dotenv");
sipgateio = require("sipgateio");
const { createSettingsModule, sipgateIO } = sipgateio;
dotenv.config();

const myArgs = process.argv.slice(2);
const URL = myArgs[0];

const personalAccessTokenId = process.env.SIPGATE_TOKEN_ID || "";
const personalAccessToken = process.env.SIPGATE_TOKEN || "";

(async () => {
  try {
    const client = sipgateIO({
      tokenId: personalAccessTokenId,
      token: personalAccessToken,
    });
    const webhookSettings = createSettingsModule(client);

    await webhookSettings.setIncomingUrl(URL);
    await webhookSettings.setOutgoingUrl(URL);
    console.log(0);
  } catch (error) {
    console.log(1);
  }
})();
