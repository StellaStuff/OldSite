import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const GIST_ID="e97fd77282bb1ac24a1e5fa58bdc828f"
const GH_TOKEN="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"

const octokit = new Octokit({
  //auth: GH_TOKEN
})

let book = await octokit.request('GET /gists/{gist_id}', {
  gist_id: GIST_ID
});

console.log(book);
console.log(book.data.files["Guestbook.json"].content);

console.log("testing am i working?");
console.log(octokit);

//prolly going to scrap this, its a huge security issue