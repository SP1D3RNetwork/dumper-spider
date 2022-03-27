import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../libs/database";

// incrase the api routes body size limit to 4mb

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  han: NextApiHandler<NextApiHandler>
) {
  try {
    const result = await excuteQuery({
      query:
        "SELECT `discord`, `name`, `ip`, `steam` FROM `account_info` WHERE `discord`  = ?",
      values: [req.query.discord],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
}
