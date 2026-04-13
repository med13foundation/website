import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { useEffect, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  AlignJustify,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
  Minus,
  Palette,
  Highlighter,
  ImageIcon,
  TableIcon,
  Plus,
  Trash2,
  Type,
  RemoveFormatting,
  Columns2,
  Rows2,
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const PRESET_COLORS = [
  "#000000", "#374151", "#6B7280", "#9CA3AF",
  "#DC2626", "#EA580C", "#D97706", "#CA8A04",
  "#16A34A", "#059669", "#0D9488", "#0891B2",
  "#2563EB", "#4F46E5", "#7C3AED", "#9333EA",
  "#DB2777", "#E11D48", "#68B0AB", "#4A7C59",
];

const HIGHLIGHT_COLORS = [
  "#FEF08A", "#FECACA", "#BBF7D0", "#BFDBFE",
  "#E9D5FF", "#FBCFE8", "#FED7AA", "#D1FAE5",
];

function ToolbarDivider() {
  return <div className="w-px bg-border mx-0.5 h-6 self-center" />;
}

function ColorPickerPopover({
  colors,
  currentColor,
  onSelect,
  onCustom,
  icon: Icon,
  label,
  testId,
}: {
  colors: string[];
  currentColor?: string;
  onSelect: (color: string) => void;
  onCustom?: (color: string) => void;
  icon: typeof Palette;
  label: string;
  testId: string;
}) {
  const [custom, setCustom] = useState("");
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" data-testid={testId} title={label}>
          <Icon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-3" align="start">
        <p className="text-xs font-medium text-muted-foreground mb-2">{label}</p>
        <div className="grid grid-cols-5 gap-1.5 mb-3">
          {colors.map((c) => (
            <button
              key={c}
              className="w-7 h-7 rounded-md border border-border transition-transform"
              style={{
                backgroundColor: c,
                outline: currentColor === c ? "2px solid hsl(var(--primary))" : "none",
                outlineOffset: "1px",
              }}
              onClick={() => onSelect(c)}
              data-testid={`color-swatch-${c.replace("#", "")}`}
            />
          ))}
        </div>
        <div className="flex gap-1.5">
          <Input
            placeholder="#hex"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="h-8 text-xs"
            data-testid={`input-custom-${testId}`}
          />
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-2 text-xs"
            onClick={() => {
              if (custom) {
                (onCustom || onSelect)(custom);
                setCustom("");
              }
            }}
            data-testid={`button-apply-${testId}`}
          >
            OK
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function TableMenu({ editor }: { editor: any }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" data-testid="button-table-menu" title="Table">
          <TableIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="start">
        <div className="space-y-1">
          {!editor.isActive("table") ? (
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
              data-testid="button-insert-table"
            >
              <Plus className="w-3 h-3 mr-2" />
              Insert 3×3 Table
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                data-testid="button-add-column"
              >
                <Columns2 className="w-3 h-3 mr-2" />
                Add Column
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => editor.chain().focus().addRowAfter().run()}
                data-testid="button-add-row"
              >
                <Rows2 className="w-3 h-3 mr-2" />
                Add Row
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => editor.chain().focus().deleteColumn().run()}
                data-testid="button-delete-column"
              >
                <Columns2 className="w-3 h-3 mr-2" />
                Delete Column
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => editor.chain().focus().deleteRow().run()}
                data-testid="button-delete-row"
              >
                <Rows2 className="w-3 h-3 mr-2" />
                Delete Row
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs text-destructive"
                onClick={() => editor.chain().focus().deleteTable().run()}
                data-testid="button-delete-table"
              >
                <Trash2 className="w-3 h-3 mr-2" />
                Delete Table
              </Button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function FontSizeMenu({ editor }: { editor: any }) {
  const sizes = [
    { label: "Small", value: "0.875em" },
    { label: "Normal", value: "" },
    { label: "Large", value: "1.25em" },
    { label: "X-Large", value: "1.5em" },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" data-testid="button-font-size" title="Font size">
          <Type className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-36 p-2" align="start">
        {sizes.map((s) => (
          <Button
            key={s.label}
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs"
            style={{ fontSize: s.value || undefined }}
            onClick={() => {
              if (s.value) {
                editor.chain().focus().setMark("textStyle", { fontSize: s.value }).run();
              } else {
                editor.chain().focus().unsetMark("textStyle").run();
              }
            }}
            data-testid={`button-font-size-${s.label.toLowerCase()}`}
          >
            {s.label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

const FontSize = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.fontSize || null,
        renderHTML: (attributes: Record<string, any>) => {
          if (!attributes.fontSize) return {};
          return { style: `font-size: ${attributes.fontSize}` };
        },
      },
    };
  },
});

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-primary underline" } }),
      FontSize,
      Color,
      Highlight.configure({ multicolor: true }),
      Image.configure({ inline: false, allowBase64: true }),
      Table.configure({ resizable: false }),
      TableRow,
      TableCell,
      TableHeader,
      Placeholder.configure({ placeholder: placeholder || "Start writing your newsletter..." }),
      CharacterCount,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "newsletter-content prose prose-sm sm:prose max-w-none min-h-[400px] p-4 focus:outline-none",
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

  const insertImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const insertCallToAction = useCallback(() => {
    if (!editor) return;
    const text = window.prompt("Button text", "Learn More");
    if (!text) return;
    const url = window.prompt("Button link URL", "https://");
    if (!url) return;
    const buttonHtml = `<p style="text-align: center; margin: 24px 0;"><a href="${url}" style="display: inline-block; padding: 12px 32px; background-color: #68B0AB; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">${text}</a></p>`;
    editor.chain().focus().insertContent(buttonHtml).run();
  }, [editor]);

  if (!editor) return null;

  const chars = editor.storage.characterCount.characters();
  const words = editor.storage.characterCount.words();

  return (
    <div className="border rounded-md bg-card">
      <div className="flex flex-wrap gap-0.5 p-2 border-b bg-muted/30">
        <Button
          size="icon"
          variant={editor.isActive("bold") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          data-testid="button-bold"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("italic") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          data-testid="button-italic"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("underline") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          data-testid="button-underline"
          title="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("strike") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          data-testid="button-strikethrough"
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <ToolbarDivider />

        <Button
          size="icon"
          variant={editor.isActive("heading", { level: 1 }) ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          data-testid="button-heading-1"
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          data-testid="button-heading-2"
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("heading", { level: 3 }) ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          data-testid="button-heading-3"
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <FontSizeMenu editor={editor} />

        <ToolbarDivider />

        <Button
          size="icon"
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          data-testid="button-bullet-list"
          title="Bullet list"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("orderedList") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          data-testid="button-ordered-list"
          title="Numbered list"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("blockquote") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          data-testid="button-blockquote"
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          data-testid="button-horizontal-rule"
          title="Horizontal rule"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <ToolbarDivider />

        <Button
          size="icon"
          variant={editor.isActive({ textAlign: "left" }) ? "default" : "ghost"}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          data-testid="button-align-left"
          title="Align left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive({ textAlign: "center" }) ? "default" : "ghost"}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          data-testid="button-align-center"
          title="Align center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive({ textAlign: "right" }) ? "default" : "ghost"}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          data-testid="button-align-right"
          title="Align right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive({ textAlign: "justify" }) ? "default" : "ghost"}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          data-testid="button-align-justify"
          title="Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </Button>

        <ToolbarDivider />

        <Button
          size="icon"
          variant={editor.isActive("link") ? "default" : "ghost"}
          onClick={setLink}
          data-testid="button-link"
          title="Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={insertImage}
          data-testid="button-image"
          title="Insert image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <TableMenu editor={editor} />
        <Button
          size="icon"
          variant="ghost"
          onClick={insertCallToAction}
          data-testid="button-cta"
          title="Insert call-to-action button"
        >
          <span className="text-xs font-bold">CTA</span>
        </Button>

        <ToolbarDivider />

        <ColorPickerPopover
          colors={PRESET_COLORS}
          currentColor={editor.getAttributes("textStyle").color}
          onSelect={(c) => editor.chain().focus().setColor(c).run()}
          icon={Palette}
          label="Text Color"
          testId="button-color"
        />
        <ColorPickerPopover
          colors={HIGHLIGHT_COLORS}
          currentColor={editor.getAttributes("highlight").color}
          onSelect={(c) => editor.chain().focus().toggleHighlight({ color: c }).run()}
          icon={Highlighter}
          label="Highlight"
          testId="button-highlight"
        />

        <ToolbarDivider />

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          data-testid="button-clear-format"
          title="Clear formatting"
        >
          <RemoveFormatting className="h-4 w-4" />
        </Button>

        <ToolbarDivider />

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          data-testid="button-undo"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          data-testid="button-redo"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <EditorContent editor={editor} />

      <div className="flex items-center justify-end gap-3 px-3 py-1.5 border-t bg-muted/20 text-xs text-muted-foreground">
        <span data-testid="text-word-count">{words} words</span>
        <span data-testid="text-char-count">{chars} characters</span>
      </div>
    </div>
  );
}
