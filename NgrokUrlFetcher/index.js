const { Builder, By, Key, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");

(async function example() {
  let URL = "";
  
  const driver = await new Builder()
    .setFirefoxOptions(new firefox.Options().headless())
    .forBrowser("firefox")
    .build();
  try {
    await driver.get("http://localhost:4040/status");
    URL = await driver
      .findElement(
        By.xpath(
          "/html/body/div[2]/div/div/div/div[1]/div[1]/ul/li[1]/div/table/tbody/tr[1]/td"
        )
      )
      .getText();
  } catch (error) {
    console.log(error);
  } finally {
    await driver.quit();
  }

  if (URL.startsWith("https://") && URL.endsWith(".ngrok.io")) {
    console.log(URL);
  }
})();
