function receiveMessage(req, sender, response)
{
    jsonContent = req.jsonContent;
    
    blocked_url = browser.runtime.getURL("./blocked.html");

    blocked_words = jsonContent.blocked_words;
    blocked_sites = jsonContent.blocked_sites;
    current_url = window.location.href.toLowerCase();

    allow = true;

    for(let i=0,j=0; i< blocked_words.length || j<blocked_sites.length; i++,j++)
    {   
        if(i<blocked_words.length)
        {
            if(current_url.includes(blocked_words[i]))
            {
                console.log('word that triggered this was' , blocked_words[i]);
                allow = false;
                break;
            }
        }

        if(j<blocked_sites.length)
        {
            if(current_url.includes(blocked_sites[j]))
            {
                console.log('word that triggered this was' , blocked_sites[j]);
                allow = false;
                break;
            }
        }
        
    }

    //await new Promise(r => setTimeout(r, 12000));
    if(!allow)
        window.location.replace(blocked_url);

}

//listens for message from background script that has  json with list of blocked words and sites
browser.runtime.onMessage.addListener(receiveMessage);


  








