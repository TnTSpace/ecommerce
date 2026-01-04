import type { Editor } from "@tiptap/core";
import H1 from "../icons/H1.svelte";
import H2 from "../icons/H2.svelte";
import H3 from "../icons/H3.svelte";
import H4 from "../icons/H4.svelte";
import H5 from "../icons/H5.svelte";
import H6 from "../icons/H6.svelte";
import type { iGroup, iMenu } from "./types.js";
import { onAddColumnAfter, onAddColumnBefore, onAddRowAfter, onAddRowBefore, onBlockquote, onBulletList, onCodeblock, onDeleteColumn, onDeleteRow, onDeleteTable, onHeadingClick, onIframe, onImage, onInsertTable, onLink, onMergeCells, onMergeOrSplit, onOrderedList, onParagraph, onSplitCell, onTextAlign } from "./functions.js";

import ListIcon from 'lucide-svelte/icons/list'
import AlignCenterVerticalIcon from 'lucide-svelte/icons/align-center-vertical'
import AlignRightIcon from 'lucide-svelte/icons/align-right'
import AlignLeftIcon from 'lucide-svelte/icons/align-left'
import AlignCenterIcon from 'lucide-svelte/icons/align-center'
import AlignJustifyIcon from 'lucide-svelte/icons/align-justify'
import CodeIcon from 'lucide-svelte/icons/code'
import TableIcon from 'lucide-svelte/icons/table'
import Grid2x2PlusIcon from 'lucide-svelte/icons/grid-2x2-plus'
import ImageIcon from 'lucide-svelte/icons/image'
import TrashIcon from 'lucide-svelte/icons/trash'
import CombineIcon from 'lucide-svelte/icons/combine'
import YoutubeIcon from 'lucide-svelte/icons/youtube'
import Link2Icon from 'lucide-svelte/icons/link-2'
import NumberedList from "../icons/NumberedList.svelte";
import Text from "../icons/Text.svelte";
import H from "../icons/H.svelte";
import Blockquote from "../icons/Blockquote.svelte";
import AddColumnBefore from "../icons/AddColumnBefore.svelte";
import AddColumnAfter from "../icons/AddColumnAfter.svelte";
import AddRowBefore from "../icons/AddRowBefore.svelte";
import AddRowAfter from "../icons/AddRowAfter.svelte";
import MergeCells from "../icons/MergeCells.svelte";
import SplitCell from "../icons/SplitCell.svelte";

export let headings: iMenu =
{
  name: 'Headings',
  icon: H1,
  onclick: (editor: Editor) => { },
  submenus: {
    trigger: {
      name: 'Headings',
      icon: H,
    },
    menus: [
      {
        name: 'Heading 1',
        icon: H1,
        level: 1,
        onclick: (editor: Editor) => onHeadingClick(1, editor)
      },
      {
        name: 'Heading 2',
        icon: H2,
        level: 2,
        onclick: (editor: Editor) => onHeadingClick(2, editor)
      },
      {
        name: 'Heading 3',
        icon: H3,
        level: 3,
        onclick: (editor: Editor) => onHeadingClick(3, editor)
      },
      {
        name: 'Heading 4',
        icon: H4,
        level: 4,
        onclick: (editor: Editor) => onHeadingClick(4, editor)
      },
      {
        name: 'Heading 5',
        icon: H5,
        level: 5,
        onclick: (editor: Editor) => onHeadingClick(5, editor)
      },
      {
        name: 'Heading 6',
        icon: H6,
        level: 6,
        onclick: (editor: Editor) => onHeadingClick(6, editor)
      }
    ]
  }
}

export let lists: iMenu = {
  name: 'Lists',
  icon: ListIcon,
  onclick: () => { },
  submenus: {
    trigger: {
      name: 'Lists',
      icon: ListIcon,
    },
    menus: [
      {
        name: "Bullet List",
        icon: ListIcon,
        onclick: (editor: Editor) => onBulletList(editor)
      },
      {
        name: "Numbered List",
        icon: NumberedList,
        onclick: (editor: Editor) => onOrderedList(editor)
      }
    ]
  }
}

export const alignment: iMenu =  {
  name: 'Alignment',
  icon: AlignCenterVerticalIcon,
  onclick: () => { },
  submenus: {
    trigger: {
      name: 'Alignment',
      icon: AlignCenterVerticalIcon
    },
    menus: [
      {
        name: 'Align Left',
        icon: AlignLeftIcon,
        onclick: (editor: Editor) => onTextAlign(editor, 'left')
      },
      {
        name: 'Align Center',
        icon: AlignCenterIcon,
        onclick: (editor: Editor) => onTextAlign(editor, 'center')
      },
      {
        name: 'Align Right',
        icon: AlignRightIcon,
        onclick: (editor: Editor) => onTextAlign(editor, 'right')
      },
      {
        name: 'Justify',
        icon: AlignJustifyIcon,
        onclick: (editor: Editor) => onTextAlign(editor, 'justify')
      }
    ]
  }
}

export let groups: iGroup[] = [
  {
    groupName: 'format',
    menus: [
      {
        name: 'Paragraph',
        icon: Text,
        onclick: (editor: Editor) => onParagraph(editor)
      },
      {
        name: 'Headings',
        icon: H1,
        onclick: (editor: Editor) => { },
        submenus: {
          trigger: {
            name: 'Headings',
            icon: H,
          },
          menus: [
            {
              name: 'Heading 1',
              icon: H1,
              level: 1,
              onclick: (editor: Editor) => onHeadingClick(1, editor)
            },
            {
              name: 'Heading 2',
              icon: H2,
              level: 2,
              onclick: (editor: Editor) => onHeadingClick(2, editor)
            },
            {
              name: 'Heading 3',
              icon: H3,
              level: 3,
              onclick: (editor: Editor) => onHeadingClick(3, editor)
            },
            {
              name: 'Heading 4',
              icon: H4,
              level: 4,
              onclick: (editor: Editor) => onHeadingClick(4, editor)
            },
            {
              name: 'Heading 5',
              icon: H5,
              level: 5,
              onclick: (editor: Editor) => onHeadingClick(5, editor)
            },
            {
              name: 'Heading 6',
              icon: H6,
              level: 6,
              onclick: (editor: Editor) => onHeadingClick(6, editor)
            }
          ]
        }
      },
      {
        name: 'Lists',
        icon: ListIcon,
        onclick: () => { },
        submenus: {
          trigger: {
            name: 'Lists',
            icon: ListIcon,
          },
          menus: [
            {
              name: "Bullet List",
              icon: ListIcon,
              onclick: (editor: Editor) => onBulletList(editor)
            },
            {
              name: "Numbered List",
              icon: NumberedList,
              onclick: (editor: Editor) => onOrderedList(editor)
            }
          ]
        }
      },
      {
        name: 'Align Text',
        icon: AlignCenterVerticalIcon,
        onclick: () => { },
        submenus: {
          trigger: {
            name: 'Align Text',
            icon: AlignCenterVerticalIcon
          },
          menus: [
            {
              name: 'Align Left',
              icon: AlignLeftIcon,
              onclick: (editor: Editor) => onTextAlign(editor, 'left')
            },
            {
              name: 'Align Center',
              icon: AlignCenterIcon,
              onclick: (editor: Editor) => onTextAlign(editor, 'center')
            },
            {
              name: 'Align Right',
              icon: AlignRightIcon,
              onclick: (editor: Editor) => onTextAlign(editor, 'right')
            },
            {
              name: 'Justify',
              icon: AlignJustifyIcon,
              onclick: (editor: Editor) => onTextAlign(editor, 'justify')
            }
          ]
        }
      },
      {
        name: "Blockquote",
        icon: Blockquote,
        onclick: (editor: Editor) => onBlockquote(editor)
      },
      {
        name: "Code",
        icon: CodeIcon,
        onclick: (editor: Editor) => onCodeblock(editor)
      },
    ]
  },
  {
    groupName: 'insert',
    menus: [
      // {
      //   name: 'Image',
      //   icon: ImageIcon,
      //   // onclick: (editor: Editor) => onImage(editor)
      //   onclick: (editor: Editor) => {}
      // },
      {
        name: 'Table',
        icon: TableIcon,
        onclick: (editor: Editor) => { },
        submenus: {
          trigger: {
            name: 'Table',
            icon: TableIcon
          },
          menus: [
            {
              name: "Insert Table (3x3)",
              icon: Grid2x2PlusIcon,
              onclick: (editor: Editor) => onInsertTable(editor)
            },
            {
              name: "Add Column Before",
              icon: AddColumnBefore,
              onclick: (editor: Editor) => onAddColumnBefore(editor),
              ondisable: (editor: Editor) => !editor.can().addColumnBefore()
            },
            {
              name: "Add Column After",
              icon: AddColumnAfter,
              onclick: (editor: Editor) => onAddColumnAfter(editor),
              ondisable: (editor: Editor) => !editor.can().addColumnAfter()
            },
            {
              name: "Delete Column",
              icon: TrashIcon,
              onclick: (editor: Editor) => onDeleteColumn(editor),
              ondisable: (editor: Editor) => !editor.can().deleteColumn()
            },
            {
              name: "Add Row Before",
              icon: AddRowBefore,
              onclick: (editor: Editor) => onAddRowBefore(editor),
              ondisable: (editor: Editor) => !editor.can().addRowBefore()
            },
            {
              name: "Add Row After",
              icon: AddRowAfter,
              onclick: (editor: Editor) => onAddRowAfter(editor),
              ondisable: (editor: Editor) => !editor.can().addRowAfter()
            },
            {
              name: "Delete Row",
              icon: TrashIcon,
              onclick: (editor: Editor) => onDeleteRow(editor),
              ondisable: (editor: Editor) => !editor.can().deleteRow()
            },
            {
              name: "Merge Cells",
              icon: MergeCells,
              onclick: (editor: Editor) => onMergeCells(editor),
              ondisable: (editor: Editor) => !editor.can().mergeCells()
            },
            {
              name: "Split Cells",
              icon: SplitCell,
              onclick: (editor: Editor) => onSplitCell(editor),
              ondisable: (editor: Editor) => !editor.can().splitCell()
            },
            {
              name: "Merge or Split",
              icon: CombineIcon,
              onclick: (editor: Editor) => onMergeOrSplit(editor),
              ondisable: (editor: Editor) => !editor.can().mergeOrSplit()
            },
            {
              name: "Delete Table",
              icon: TrashIcon,
              onclick: (editor: Editor) => onDeleteTable(editor),
              ondisable: (editor: Editor) => !editor.can().deleteTable()
            }
          ]
        }
      },
      // {
      //   name: 'Iframe',
      //   icon: YoutubeIcon,
      //   // onclick: (editor: Editor) => onIframe(editor)
      //   onclick: (editor: Editor) => {}
      // },
      {
        name: "Link",
        icon: Link2Icon,
        onclick: (editor: Editor) => onLink(editor)
      }
    ]
  }
];