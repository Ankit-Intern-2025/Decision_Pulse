import React, { useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"; // Required for autocompletion

// Import Ace for completer registration
import ace from "ace-builds/src-noconflict/ace";

function SQLQueryEditor() {
  // Define your custom suggestions
  const customCompleter = {
    getCompletions: (editor, session, pos, prefix, callback) => {
      const customSuggestions = [
        { caption: "customers", value: "customers", meta: "table" },
        { caption: "orders", value: "orders", meta: "table" },
        { caption: "customerID", value: "customerID", meta: "column" },
        { caption: "companyName", value: "companyName", meta: "column" },
        { caption: "contactName", value: "contactName", meta: "column" },
        { caption: "SELECT", value: "SELECT", meta: "keyword" },
        { caption: "FROM", value: "FROM", meta: "keyword" },
        { caption: "WHERE", value: "WHERE", meta: "keyword" },
      ];

      // Filter suggestions by prefix
      const filteredSuggestions = customSuggestions.filter((suggestion) =>
        suggestion.value.toLowerCase().startsWith(prefix.toLowerCase())
      );

      callback(null, filteredSuggestions);
    },
  };

  // Register the custom completer
  useEffect(() => {
    ace.require("ace/ext/language_tools").setCompleters([customCompleter]);
  }, []);

  return (
    <AceEditor
      mode="sql"
      theme="monokai"
      name="sql_editor"
      fontSize={14}
      width="100%"
      height="300px"
      editorProps={{ $blockScrolling: true }}
      enableLiveAutocompletion={true} // Enable live autocompletion
      enableBasicAutocompletion={true} // Enable basic autocompletion
      enableSnippets={true} // Enable snippets (optional)
      value="SELECT * FROM customers;"
    />
  );
}

export default SQLQueryEditor;
