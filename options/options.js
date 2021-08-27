// function saveOptions(e) {
//     function onGot(item)
//     {

//         let blockedWordList = item.blockedWordList;
//         let blockedSiteList = item.blockedSiteList;
    
//         //if lists don't exist, initialize them to empty list
//         if(!blockedWordList)
//         {
//             blockedWordList = [];
//         }

//         if(!blockedSiteList)
//         {
//             blockedSiteList = [];
//         }

//         //convert to set so no duplicates
//         blockedWordList = new Set(blockedWordList);
//         blockedSiteList = new Set(blockedSiteList);
        
//         browser.storage.sync.set({
//             afa: Array.from(blockedWordList),
//             afb: Array.from(blockedSiteList)
//         });

//         //add user input words to the lists
//         blockedWordToAdd = 'mendoaz';
//         blockedSiteToAdd = 'jenga';

//         if(blockedWordToAdd)
//             blockedWordList.add(blockedWordToAdd);
        
//         if(blockedSiteToAdd)
//             blockedSiteList.add(blockedSiteToAdd);

//         //put updated lists back in storage 
//         browser.storage.sync.set({
//             blockedWordList: Array.from(blockedWordList),
//             blockedSiteList: Array.from(blockedSiteList)
//         });
//     }

//     function onError(e)
//     {
//         browser.storage.sync.set({
//             error: 'there was a fucking error'
//         });
//         console.log(e);
//     }

//     //to retrive blocked words list and blocked sites list from storage, and create if it doesn't exist
//     let getting = browser.storage.sync.get();
//     getting.then(onGot, onError);

//     e.preventDefault();

//   }

// document.querySelector("form").addEventListener("submit", saveOptions);

window.onload = testFunc;

function testFunc()
{

    function onSubmit()
    {
        blockedWord = document.getElementById("blockedWord").value;
        blockedSite = document.getElementById("blockedSite").value;

        function onGot(item)
        {

            let blockedWordList = item.blockedWordList;
            let blockedSiteList = item.blockedSiteList;
        
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

            //put updated lists back in storage 
            browser.storage.sync.set({
                blockedWordList: Array.from(blockedWordList),
                blockedSiteList: Array.from(blockedSiteList)
            });
        }
        
        function onError(e)
        {
            console.log(e);
        }

        let blockedWordToAdd = document.querySelector("#blockedWord").value;
        let blockedSiteToAdd = document.querySelector("#blockedSite").value;
        
        let getting = browser.storage.sync.get();
        getting.then(onGot, onError);
    }
    

    document.querySelector("form").addEventListener("submit", onSubmit);
    
}

