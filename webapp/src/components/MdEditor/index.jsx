import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, Viewer } from '@toast-ui/react-editor';

function MarkdownEditor({ mdValue, setContent }) {
  const editorRef = useRef(null);
  const onChangeEditorTextHandler = useCallback(() => {
    setContent(editorRef.current?.getInstance().getMarkdown());
  }, [setContent]);
  return (
<<<<<<< HEAD
    <Editor
      initialValue={mdValue}
      height="400px"
      initialEditType="markdown"
      useCommandShortcut
      ref={editorRef}
      onChange={onChangeEditorTextHandler}
    />
=======
    <div>
      <Editor
        initialValue={mdValue}
        previewStyle="vertical"
        height="400px"
        initialEditType="markdown"
        useCommandShortcut
        ref={editorRef}
        onChange={onChangeEditorTextHandler}
      />
    </div>
>>>>>>> fa6a12ae010484d2036323ee77f4e12f45836740
  );
}

MarkdownEditor.propTypes = {
  mdValue: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
};

export default React.memo(MarkdownEditor);
