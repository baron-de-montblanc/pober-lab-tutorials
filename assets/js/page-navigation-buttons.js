const observer = new MutationObserver(() => {
    const footer = document.getElementById("footer");
    if (footer) {
        // console.log("✅ Footer detected, running script...");
        observer.disconnect(); // Stop observing once footer is found
        addNavigationButtons(footer);
    }
});

// Start observing the entire body for changes (to detect dynamically loaded footer)
observer.observe(document.body, { childList: true, subtree: true });

function addNavigationButtons(footer) {
    let basePath = window.location.hostname === "baron-de-montblanc.github.io" ? "/pober-lab-tutorials" : "";

    // Define ordered list of pages
    const pageList = [
        `${basePath}/index.html`,
        `${basePath}/pages/asvo1-create-account.html`,
        `${basePath}/pages/asvo2-select-process.html`,
        `${basePath}/pages/asvo3-giant-squid.html`,
        `${basePath}/pages/page1-idl-setup.html`,
        `${basePath}/pages/page2-fhd-deps.html`,
        `${basePath}/pages/page3-dep-link-test.html`,
        `${basePath}/pages/page4-summary.html`,
        `${basePath}/pages/page5-examples.html`,
        `${basePath}/pages/hyperdrive1-installation.html`,
        `${basePath}/pages/hyperdrive2-gpu-acceleration.html`,
        `${basePath}/pages/hyperdrive3-usage.html`,
        `${basePath}/pages/pyuvdata1-waterfall.html`,
        `${basePath}/pages/wsclean1-oscar.html`,
        `${basePath}/pages/wsclean2-usage.html`,
    ];

    // Get current page filename, default to "index.html"
    const currentPage = !window.location.pathname || window.location.pathname === `${basePath}/`
    ? `${basePath}/index.html` 
    : window.location.pathname;

    console.log(currentPage);

    // Find current page index
    const currentIndex = pageList.indexOf(currentPage);
    if (currentIndex === -1) {
        console.log("❌ Page not found in pageList:", currentPage);
        return;
    }

    // Determine previous & next pages
    const prevPage = currentIndex > 0 ? pageList[currentIndex - 1] : null;
    const nextPage = currentIndex < pageList.length - 1 ? pageList[currentIndex + 1] : null;

    // console.log("⬅️ Previous Page:", prevPage);
    // console.log("➡️ Next Page:", nextPage);

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


