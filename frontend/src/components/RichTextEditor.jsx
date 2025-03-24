import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { EditorProvider, useCurrentEditor, EditorContent, useEditor } from '@tiptap/react'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Image from '@tiptap/extension-image';
import ImageIcon from '@mui/icons-material/Image';
import Placeholder from '@tiptap/extension-placeholder';
import { Divider } from '@mui/material'
import { forwardRef, useEffect, useImperativeHandle } from "react";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
  }),
  Link.configure({ openOnClick: false }),
  Image,
  Placeholder.configure({
    placeholder: 'Viết phần mô tả cho phòng khám của bạn...', // Set your desired placeholder text
  }),
];

const RichTextEditor =  forwardRef((props, ref) => {
  const editor = useEditor({
    extensions: extensions,
    content: "<p>Start typing...</p>",
    onUpdate: ({ editor }) => {
      props.onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (props.content) {
      editor.commands.setContent(props.content);
    }
  }, [props.content]);

  const addLink = () => {
    const url = prompt('Enter the link URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };
  
  const addImage = () => {
    const url = prompt('Enter the image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };


  useImperativeHandle(ref, () => ({
    getHTML: () => editor.getHTML(),
    getJSON: () => editor.getJSON(),
    getMarkdown: () => editor.getMarkdown
  }));
  
  return (
    <>
       <div className="control-group">
        <div className="button-group">
          <select
              value={
                [1, 2, 3, 4, 5, 6].find(level => editor.isActive('heading', { level })) || "paragraph"
              }
              onChange={(e) => {
                const level = e.target.value === "paragraph" ? null : parseInt(e.target.value, 10);
                if (level) {
                  editor.chain().focus().toggleHeading({ level }).run();
                } else {
                  editor.chain().focus().setParagraph().run();
                }
              }}
            >
              <option value="paragraph">Paragraph</option>
              <option value="1">Heading 1</option>
              <option value="2">Heading 2</option>
              <option value="3">Heading 3</option>
              <option value="4">Heading 4</option>
              <option value="5">Heading 5</option>
              <option value="6">Heading 6</option>
          </select>
          <Divider orientation="vertical" flexItem sx={{ height: '22px', marginY: 'auto' }}/>
          <input
              type="color"
              onInput={event => editor.chain().focus().setColor(event.target.value).run()}
              defaultValue={"#000000"}
              value={editor.getAttributes('textStyle').color}
              data-testid="setColor"
          />
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={`font-bold ${editor.isActive('bold') ? 'is-active' : ''}`}
          >
            <FormatBoldIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={`italic ${editor.isActive('italic') ? 'is-active' : ''}`}
          >
            <FormatItalicIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <FormatStrikethroughIcon />
          </button>
          <Divider orientation="vertical" flexItem sx={{ height: '22px', marginY: 'auto' }}/>
          <button onClick={addLink}>
            <LinkIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            <FormatListBulletedIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            <FormatListNumberedIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            <CodeIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            <FormatQuoteIcon />
          </button>
          <button onClick={addImage}>
            <ImageIcon />
          </button>
          <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <HorizontalRuleIcon />
          </button>
          <Divider orientation="vertical" flexItem sx={{ height: '22px', marginY: 'auto' }}/>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
          >
            <UndoIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .redo()
                .run()
            }
          >
            <RedoIcon />
          </button>
          <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
            <CleaningServicesIcon />
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </>
  )
});

export default RichTextEditor;
