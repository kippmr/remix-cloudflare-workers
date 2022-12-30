import db from "~/services/db";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/cloudflare";

export async function loader(args: LoaderArgs) {
  await db.log.create({
    data: {
      level: "Info",
      message: `${args.request.method} ${args.request.url}`,
      meta: {
        headers: JSON.stringify([...args.request.headers]),
      },
    },
  });
  return db.log.findMany();
}

const RootIndex = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className={"text-5xl font-bold underline"}>Welcome to Remix</h1>
      <ul>
        {data.map((log, index) => (
          <li key={index}>{log.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default RootIndex;
