/*****
feedreader.js

This file is a spec using Jasmine that tests /js/app.js
to ensure that it is completely functional.

The code in this file is written by Isabeau Kisler,
while the other documents are written and provided by Udacity.

10/15
*****/

// Make sure the DOM is ready before doing any testing
$(function() {
    // RSS feeds, which are connected to the allFeeds variable in app.js
    describe('RSS Feeds', function() {
        // Ensure that the allFeeds variable has been defined and not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Ensure that each feed has a url and that it is not empty.
         it('has a URL that is defined and not empty', function() {
            for(var i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
         });

        // Ensure that each feed has a name and is not empty.
        it('has a name that is defined and not empty', function() {
            for(var i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    // The menu
    describe('The menu', function() {
        // Ensure that the body element starts out with the menu-hidden class attached to it.
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Ensure that the menu is shown and hidden appropriately when the menu-icon-link is clicked.
        it('displays when clicked, and hides when clicked again', function() {
            // Click to open the menu, and check to see if the body element does NOT have the menu-hidden class
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // Click to close the menu, and check to see if the body element has the menu-hidden class
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    // Initial entries
    describe('Initial Entries', function() {
        // Ensure that, when the feeds are loaded through the loadFeed function, that there are entries.
        // loadFeed is async
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should have at least one entry', function(done) {
            expect($('.feed').find('.entry').length).not.toBe(0);
            done();
        });

    });

    // New feed selection
    describe('New Feed Selection', function() {
        // Ensure that a new feed is loaded by checking to see if the content changes between feeds.

        // Create variables to hold the entry content
        var initialEntries,
        nextEntries;

        // Before each function, run the next loadFeed iteration, and store those entries in the nextEntries variable.
        beforeEach(function(done) {
            loadFeed(1, function(){
                nextEntries = $('.feed .entry h2').html();
                done();
            });
        });

        // Run the initial loadFeed, store it in the initialEntries variable, and check to see if its entries are equal to the nextEntries.
        it('should have changing content', function(done) {
            loadFeed(0, function(){
                initialEntries = $('.feed .entry h2').html();
                console.log(initialEntries);
                expect(nextEntries).not.toEqual(initialEntries);
                done();
            });
        });
    });
}());
