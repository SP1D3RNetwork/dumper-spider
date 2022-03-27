import mysql from "serverless-mysql";
const db = mysql({
  config: {
    host: "IP",
    port: PORT,
    database: "DATABASE-NAME",
    user: "USER",
    password: "PASSWORD",
  },
});
export default async function excuteQuery({ query, values }: any) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
