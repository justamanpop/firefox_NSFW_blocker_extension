document.querySelector("#options").addEventListener("click", openOptions);

var blockedWordList;
var blockedSiteList;

let getting = browser.storage.sync.get().then((res) => {
	blockedWordList = res.blockedWordList;
	blockedSiteList = res.blockedSiteList;
});

function openOptions() {
	browser.runtime.openOptionsPage();
	window.close();
}

function updateBlockList() {
	blockedWordToAdd = document.getElementById("blockWord").value;
	blockedSiteToAdd = document.getElementById("blockSite").value;

	blockedWordList = new Set(blockedWordList);
	blockedSiteList = new Set(blockedSiteList);

	if (blockedWordToAdd) blockedWordList.add(blockedWordToAdd);
	if (blockedSiteToAdd) blockedSiteList.add(blockedSiteToAdd);

	browser.storage.sync
		.set({
			blockedWordList: Array.from(blockedWordList),
			blockedSiteList: Array.from(blockedSiteList),
		})
		.then(
			() =>
				(document.getElementById("successMessage").innerHTML =
					"updated the lists successfully!")
		);
}

function blockCurrentSite() {
	browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
		const url = tabs[0].url;
		blockedSiteList = new Set(blockedSiteList);
		if (url) blockedSiteList.add(url);

		browser.storage.sync
			.set({
				blockedWordList: Array.from(blockedWordList),
				blockedSiteList: Array.from(blockedSiteList),
			})
			.then(
				() =>
					(document.getElementById("successMessage").innerHTML =
						"updated the lists successfully!")
			);
	});
}

function unblockCurrentSite() {
	browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
		const url = tabs[0].url;
		blockedSiteList = new Set(blockedSiteList);
		if (url) blockedSiteList.delete(url);

		browser.storage.sync
			.set({
				blockedWordList: Array.from(blockedWordList),
				blockedSiteList: Array.from(blockedSiteList),
			})
			.then(
				() =>
					(document.getElementById("successMessage").innerHTML =
						"updated the lists successfully!")
			);
	});
}

document
	.querySelector("#updateBlockListButton")
	.addEventListener("click", updateBlockList);

document
	.querySelector("#blockCurrentSiteButton")
	.addEventListener("click", blockCurrentSite);

document
	.querySelector("#unblockCurrentSiteButton")
	.addEventListener("click", unblockCurrentSite);
