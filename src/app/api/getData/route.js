import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";

export async function POST(req) {
  // receive input from the request body
  const { input } = await req.json();

  console.log("input: ", input);

  const response = await fetch(
    `https://www.npmjs.com/package/${input.toLowerCase()}`
  );
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;
  const downloads = document.querySelector("._9ba9a726")?.textContent;
  const version = document.querySelector(".abe380b3")?.textContent;
  const repository = document.querySelector("#repository-link")?.textContent;

  return NextResponse.json({ downloads, version, repository });
}
