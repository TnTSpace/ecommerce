import type { Editor } from "@tiptap/core";
import type { Level } from "./types.js";

export const onParagraph = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().setParagraph().run()
  }
}

export const onHeadingClick = (level: Level, editor: Editor) => {
  if (editor) {
    editor.chain().focus().toggleHeading({ level }).run();
  }
};

export const onImage = (editor: Editor, url: string) => {

  if (url) {
    editor.chain().focus().setImage({ src: url }).run();
  }
};

export const onIframe = (editor: Editor, url: string) => {
  if (url) {
    editor.chain().focus().setIframe({ src: url }).run()
  }
}

export const onLink = (editor: Editor) => {
  const previousUrl = editor.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink()
      .run()

    return
  }

  // update link
  editor.chain().focus().extendMarkRange('link').setLink({ href: url })
    .run()
}

export const onBulletList = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().toggleBulletList().run()
  }
}

export const onOrderedList = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().toggleOrderedList().run()
  }
}


export const onBold = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().toggleBold().run();
  }
};

export const onItalic = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().toggleItalic().run();
  }
};

export const onStrikeThrough = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().toggleStrike().run();
  }
};

export const onUnderline = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().toggleUnderline().run()
  }
};

export const onTextAlign = (editor: Editor, align: 'left' | 'center' | 'right' | 'justify') => {
  if (editor) {
    editor.chain().focus().setTextAlign(align).run()
  }
}

export const onBlockquote = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().toggleBlockquote().run()
  }
}

export const onCodeblock = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().toggleCodeBlock().run()
  }
}

export const onInsertTable = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }
}

export const onAddColumnBefore = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().addColumnBefore().run()
  }
}

export const onAddColumnAfter = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().addColumnAfter().run()
  }
}

export const onDeleteColumn = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().deleteColumn().run()
  }
}

export const onAddRowBefore = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().addRowBefore().run()
  }
}

export const onAddRowAfter = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().addRowAfter().run()
  }
}

export const onDeleteRow = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().deleteRow().run()
  }
}

export const onDeleteTable = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().deleteTable().run()
  }
}

export const onMergeCells = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().mergeCells().run()
  }
}

export const onSplitCell = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().splitCell().run()
  }
}

export const onToggleHeaderColumn = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().toggleHeaderColumn().run()
  }
}

export const onToggleHeaderRow = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().toggleHeaderRow().run()
  }
}

export const onToggleHeaderCell = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().toggleHeaderCell().run()
  }
}

export const onMergeOrSplit = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().mergeOrSplit().run()
  }
}

export const onSetCellAttribute = (editor: Editor, attrib: { attribute: string, value: string }) => {
  if (editor) {
    const { attribute, value } = attrib
    editor.chain().focus().setCellAttribute(attribute, value).run()
  }
}

export const onFixTables = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().fixTables().run()
  }
}

export const onGoToNextCell = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().goToNextCell().run()
  }
}

export const onGoToPreviousCell = (editor: Editor) => {
  if (editor) {
    editor.chain().focus().goToPreviousCell().run()
  }
}