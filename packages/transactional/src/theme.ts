import type { TailwindConfig } from "react-email";

export const emailTheme: TailwindConfig = {
    theme: {
        extend: {
            colors: {
                background: "#faf6f0",       // --background
                foreground: "#3d1d11",       // --foreground
                primary: "#bc7c6c",          // --primary (Bakery Rose)
                "primary-foreground": "#faf6f0",
                secondary: "#e3d5ca",        // --secondary (Sand)
                "secondary-foreground": "#3d1d11",
                muted: "#e3d5ca",
                "muted-foreground": "#8c766c", // --muted-foreground (Cocoa Shadow)
                accent: "#d49a6a",           // --accent (Caramel)
                "accent-foreground": "#3d1d11",
                border: "#e0d8d0",
            },
            fontFamily: {
                sans: ["Arial", "Helvetica", "sans-serif"],
                heading: ["Georgia", "serif"],
                signature: ["Great Vibes", "cursive"],
            },
        },
    },
};