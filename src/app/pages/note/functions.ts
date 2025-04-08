"use server";

import { env } from "cloudflare:workers";

export const getContent = async (key: string) => {
  const doId = env.NOTE_DURABLE_OBJECT.idFromName(key);
  const noteDO = env.NOTE_DURABLE_OBJECT.get(doId);
  return noteDO.getContent();
};

export const updateContent = async (key: string, content: string) => {
  const doId = env.NOTE_DURABLE_OBJECT.idFromName(key);
  const noteDO = env.NOTE_DURABLE_OBJECT.get(doId);
  await noteDO.setContent(content);
};
