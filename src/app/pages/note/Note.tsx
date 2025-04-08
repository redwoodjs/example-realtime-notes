import { Editor } from "./Editor";
import { getContent } from "./functions";
import { RequestInfo } from "@redwoodjs/sdk/worker";

const Note = async ({ params }: RequestInfo<{ key: string }>) => {
  const key = params.key;
  const content = await getContent(key);
  return <Editor props={{ initialContent: content, key }} />;
};

export default Note;
