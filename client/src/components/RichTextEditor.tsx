import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
  Minus,
  Palette,
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none",
        "data-placeholder": placeholder || "Start writing your newsletter...",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const setColor = useCallback(() => {
    if (!editor) return;
    const color = window.prompt("Color (hex)", "#68B0AB");
    if (color) {
      editor.chain().focus().setColor(color).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-md bg-card">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/30">
        <Button
          size="icon"
          variant={editor.isActive("bold") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          data-testid="button-bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("italic") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          data-testid="button-italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("underline") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          data-testid="button-underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("strike") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          data-testid="button-strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <div className="w-px bg-border mx-1" />

        <Button
          size="icon"
          variant={editor.isActive("heading", { level: 1 }) ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          data-testid="button-heading-1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          data-testid="button-heading-2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("heading", { level: 3 }) ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          data-testid="button-heading-3"
        >
          <Heading3 className="h-4 w-4" />
        </Button>

        <div className="w-px bg-border mx-1" />

        <Button
          size="icon"
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          data-testid="button-bullet-list"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("orderedList") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          data-testid="button-ordered-list"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("blockquote") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          data-testid="button-blockquote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          data-testid="button-horizontal-rule"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <div className="w-px bg-border mx-1" />

        <Button
          size="icon"
          variant={editor.isActive({ textAlign: "left" }) ? "default" : "ghost"}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          data-testid="button-align-left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive({ textAlign: "center" }) ? "default" : "ghost"}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          data-testid="button-align-center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive({ textAlign: "right" }) ? "default" : "ghost"}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          data-testid="button-align-right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        <div className="w-px bg-border mx-1" />

        <Button
          size="icon"
          variant={editor.isActive("link") ? "default" : "ghost"}
          onClick={setLink}
          data-testid="button-link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={setColor}
          data-testid="button-color"
        >
          <Palette className="h-4 w-4" />
        </Button>

        <div className="w-px bg-border mx-1" />

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          data-testid="button-undo"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          data-testid="button-redo"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
