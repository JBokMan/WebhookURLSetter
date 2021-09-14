sipgateio = require("sipgateio");
const { createSettingsModule, sipgateIO } = sipgateio;

const myArgs = process.argv.slice(2);
const URL = myArgs[0];

const personalAccessTokenId = "<tokenId>";
const personalAccessToken = "<token>";

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
    console.log(error);
  }
})();
