import type { Config, } from "tailwindcss";

function flattenColorPalette(colors: object) {
  let result: Record<string, string> = {}

  for (let [root, children] of Object.entries(colors ?? {})) {
    if (root === '__CSS_VALUES__') continue
    if (typeof children === 'object' && children !== null) {
      for (let [parent, value] of Object.entries(flattenColorPalette(children))) {
        result[`${root}${parent === 'DEFAULT' ? '' : `-${parent}`}`] = value
      }
    } else {
      result[root] = children
    }
  }

  return result
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    {
      handler: ({ addUtilities, matchUtilities, theme }) => {
        

        addUtilities(
          {
            ".rounded-scrollbar": {
              "&::-webkit-scrollbar": {
                width: "12px",
                height: "12px"
              },

              "&::-webkit-scrollbar-thumb": {
                borderRadius: "6px",
              },
            }
          }
        )

        matchUtilities(
          {
            "rounded-scrollbar-thumb": (value) => {
              return {
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: value,
                },
              }
            },
          }, 
          {
            values: flattenColorPalette(theme('colors'))
          }
        )

        // console.log(flattenColorPalette(theme('colors')))

        matchUtilities(
          {
            "rounded-scrollbar-track": (value) => ({
              "&::-webkit-scrollbar-thumb": {
                border: `3px solid ${value}`
              },

              "&::-webkit-scrollbar-track": {
                backgroundColor: value
              }
            })
          }, 
          {
            values: flattenColorPalette(theme('colors'))
          }
        )
      }
    }, 
  ],
  darkMode: 'selector'
};


export default config;
