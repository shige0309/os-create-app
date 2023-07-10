import "./TextEditor.css";

import {
  ContentBlock,
  ContentState,
  DraftEditorCommand,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import React from "react";

type TextEditorProps = {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
};

export const TextEditor = ({
  editorState,
  setEditorState,
}: TextEditorProps) => {
  type BlockComponentProps = {
    contentState: ContentState;
    block: ContentBlock;
  };

  /** ブロックのスタイル付与関数 */
  const getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case "left":
        return "alignLeft";
      case "center":
        return "alignCenter";
      case "right":
        return "alignRight";
      default:
        return "";
    }
  };

  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleToggleClick = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  /** ブロック装飾 */
  const handleBlock = (block: string, e: React.MouseEvent<any>) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, block));
  };

  /** TextEditor.tsx  */
  const handleAddLink = () => {
    const selection = editorState.getSelection();
    const link = prompt("リンクを設定してください。");
    if (!link) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
      return;
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link,
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "apply-entity",
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };

  /** 画像の表示 */
  const Media = (props: BlockComponentProps) => {
    const entityKey = props.block.getEntityAt(0);
    if (!entityKey) return null;
    const entity = props.contentState.getEntity(entityKey);
    const { url } = entity.getData();
    const type = entity.getType();

    let media;

    if (type === "image") {
      media = <img src={url} alt="" className="image" />;
    }

    return media;
  };

  /** レンダラー */
  const blockRenderer = (block: ContentBlock) => {
    if (block.getType() === "atomic") {
      return {
        component: Media,
        editable: false,
      };
    }
    return null;
  };

  return (
    <div>
      <button
        type="button"
        onMouseDown={(e) => handleBlockClick(e, "header-one")}
      >
        H1
      </button>
      <button
        type="button"
        onMouseDown={(e) => handleBlockClick(e, "header-two")}
      >
        H2
      </button>
      <button
        type="button"
        onMouseDown={(e) => handleBlockClick(e, "header-three")}
      >
        H3
      </button>
      <button
        type="button"
        onMouseDown={(e) => handleBlockClick(e, "unstyled")}
      >
        標準
      </button>
      <button type="button" onMouseDown={(e) => handleToggleClick(e, "BOLD")}>
        太字
      </button>
      <button type="button" onMouseDown={(e) => handleToggleClick(e, "ITALIC")}>
        イタリック
      </button>
      <button
        type="button"
        onMouseDown={(e) => handleToggleClick(e, "STRIKETHROUGH")}
      >
        取り消し戦
      </button>
      <button
        type="button"
        onMouseDown={(e) => handleBlockClick(e, "ordered-list-item")}
      >
        ol
      </button>
      <button
        type="button"
        onMouseDown={(e) => handleBlockClick(e, "unordered-list-item")}
      >
        ul
      </button>
      <button type="button" onMouseDown={(e) => handleBlock("left", e)}>
        左側
      </button>
      <button type="button" onMouseDown={(e) => handleBlock("center", e)}>
        中央
      </button>
      <button type="button" onMouseDown={(e) => handleBlock("right", e)}>
        右側
      </button>
      <div>
        <button
          disabled={editorState.getUndoStack().size <= 0}
          onMouseDown={() => setEditorState(EditorState.undo(editorState))}
        >
          undo
        </button>
        <button
          disabled={editorState.getRedoStack().size <= 0}
          onMouseDown={() => setEditorState(EditorState.redo(editorState))}
        >
          redo
        </button>
        <button
          disabled={editorState.getSelection().isCollapsed()}
          onMouseDown={(e) => {
            e.preventDefault();
            handleAddLink();
          }}
        >
          link
        </button>
      </div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        blockRendererFn={blockRenderer}
        blockStyleFn={getBlockStyle}
      />
    </div>
  );
};
