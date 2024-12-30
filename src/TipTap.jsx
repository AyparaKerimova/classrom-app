// src/Tiptap.tsx
import React from 'react';
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'; // Basic functionality
import Bold from '@tiptap/extension-bold'; // Bold text
import Italic from '@tiptap/extension-italic'; // Italic text

const extensions = [
  StarterKit,
  Bold,
  Italic,
];

const content = '<p>Welcome to <strong>TipTap</strong>. Start editing here!</p>';

const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  if (!editor) return null;

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
      <EditorContent editor={editor} className="editor-content" />
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={{
            fontWeight: editor.isActive('bold') ? 'bold' : 'normal',
          }}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          style={{
            fontStyle: editor.isActive('italic') ? 'italic' : 'normal',
          }}
        >
          Italic
        </button>
      </div>
    </div>
  );
};

export default Tiptap;
