/* app.js
 *
 * This is our RSS feed reader application. It uses the Google
 * Feed Reader API to grab RSS feeds as JSON object we can make
 * use of. It also uses the Handlebars templating library and
 * jQuery.
 */

// The names and URLs to all of the feeds we'd like available.
const allFeeds = [
    {
        name: 'Udacity Blog',
        url: 'http://blog.udacity.com/feed'
    }, {
        name: 'CSS Tricks',
        url: 'http://feeds.feedburner.com/CssTricks'
    }, {
        name: 'HTML5 Rocks',
        url: 'http://feeds.feedburner.com/html5rocks'
    }, {
        name: 'Linear Digressions',
        url: 'http://feeds.feedburner.com/udacity-linesar-digression'
    }
];

/* This function starts up our application. The Google Feed
 * Reader API is loaded asynchonously and will then call this
 * function when the API is loaded.
 */
init = async () => {
    // Load the first feed we've defined (index of 0).
    await loadFeed(0).catch((error) => console.log(error));
}

/* This function performs everything necessary to load a
 * feed using the Google Feed Reader API. It will then
 * perform all of the DOM operations required to display
 * feed entries on the page. Feeds are referenced by their
 * index position within the allFeeds array.
 * This function all supports a callback as the second parameter
 * which will be called after everything has run successfully.
 */
loadFeed = (id) => {
    const feedUrl = allFeeds[id].url,
        feedName = allFeeds[id].name;

    /* Promise para carregamento do Feed e retorno quando concluído */
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'https://rsstojson.udacity.com/parseFeed',
            data: JSON.stringify({ url: feedUrl }),
            contentType: "application/json",
            success: function (result, status) {

                const container = $('.feed'),
                    title = $('.header-title'),
                    entries = result.feed.entries,
                    entriesLen = entries.length,
                    entryTemplate = Handlebars.compile($('.tpl-entry').html());

                title.html(feedName);   // Set the header text
                container.empty();      // Empty out all previous entries

                /* Loop through the entries we just loaded via the Google
                 * Feed Reader API. We'll then parse that entry against the
                 * entryTemplate (created above using Handlebars) and append
                 * the resulting HTML to the list of entries on the page.
                 */
                entries.forEach((entry) => {
                    container.append(entryTemplate(entry));
                });
                
                resolve();
            },
            error: (result, status, err) => {
                //run only the callback without attempting to parse result due to error
                reject(err);
            },
            dataType: "json"
        });
    });
}

/* Google API: Loads the Feed Reader API and defines what function
 * to call when the Feed Reader API is done loading.
 */
google.setOnLoadCallback(init);

/* All of this functionality is heavily reliant upon the DOM, so we
 * place our code in the $() function to ensure it doesn't execute
 * until the DOM is ready.
 */
(() => {
    const container = $('.feed'),
        feedList = $('.feed-list'),
        feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
        menuIcon = $('.menu-icon-link');

    let feedId = 0

    /* Loop through all of our feeds, assigning an id property to
     * each of the feeds based upon its index within the array.
     * Then parse that feed against the feedItemTemplate (created
     * above using Handlebars) and append it to the list of all
     * available feeds within the menu.
     */
    allFeeds.forEach((feed) => {
        feed.id = feedId;
        feedList.append(feedItemTemplate(feed));

        feedId++;
    });

    /* When a link in our feedList is clicked on, we want to hide
     * the menu, load the feed, and prevent the default action
     * (following the link) from occurring.
     */
    feedList.on('click', 'a', function () {
        var item = $(this);

        $('body').addClass('menu-hidden');
        loadFeed(item.data('id'));
        return false;
    });

    /* When the menu icon is clicked on, we need to toggle a class
     * on the body to perform the hiding/showing of our menu.
     */
    menuIcon.on('click', function () {
        $('body').toggleClass('menu-hidden');
    });
})();