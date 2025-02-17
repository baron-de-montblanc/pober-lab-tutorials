async function loadTemplate(id, file, callback) {
    let element = document.getElementById(id);
    if (element) {
        let response = await fetch(file);
        if (response.ok) {
            element.innerHTML = await response.text();
            if (callback) callback(); // Run callback after template loads
        } else {
            console.error(`Error loading ${file}: ${response.statusText}`);
        }
    }
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
    loadTemplate("footer-template", `${basePath}/partials/footer.html`)
    loadTemplate("navbar-template", `${basePath}/partials/navbar-template.html`, initializeNavbarDropdowns);
});


