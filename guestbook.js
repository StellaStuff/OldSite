import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const GIST_ID="e97fd77282bb1ac24a1e5fa58bdc828f"
const GH_TOKEN="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"

const octokit = new Octokit({
  auth: GH_TOKEN
})

let book = await octokit.request('GET /gists/{gist_id}', {
  gist_id: GIST_ID
});

console.log(book);
console.log(book.data.files["Guestbook.json"].content);

console.log("testing am i working?");
console.log(octokit);