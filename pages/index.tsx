import type { NextPage } from "next";
import React, { useState } from "react";
import FadeIn from "react-fade-in";
const Home: NextPage = () => {
  const [data, setData] = useState([{}] as any);
  const [discordId, setDiscordId] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (discordId === "") {
      setError("Merci de renseigner votre ID Discord");
    }
    if (data === [{}]) {
      setError("Nous avons pas trouver de joueur dans la database");
    }
    fetch(
      `https://dumper.vercel.app/api/dump?discord=${`discord:${discordId}`}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => setData(data));
  };
  return (
    <>
      <FadeIn className="flex flex-col justify-center backdrop-blur-md bg-rose-400/30 items-center h-screen space-y-2">
        {error && (
          <div className="px-3 py-3 rounded-lg bg-red-500">
            <p className="text-white">{error}</p>
          </div>
        )}
        <h1 className="text-5xl font-medium text-rose-50 drop-shadow-lg">
          SP1D3R-NETWORK{" "}
        </h1>
        <div
          className={`bg-black/90 shadow-2xl shadow-rose-500 ${
            discordId === null ? "w-[380px]" : "w-full"
          } h-full px-10 py-10 rounded-lg space-y-5`}
        >
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="flex justify-center items-center"
          >
            <div className="inline-flex space-x-2">
              <input
                className="bg-neutral-200 transition duration-300 font-medium text-black placeholder:text-black p-2 rounded-lg focus:outline-none"
                type="text"
                placeholder="Discord ID"
                onChange={(e) => setDiscordId(e.target.value)}
              />
              <button
                className="bg-rose-500 border-4 font-medium text-white border-t-transparent border-l-transparent border-r-transparent border-b-rose-600 p-2 rounded-lg"
                type="submit"
              >
                Envoyer
              </button>
            </div>
          </form>
          <div>
            {data ? (
              <>
                <div
                  className={
                    "border-2 border-rose-600/40 px-4 py-4 w-full h-full rounded-lg"
                  }
                >
                  <div className="flex justify-center items-center flex-col">
                    {data.map((item: any) => (
                      <>
                        <div className="grid grid-cols-4 space-x-2 space-y-2">
                          <div className="space-y-2">
                            <div className="text-white inline-flex w-full bg-rose-600 px-2 py-2 rounded-lg">
                              <span className="font-medium">name:</span>
                              <p className="font-normal">{item.name}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-white inline-flex  w-full bg-rose-600 px-2 py-2 rounded-lg">
                              <span className="font-medium">id:</span>
                              <p className="font-normal">{discordId}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-white bg-rose-600 w-full px-2 py-2 rounded-lg">
                              <span className="font-medium">ip:</span>
                              <p className="font-normal">{item.ip}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-white bg-rose-600 w-full px-2 py-2 rounded-lg">
                              <span className="font-medium">steam:</span>
                              <p className="font-normal">{item.steam}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-white">
                  Merci de renseigner votre ID Discord
                </p>
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </>
  );
};

export default Home;
