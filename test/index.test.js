/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

// Load the HTML file into jsdom
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");

// TODO: These need to be removed. Jsdom creates its on `document` that jsdom provides. This is overridding the
//       global variable
// let dom;
// let document;

beforeAll(() => {
    document.body.innerHTML = html;

    // Load and run the script once
    require("../index.js");

    // Fire DOMContentLoaded once so the event listener gets attached
    document.dispatchEvent(new Event("DOMContentLoaded"));
})

beforeEach(() => {
    // Clear list for each test
    document.getElementById("item-list").innerHTML = "";
});

describe("Add Item Button", () => {
    test("adds a new item to the list when the button is clicked", () => {
        // grab add item button and list where items are displayed
        const button = document.getElementById("add-item");
        const list = document.getElementById("item-list");

        // check the list is initially empty
        expect(list.children.length).toBe(0);

        // Simulate a button click
        button.click();

        // Get all the <li> elements in the list and verify the count and text
        expect(list.children.length).toBe(1);
        expect(list.children[0].textContent).toBe("New Item");
    });
});