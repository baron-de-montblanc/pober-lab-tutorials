const observer = new MutationObserver(() => {
    const footer = document.getElementById("footer");
    if (footer) {
        console.log("✅ Footer detected, running script...");
        observer.disconnect(); // Stop observing once footer is found
        addNavigationButtons(footer);
    }
});

// Start observing the entire body for changes (to detect dynamically loaded footer)
observer.observe(document.body, { childList: true, subtree: true });

function addNavigationButtons(footer) {
    // Define ordered list of pages
    const pageList = [
        "index.html",
        "page1-idl-setup.html",
        "page2-fhd-deps.html",
        "page3-dep-link-test.html",
        "page4-summary.html",
        "page5-examples.html",
        "wsclean1-oscar.html",
        "wsclean2-usage.html",
    ];

    // Get current page filename, default to "index.html"
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    // Find current page index
    const currentIndex = pageList.indexOf(currentPage);
    if (currentIndex === -1) {
        console.log("❌ Page not found in pageList:", currentPage);
        return;
    }

    // Determine previous & next pages
    const prevPage = currentIndex > 0 ? pageList[currentIndex - 1] : null;
    const nextPage = currentIndex < pageList.length - 1 ? pageList[currentIndex + 1] : null;

    console.log("⬅️ Previous Page:", prevPage);
    console.log("➡️ Next Page:", nextPage);

    // Create navigation container
    const navContainer = document.createElement("div");
    navContainer.classList.add("container", "d-flex", "justify-content-between", "py-2");

    // Create Previous Button (Active or Inactive)
    const prevButton = document.createElement("a");
    prevButton.classList.add("btn", "btn-light");
    prevButton.innerHTML = "&larr; Previous";

    if (prevPage) {
        prevButton.href = prevPage;
    } else {
        prevButton.classList.add("disabled"); // Inactive state
        prevButton.setAttribute("aria-disabled", "true");
    }

    navContainer.appendChild(prevButton);

    // Create Next Button (Active or Inactive)
    const nextButton = document.createElement("a");
    nextButton.classList.add("btn", "btn-light");
    nextButton.innerHTML = "Next &rarr;";

    if (nextPage) {
        nextButton.href = nextPage;
    } else {
        nextButton.classList.add("disabled"); // Inactive state
        nextButton.setAttribute("aria-disabled", "true");
    }

    navContainer.appendChild(nextButton);

    // Append navigation container to footer
    footer.appendChild(navContainer);
}


