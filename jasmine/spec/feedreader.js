/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have valid URLs', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length > 0).toBe(true);
            });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have valid names', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length > 0).toBe(true);
            });
        });
    });

    /* A new test suite named "The menu" */
    describe('The menu', function () {
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function () {
            const bodyElement = document.getElementsByTagName('body')[0];
            expect(bodyElement.classList.contains('menu-hidden')).toBe(true);
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked', function () {
            const bodyElement = document.getElementsByTagName('body')[0];
            expect(bodyElement.classList.contains('menu-hidden')).toBe(true);

            const menuIconLinkElement = document.getElementsByClassName('menu-icon-link')[0];

            menuIconLinkElement.click();
            expect(bodyElement.classList.contains('menu-hidden')).toBe(false);

            menuIconLinkElement.click();
            expect(bodyElement.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        const feedElement = document.getElementsByClassName('feed')[0];

        beforeEach(function (done) {
            expect(feedElement.getElementsByClassName('entry').length === 0).toBe(true);
            loadFeed(0, function () {
                done();
            });
        });

        it('have at least one feed entry', function () {
            expect(feedElement.getElementsByClassName('entry').length > 0).toBe(true);
        });
    });

    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         * We will load the first feed, examine the 'header-title' element,
         * record the first feed entries InnerText, load the third feed, examine the 
         * 'header-title' element, and compare the InnerText of the first feed entry
         * with that from the first feed loaded.
         */
        const headerTitleElement = document.getElementsByClassName('header-title')[0];
        const feedElement = document.getElementsByClassName('feed')[0];
        let firstFeedEntryInnerText;

        beforeEach(function (done) {
            loadFeed(0, function () {
                expect(headerTitleElement.textContent === allFeeds[0].name).toBe(true);
                expect(headerTitleElement.textContent === allFeeds[2].name).toBe(false);
                firstFeedEntryInnerText = feedElement.firstElementChild.innerText
                expect(firstFeedEntryInnerText.length > 0).toBe(true);

                loadFeed(2, function () {
                    done();
                });
            });
        });

        it('changes content', function () {
            expect(headerTitleElement.textContent === allFeeds[2].name).toBe(true);
            const firstFeedEntryInnerTextAfterNewFeedSelection = feedElement.firstElementChild.innerText;
            expect(firstFeedEntryInnerTextAfterNewFeedSelection.length > 0).toBe(true);
            expect(firstFeedEntryInnerText === firstFeedEntryInnerTextAfterNewFeedSelection).toBe(false);
        });
    });
}());