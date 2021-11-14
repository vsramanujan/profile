// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: `${req.method} not implemented` });
  }
  let payload;
  try {
    payload = JSON.parse(req.body);
  } catch (err) {
    res.status(500).json({
      message: "Error while parsing body",
    });
  }

  const savedNote = await prisma.note.update({
    data: {
      note: payload.note,
      updateTime: payload.updateTime,
    },
    where: {
      id: payload.id,
    },
  });

  res.status(200).json(savedNote);
}
