import type { BytemdPlugin, BytemdEditorContext, BytemdAction } from 'bytemd'
import { IMAGE_ZOOM } from './icons'
import en from '../locales/en.json'

export interface ImageZoomPluginOptions {
  locale?: Record<string, string>
}

/**
 * Image Zoom Plugin
 */
export default function imageZoomPlugin(options?: ImageZoomPluginOptions): BytemdPlugin {
  const locale = { ...en, ...options?.locale } as typeof en

  const actionFactory = (percent: number): BytemdAction => ({
    title: `${percent}%`,
    handler: {
      type: 'action',
      click: (ctx: BytemdEditorContext) => {
        ctx.editor.focus()

        const cursor = ctx.editor.getCursor()

        const imgTag = `<img src="" alt="" width="${percent}%"/>`

        ctx.editor.replaceSelection(imgTag)

        const newPos = { line: cursor.line, ch: cursor.ch + imgTag.length }
        ctx.editor.setCursor(newPos)
      }
    }
  })

  return {
    actions: [
      {
        title: locale.imageZoom,
        icon: IMAGE_ZOOM,
        handler: {
          type: 'dropdown',
          actions: [
            actionFactory(30),
            actionFactory(40),
            actionFactory(50),
            actionFactory(60),
            actionFactory(70),
            actionFactory(80),
            actionFactory(90),
            actionFactory(100),
          ]
        }
      }
    ]
  }
}
