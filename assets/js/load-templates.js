async function loadTemplate(id, file, callback) {
    let element = document.getElementById(id);
    if (element) {
        let basePath = window.location.hostname === "baron-de-montblanc.github.io" ? "/pober-lab-tutorials" : "";
        
        // Prevent duplicate basePath issue
        let fetchPath = file.startsWith("/") ? `${basePath}${file}` : `${basePath}/${file}`;

        console.log(`Fetching: ${fetchPath}`);  // Debugging output

        let response = await fetch(fetchPath);  // ✅ Correct path usage

        if (response.ok) {
            element.innerHTML = await response.text();
            fixTemplateLinks(element, basePath);
            if (callback) callback(); 
        } else {
            console.error(`Error loading ${fetchPath}: ${response.statusText}`);
        }
    }
}


// Function to fix all <a> links inside a dynamically loaded template
function fixTemplateLinks(container, basePath) {
    container.querySelectorAll("a").forEach(link => {
        let href = link.getAttribute("href");

        // If href is relative (does not start with http://, https://, or /), prepend basePath
        if (href && !href.startsWith("http") && !href.startsWith("/") && !href.startsWith("#")) {
            link.setAttribute("href", `${basePath}/${href}`.replace(/\/+/g, "/")); // Avoid double slashes
        }
    });
}

// jQuery-based function to initialize dropdown menus
function initializeNavbarDropdowns() {
    $(document).ready(function () {
        $('.sub-menu ul').hide();

        $(".sub-menu a").click(function (e) {
            let hasSubmenu = $(this).parent(".sub-menu").children("ul").length > 0;

            if (hasSubmenu) {
                e.preventDefault();  // Prevents jumping pages ONLY if there's a submenu
                $(this).parent(".sub-menu").children("ul").slideToggle(100);
                $(this).find(".right").toggleClass("fa-caret-right fa-caret-down");
            }
        });
    });
}

// Load navbar and reapply jQuery event listeners
document.addEventListener("DOMContentLoaded", function () {
    let basePath = window.location.hostname === "baron-de-montblanc.github.io" ? "/pober-lab-tutorials" : "";

    loadTemplate("header-container", `${basePath}/partials/header.html`);
    loadTemplate("footer-template", `${basePath}/partials/footer.html`);
    loadTemplate("navbar-template", `${basePath}/partials/navbar-template.html`, initializeNavbarDropdowns);
});


