"use client";
import Image from "next/image";
import { Suspense, useState } from "react";

export default function Home() {
  const [downloads, setDownloads] = useState("");
  const [version, setVersion] = useState("");
  const [repository, setRepository] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const getData = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });
    const { downloads, version, repository } = await res.json();
    setDownloads(downloads);
    setVersion(version);
    setRepository(repository);
    setLoading(false);
  };

  return (
    <>
      <div className="p-5">
        <main className="flex h-80 flex-col items-center justify-between p-24 border shadow-md rounded-xl bg-blue-500">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl font-bold text-white">
              Search javascript package
            </h1>
            <form className="flex items-center justify-center">
              <input
                className="border border-gray-300 p-2 rounded-md"
                type="text"
                placeholder="Search package"
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                onClick={getData}
                className="bg-blue-50 text-blue-600 p-2 rounded-md ml-2"
              >
                Search
              </button>
            </form>
          </div>
        </main>
      </div>
      <div className="p-5">
        <div className="p-10">
          {loading ? (
            <div className="grid grid-cols-3 gap-5 w-full">
              <div className="p-10 bg-slate-300 animate-pulse rounded"></div>
              <div className="p-10 bg-slate-300 animate-pulse rounded"></div>
              <div className="p-10 bg-slate-300 animate-pulse rounded"></div>
            </div>
          ) : (
            downloads &&
            version && (
              <div className="grid grid-cols-3 gap-5 w-full">
                <div className="border grid place-items-center bg-blue-50 p-5 rounded-md">
                  <h1 className="text-2xl font-semibold">
                    {downloads ? `Downloads: ${downloads}` : null}
                  </h1>
                </div>
                <div className="border grid place-items-center bg-blue-50 p-5 rounded-md">
                  <h1 className="text-2xl font-semibold">
                    {version ? `Version: ${version}` : null}
                  </h1>
                </div>
                <div className="border grid bg-blue-50 p-5 rounded-md">
                  <p className="text-xl font-semibold">Repository</p>
                  <a
                    href={repository && `https://${repository}`}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                  >
                    {repository ? `${repository}` : null}
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
