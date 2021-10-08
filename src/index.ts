import * as core from "@actions/core";
import * as github from "@actions/github";

type ClientType = ReturnType<typeof github.getOctokit>;

async function run() {
  console.log("it works");
  // console.log(github.context);
  console.log(process.env.GITHUB_TOKEN === process.env.ACTIONS_RUNTIME_TOKEN);
  console.log(process.env);

  const token: string = process.env.GITHUB_TOKEN!;

  // const prNumber = getPrNumber();
  // if (!prNumber) {
  //   console.log("Could not get pull request number from context, exiting");
  //   return;
  // }

  const client: ClientType = github.getOctokit(token);
  const issue = github.context.issue;
  await client.rest.issues.update({
    issue_number: issue.number,
    owner: issue.owner,
    repo: issue.repo,
    body: "hello from octokit",
  });
}

run();
