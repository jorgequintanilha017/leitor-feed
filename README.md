# Project Overview

This is a Udacity project that have the goal of use a series of tests using the framework [Jasmine](https://jasmine.github.io/).

## Why this Project?

Testing is an important part of the development process and many organizations practice a standard of development known as "test-driven development." This is when developers write tests first, before they ever start developing their application. All the tests initially fail and then they start writing application code to make these tests pass.

# Here are the suites and tests that was made in this project

1. A tests that loops through each feed in the `allFeeds` object and ensures it has a URL defined _and_ that the URL is not empty.

2. A test that loops through each feed in the `allFeeds` object and ensures it has a name defined and that the name is not empty.

3. A new test suite named `"The menu"`.

4. A test that ensures the menu element is hidden by default.

5. A test that ensures the menu changes visibility when the menu icon is clicked. This test have two expectations: does the menu display itself when clicked, and does it hide when clicked again.

6. A test suite named `"Initial Entries"`.

7. A test that ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.

8. A test suite named `"New Feed Selection"`.

9. A test that ensures when a new feed is loaded by the `loadFeed` function that the content actually changes.

# How to set up this project

This project doesn't use compilation tools, so you just need to clone or download this project and open the 'index.html' file, after this the project must run.

git clone https://github.com/jorgequintanilha017/leitor-feed