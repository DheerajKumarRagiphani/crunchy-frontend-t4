// Dheeraj Kumar Ragiphani — Portfolio interactions

const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector(".theme-toggle__icon");
const themeLabel = document.querySelector(".theme-toggle__label");
const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#primary-navigation");

const THEME_STORAGE_KEY = "dheeraj-portfolio-theme";

/**
 * Read the saved theme. If no choice has been saved,
 * use the visitor's operating-system preference.
 */
function getPreferredTheme() {
    try {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }
    } catch (error) {
        // The theme still works when localStorage is unavailable.
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
}

/**
 * Apply the selected theme and update the toggle's accessible label.
 */
function applyTheme(theme, shouldSave = false) {
    root.dataset.theme = theme;

    const isLightTheme = theme === "light";

    themeIcon.textContent = isLightTheme ? "☾" : "☼";
    themeLabel.textContent = isLightTheme ? "Light" : "Dark";
    themeToggle.setAttribute(
        "aria-label",
        isLightTheme ? "Switch to dark theme" : "Switch to light theme"
    );

    if (shouldSave) {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (error) {
            // Theme switching remains available without persistent storage.
        }
    }
}

/**
 * Open or close the mobile navigation menu.
 */
function setMenuOpen(isOpen) {
    navigation.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
}

/**
 * Close the mobile menu after a navigation link is selected.
 */
function handleNavigationClick(event) {
    if (event.target.closest("a")) {
        setMenuOpen(false);
    }
}

/**
 * Close the mobile menu when Escape is pressed.
 */
function handleMenuKeydown(event) {
    if (
        event.key === "Escape" &&
        menuToggle.getAttribute("aria-expanded") === "true"
    ) {
        setMenuOpen(false);
        menuToggle.focus();
    }
}

// Initialise the theme before the visitor interacts with the page.
applyTheme(getPreferredTheme());

themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
});

menuToggle.addEventListener("click", () => {
    const isCurrentlyOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isCurrentlyOpen);
});

navigation.addEventListener("click", handleNavigationClick);
document.addEventListener("keydown", handleMenuKeydown);
