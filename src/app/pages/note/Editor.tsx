"use client";
import { useCallback, useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { updateContent } from "./functions";

export const Editor = ({
  noteKey,
  initialContent,
}: {
  noteKey: string;
  initialContent: string;
}) => {
  const [content, setContent] = useState(initialContent);

  // Always take the latest version from the server
  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const debouncedUpdate = useCallback(
    debounce(async (newContent: string) => {
      try {
        await updateContent(noteKey, newContent);
      } catch (error) {
        console.error("Error updating content:", error);
      }
    }, 100),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent); // Always update local state
    debouncedUpdate(newContent); // Send the latest version
  };

  return (
    <textarea
      value={content}
      onChange={handleChange}
      placeholder="Start typing..."
      style={{ width: "100%", height: "300px", fontSize: "16px" }}
    />
  );
};
