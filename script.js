try {
    const observer = new MutationObserver(() => {
        const talkListBar = document.evaluate('/html/body/div[1]/div/div/div[3]/div/div[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        const searchBar = document.evaluate('/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        const filter = document.evaluate('/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        const header = document.evaluate('/html/body/div[1]/div/div/div[3]/div/div[3]/header', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        const appMessage = document.evaluate('/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[4]/div/div/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        const chat = document.evaluate('/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[3]/div[1]/div/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        var chatList;

        if (searchBar)
            searchBar.style.display = 'none';
        if (filter)
            filter.style.display = 'none';
        if (header)
            header.style.display = 'none';
        if (talkListBar)
            talkListBar.style.maxWidth = '90px';
        if (appMessage)
            appMessage.style.display = 'none';

        if (chat) {
            chatList = chat.children;

            for (var row = 1; row <= chatList.length; row++) {
                const alert = document.evaluate(`/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[3]/div[1]/div/div/div[${row}]/div/div/div/div[2]/div[2]/div[2]/span[1]/div/span`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                var hasMessage = !isNaN(alert?.innerText || alert?.textContent);

                const squareMessage = document.evaluate(`/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[3]/div[1]/div/div/div[${row}]/div/div/div/div[1]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                if (hasMessage)
                    squareMessage.style.backgroundColor = '#075e54';

                if (!hasMessage)
                    squareMessage.style.removeProperty('background-color');
            }
        }

    });

    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(document.body, config);
} catch (error) {
    alert(error)
}