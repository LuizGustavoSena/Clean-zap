

Promise.race([
    waitElement('#pane-side'),
    waitElement('div[role="grid"]')
]).then(() => {
    const talkListBar = getElementByXPath(Xpaths.talkListBar);
    const searchBar = getElementByXPath(Xpaths.searchBar);
    const filter = getElementByXPath(Xpaths.filter);
    const header = getElementByXPath(Xpaths.header);
    const textArea = getElementByXPath(Xpaths.textBar);

    hideElements([searchBar, filter, header]);

    if (textArea)
        textArea.style.flex = 'none';

    if (talkListBar)
        talkListBar.style.maxWidth = '90px';

    const observerNotification = new MutationObserver(() => {
        const appMessage = getElementByXPath(Xpaths.appMessage);
        hideElements([appMessage]);

        const chat = getElementByXPath(Xpaths.chat);

        if (chat) {
            const chatList = chat.children;

            for (var row = 1; row <= chatList.length; row++) {
                const alert = getElementByXPath(Xpaths.alert(row));
                const favAlert = getElementByXPath(Xpaths.favAlert(row));

                var hasMessage = hasText(alert) || hasText(favAlert);

                const squareMessage = getElementByXPath(Xpaths.squareMessage(row));

                if (hasMessage)
                    squareMessage.style.backgroundColor = '#075e54';

                if (!hasMessage) {
                    squareMessage.style.removeProperty('background-color');
                    squareMessage.style.removeProperty('--darkreader-inline-bgcolor');
                }
            }
        }
    });

    observerNotification.observe(getElementByXPath(Xpaths.talkListBar), { childList: true, subtree: true });

    const observerEmojiMidia = new MutationObserver(() => {
        const emoji = getElementByXPath(Xpaths.emojiBar);

        if (emoji)
            emoji.style.removeProperty('left');
    });

    observerEmojiMidia.observe(document.body, { childList: true, subtree: true });
});

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
    emojiBar: '/html/body/div[1]/div/div/div[2]/span/div',
    textBar: '/html/body/div[1]/div/div/div[3]/div/div[2]/div[1]',
    imageBar: '/html/body/div[1]/div/div/div[3]/div/div[2]/div[2]',
    alert: (row) => `/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[3]/div[1]/div/div/div[${row}]/div/div/div/div[2]/div[2]/div[2]/span[1]/div/span`,
    favAlert: (row) => `/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[3]/div[1]/div/div/div[${row}]/div/div/div/div[2]/div[2]/div[2]/span[1]/div[2]/span`,
    squareMessage: (row) => `/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[3]/div[1]/div/div/div[${row}]/div/div/div/div[1]`
}

function waitElement(selector) {
    return new Promise(resolve => {
        const element = document.querySelector(selector);
        if (element) {
            return resolve(element);
        }

        const observer = new MutationObserver((mutations, obs) => {
            const element = document.querySelector(selector);
            if (element) {
                obs.disconnect();
                resolve(element);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}