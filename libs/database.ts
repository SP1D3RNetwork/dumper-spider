import mysql from "serverless-mysql";
const db = mysql({
  config: {
    host: "137.74.202.159",
    port: 3306,
    database: "s25956_data_testing",
    user: "u25956_kmGTt0hViR",
    password: "1o64uKef27TVaJBSwmAF5Wy6",
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
