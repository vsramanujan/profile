import { prismaClient } from "../../../db";

export default async function createNote(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `${req.method} is not yet supported` });
  }

  const body = JSON.parse(req.body);

  const time = new Date().toISOString();

  const createdNote = await prismaClient.note.create({
    data: {
      active: true,
      createTime: time,
      updateTime: time,
      bgColor: body.bgColor,
      note: "",
    },
  });

  return res.status(200).json({ createdNote });
}
