import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';

import { Box, Paper } from '@mui/material';

import Toolbar from './Toolbar';
import PlaceholderPanel from './PlaceholderPanel';
import { useEffect } from 'react';

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function MailEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,

      Link,

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],

    content: value,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  return (
    <Paper variant="outlined">
      <Toolbar editor={editor} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: 350,
            p: 2,

            '& .ProseMirror': {
              outline: 'none',
              minHeight: 320,
            },
          }}
        >
          <EditorContent editor={editor} />
        </Box>

        <PlaceholderPanel editor={editor} />
      </Box>
    </Paper>
  );
}
