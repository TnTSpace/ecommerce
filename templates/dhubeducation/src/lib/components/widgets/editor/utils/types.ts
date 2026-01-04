import type { Editor } from "@tiptap/core";

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface iMenu {
  name: string;
  icon: any;
  level?: Level;
  ondisable?: (editor: Editor) => boolean;
  onclick: (editor: Editor) => void;
  submenus?: iSubmenu;
}

export interface iSubmenu {
  trigger: {
    name: string;
    icon: any;
  };
  menus: iMenu[];
}

export interface iGroup {
  groupName: 'format' | 'insert';
  menus: iMenu[];
}

export interface iMedia {
  secure_url: string;
  public_id: string;
  type: string;
  resource_type: "image"
}