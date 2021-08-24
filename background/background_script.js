function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true});
  }

async function sendMessage()
{

    const blob = await (await fetch("blocked_stuff.json")).blob();
    const blockedJsonUri = URL.createObjectURL(blob);
    const jsonContent = await (await fetch(blockedJsonUri)).json();
    
    getActiveTab().then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {"jsonContent": jsonContent});
    });
}

browser.tabs.onUpdated.addListener(sendMessage);