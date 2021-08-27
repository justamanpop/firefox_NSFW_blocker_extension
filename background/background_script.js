let jsonContent = '';
let test;

//gets current active tab
function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true});
  }

  //sends blocked keywords and sites to content script
async function sendMessage()
{
    getActiveTab().then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {"jsonContent": jsonContent,"test":test});
    });
}

//if reading from sync storage fails
function onError(error) {
    console.log(`Error: ${error}`);
  }
  
//if reading from sync storage was successful
async function onGot(item) {
    
    //if they are already in storage, nothing to do here
    if(item.blockedWordList && item.blockedSiteList)
    {
        console.log('already exists');
        test = item;
        jsonContent = {blocked_words:item.blockedWordList, blocked_sites:item.blockedSiteList};   
    }

    //else if blocked words and sites are not in storage yet, read startup list from json file and write that to storage
    else {

        //reads startup blocked keywords and lists from json file
        jsonContent = await (await fetch("initial_blocked_stuff.json")).json();        
        
        //write this json to storage
        browser.storage.sync.set({
            blockedWordList: jsonContent.blocked_words,
            blockedSiteList: jsonContent.blocked_sites
        });
        
    }
}

//to retrive blocked words list and blocked sites list from storage, and create if it doesn't exist
let getting = browser.storage.sync.get();
getting.then(function (item) {return onGot(item);}, onError);

//send lists to content script when page loads
browser.tabs.onUpdated.addListener(sendMessage);