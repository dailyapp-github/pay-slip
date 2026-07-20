import { Editor } from '@tiptap/react';

import { Box, IconButton, Divider } from '@mui/material';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

interface Props {
  editor: Editor | null;
}

export default function Toolbar({ editor }: Props) {
  if (!editor) return null;

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        p: 1,
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
      }}
    >
      <IconButton onClick={() => editor.chain().focus().toggleBold().run()}>
        <FormatBoldIcon />
      </IconButton>

      <IconButton onClick={() => editor.chain().focus().toggleItalic().run()}>
        <FormatItalicIcon />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <FormatUnderlinedIcon />
      </IconButton>

      <Divider orientation="vertical" flexItem />

      <IconButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <FormatListBulletedIcon />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <FormatListNumberedIcon />
      </IconButton>
    </Box>
  );
}
