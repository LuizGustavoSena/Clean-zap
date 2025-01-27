const observer = new MutationObserver(() => {
    const talkListBar = getElementByXPath(Xpaths.talkListBar);
    const searchBar = getElementByXPath(Xpaths.searchBar);
    const filter = getElementByXPath(Xpaths.filter);
    const header = getElementByXPath(Xpaths.header);
    const appMessage = getElementByXPath(Xpaths.appMessage);
    const chat = getElementByXPath(Xpaths.chat);

    hideElements([searchBar, filter, header, appMessage]);

    if (talkListBar)
        talkListBar.style.maxWidth = '90px';

    if (chat) {
        const chatList = chat.children;

        for (var row = 1; row <= chatList.length; row++) {
            const alert = getElementByXPath(Xpaths.alert(row));
            const favAlert = getElementByXPath(Xpaths.favAlert(row));

            var hasMessage = hasText(alert) || hasText(favAlert);

            const squareMessage = getElementByXPath(Xpaths.squareMessage(row));

            if (hasMessage)
                squareMessage.style.backgroundColor = '#075e54';

            if (!hasMessage)
                squareMessage.style.removeProperty('background-color');
        }
    }

});

const config = { attributes: true, childList: true, subtree: true };
observer.observe(document.body, config);

const getElementByXPath = (path) => {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

const hideElements = (elements) => {
    elements.forEach(el => {
        if (!el) return;

        el.style.display = 'none';
    });
}

const hasText = (element) => {
    return !isNaN(element?.innerText || element?.textContent);
}

const Xpaths = {
    talkListBar: '/html/body/div[1]/div/div/div[3]/div/div[3]',
    searchBar: '/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[1]',
    filter: '/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[2]',
    header: '/html/body/div[1]/div/div/div[3]/div/div[3]/header',
    appMessage: '/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[4]/div/div/div',
    chat: '/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[3]/div[1]/div/div',
    alert: (row) => `/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[3]/div[1]/div/div/div[${row}]/div/div/div/div[2]/div[2]/div[2]/span[1]/div/span`,
    favAlert: (row) => `/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[3]/div[1]/div/div/div[${row}]/div/div/div/div[2]/div[2]/div[2]/span[1]/div[2]/span`,
    squareMessage: (row) => `/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[3]/div[1]/div/div/div[${row}]/div/div/div/div[1]`
}