window.onload = onLoadFunc;

function onLoadFunc()
{

    var blockedWordList;
    var blockedSiteList;

    function onGot(item)
    {
        blockedWordList = item.blockedWordList;
        blockedSiteList = item.blockedSiteList;
        
        for(let i=0;i<blockedWordList.length;i++)
        {
            listItem = document.createElement("li");
            listItem.setAttribute("class","list-group-item");
            listItem.innerHTML = blockedWordList[i];
            document.getElementById("blockedWordList").appendChild(listItem);
        }
        
        for(let i=0;i<blockedSiteList.length;i++)
        {
            listItem = document.createElement("li");
            listItem.setAttribute("class","list-group-item");
            listItem.innerHTML = blockedSiteList[i];
            document.getElementById("blockedSiteList").appendChild(listItem);
        }
    }

    function onError(e)
    {
        console.log(e);
    }

    function onSubmit(event)
    {
        event.preventDefault();

        blockedWordToAdd = document.getElementById("blockedWord").value;
        blockedSiteToAdd = document.getElementById("blockedSite").value;

        blockedWordToDelete = document.getElementById("blockedWordDelete").value;
        blockedSiteToDelete = document.getElementById("blockedSiteDelete").value;
        
        //if lists don't exist, initialize them to empty list
        if(!blockedWordList)
        {
            blockedWordList = [];
        }

        if(!blockedSiteList)
        {
            blockedSiteList = [];
        }

        blockedWordList = new Set(blockedWordList);
        blockedSiteList = new Set(blockedSiteList);
        
        if(blockedWordToAdd)
            blockedWordList.add(blockedWordToAdd);
        

        if(blockedSiteToAdd)
            blockedSiteList.add(blockedSiteToAdd);

        if(blockedWordToDelete)
            blockedWordList.delete(blockedWordToDelete);
        
        if(blockedSiteToDelete)
            blockedSiteList.delete(blockedSiteToDelete);

        //put updated lists back in storage 
        browser.storage.sync.set({
            blockedWordList: Array.from(blockedWordList),
            blockedSiteList: Array.from(blockedSiteList)
        });

    }
    
    let getting = browser.storage.sync.get();
    getting.then(onGot, onError);
    document.querySelector("form").addEventListener("submit", onSubmit);
    
}

