// Import React dependencies.
import React, { useState } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

// TypeScript users only add this code
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

// Add the initial value.
const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

const App = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const handleOnChange = (value: Descendant[]) => {
    const isStateChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );

    if (isStateChange) {
      const content = JSON.stringify(value);
      localStorage.setItem("content", content);
    }
  };

  return (
    <Slate editor={editor} value={initialValue} onChange={handleOnChange}>
      <Editable />
    </Slate>
  );
};

export default App;
