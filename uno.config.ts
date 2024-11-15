import { defineConfig } from 'unocss'
import { presetWind, presetIcons } from 'unocss' // presets

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetWind(),

    presetIcons({
      prefix: 'i-', // 设置前缀

      extraProperties: { // 设置额外的css属性
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
})
