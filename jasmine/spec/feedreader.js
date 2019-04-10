$(function () {
    //A test suite named 'RSS Feeds'.
    describe('RSS Feeds', () => {
        /*
         * A tests that loops through each feed 
         * in the 'allFeeds' object and ensures 
         * it has a URL defined _and_ that the 
         * URL is not empty.
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed 
         * in the 'allFeeds' object and ensures 
         * it has a name defined and that the name 
         * is not empty.
         */

        it('ensures it has a URL', () => {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures 
         * it has a name defined and that the name 
         * is not empty.
         */

        it('ensures it has a name defined', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });

    //A new test suite named 'The menu'.

    describe('The menu', () => {

        //A test that ensures the menu element is hidden by default.

        it('ensures the menu element is hidden by default', () => {
            let body = document.querySelector('body').className;
            expect(body).toContain('menu-hidden');
        });

        /*
         * A test that ensures the menu changes visibility 
         * when the menu icon is clicked. This test have 
         * two expectations: does the menu display itself
         * when clicked, and does it hide when clicked again.
         */

        it('ensures the menu changes visibility when the menu icon is clicked', () => {
            let menuIcon = document.getElementById('menu-icon');
            let body = document.querySelector('body');
            menuIcon.click();
            expect(body.className).not.toContain('menu-hidden');
            menuIcon.click();
            expect(body.className).toContain('menu-hidden');
        });
    });

    // A test suite named 'Initial Entries'.

    describe('Initial Entries', () => {

        // A method beforeEach that load the feed before the test run.

        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });

        /* A test that ensures when the 'loadFeed' function
         * is called and completes its work, there is at least 
         * a single '.entry' element within the '.feed' container.
         */

        it('ensures there is at least a single .entry element within the .feed container', (done) => {
            let feed = document.getElementById('feed').getElementsByClassName('entry-link');
            let entry = feed[0].getElementsByClassName('entry');
            expect(entry[0].className).toContain('entry');
            done();
        });
    });

    //A test suite named 'New Feed Selection'.

    describe('New Feed Selection', () => {
        let feed1, feed2;
        beforeEach((done) => {
            loadFeed(0, () => {
                feed1 = document.getElementById('header-title').innerHTML;
                loadFeed(1, () => {
                    feed2 = document.getElementById('header-title').innerHTML;
                    done();
                });
            });
        });

        /* A test that ensures when a new feed is loaded 
         * by the 'loadFeed' function that the content actually changes.
         */

        it('ensures when a new feed is loaded by the loadFeed function that the content actually changes', (done) => {
            expect(feed1).not.toBe(feed2);
            done();
        })
    });
}());