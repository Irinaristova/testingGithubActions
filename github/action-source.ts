/* eslint-disable @typescript-eslint/camelcase */

import { debug as log, getInput, setFailed} from '@actions/core';
import { context, getOctokit } from '@actions/github';

const debug = (label: string, message: string): void => {
  log('');
  log(`[${label.toUpperCase()}]`);
  log(message);
  log('');
};

async function run(): Promise<any> {
  try {
    // Provide complete context object right away if debugging
    debug('context', JSON.stringify(context));

    // Instantiate a GitHub Client instance
     const myToken = getInput('myToken');
     const client = getOctokit(myToken);
     const { owner, repo, number } = context.issue;

    const issuesPrefixes = getInput("issues-prefixes", { required: true });
    const pullRequestTags = getInput("pull-request-tags", { required: true });
    const assigneeRequired = getInput("assignee-required", { required: true });
    const branchPrefixes = getInput("branch-prefixes", { required: true });

    // Check for a ticket reference in the branch
    const branchName: string = context.payload.pull_request?.head.ref;

    const currentReviews = await client.pulls.listReviews({
      owner,
      repo,
      pull_number: number
    });

    debug('current reviews', JSON.stringify(currentReviews));
    
    // type/name
    const [type, name] = branchName.split("/", 2);
    
    // if (!branchPrefixes.includes(type)) {
    //   return { title: "Wrong prefix", message: `Available prefixes: ${branchPrefixes.join(",")}` };
    // }
    
    // feature/FRNT-123-description-words
    // feature/BCKND-123-description-words
    // feature/description-words
  ​
    // ^((BCKND|FRNT)-\d+)?
    const regexpTask = new RegExp(`^([A-Z]+-\d+)?`);
    let description = name;
    if (regexpTask.exec(name)) {
      description = name.replace(regexpTask, "");
    }
    // Retrieve the pull request body and verify it's not empty
   const body = context?.payload?.pull_request?.body;

   if (body === undefined) {
     debug('failure', 'Body is undefined');
     setFailed('Could not retrieve the Pull Request body');

     return;
   }

   debug('body contents', body);

  } 

  catch {}
}

run()

  ​
  
  ​
  ​
    // feature/FRNT-123-description-words
    // feature/BCKND-123-description-words
    // feature/description-words
  ​
    // ^((BCKND|FRNT)-\d+)?
    
  ​
  // function toArray(string) {
  //   return string.split(",").map((item) => item.trim());
  // }
  // ​
  // function action(
  //   { branchName, title, description, assignnee },
  //   { issuesPrefixes, pullRequestTags, assigneeRequired, branchPrefixes }
  // ) {
  //   if (!branchPrefixes.includes(type)) {
  //     return { title: "Wrong prefix", message: `Available prefixes: ${branchPrefixes.join(",")}` };
  //   }
  // ​
  //   // its ok
  //   return undefined;
  // }
  // ​
  // describe("branchName", () => {
  //   test("branch with invalid issue prefix should fail", () => {
  //     const result = action(
  //       { branchName: "feature/DEMO-123-description-words-to-skip" },
  //       { issuesPrefixes: ["ADMIN", "EXAMPLE"] }
  //     );
  // ​
  //     expect(result).toBe({ title: "Wrong prefix" });
  //   });
  // ​
  //   test("branch with valid issue prefix", () => {
  //     const result = action(
  //       { branchName: "feature/ADMIN-123-description-words-to-skip" },
  //       { issuesPrefixes: ["ADMIN", "EXAMPLE"] }
  //     );
  // ​
  //     expect(result).toBe(undefined);
  //   });
  // });