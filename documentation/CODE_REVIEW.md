# Code Review

Read More:

- [You don't have a team if your team does not have a code review. 🙊](https://dev.to/borysshulyak/you-dont-have-a-team-if-your-team-does-not-have-a-code-review-2hb)
- [✅ CodeReview Formalization](https://dev.to/borysshulyak/codereview-formalization-3bmj)

**MR checklist:**

- [ ]  Changes were structured by the logical commits/MRs: one logical change - one commit/MR.
- [ ]  MR pipeline is green.
- [ ]  Tests are added/updated (if relevant).
- [ ]  Change are fully described in the MR description.
- [ ]  [Impact Analysis](https://dev.to/borysshulyak/impact-analysis-unleashing-the-power-of-understanding-code-dependencies-4ma6) were provided.
- [ ]  All the related documentation is updated.
- [ ]  The related MRs are linked to the current (if relevant).
- [ ]  Reviewers are assigned.
- [ ]  All the required labels are added. [Read more.](https://github.com/BorysShulyak/runespoor-archive/blob/main/documentation/LABELS.md)

**Reviewers:**

- If someone is not assigned as a reviewer but wants to review the MR, he could assign himself.
- The MR **Author** could assign the **Reviewers**.
- The MR **Author** should mention the code owner and ask for review.

**Required reviewers:**

- 1 code owner

**Review deadlines:**

- Priority: Emergency - 0.5d
- Priority: High/Critical - 1d
- Priority: Medium - 2d
- Priority: Low - 3d

**Merge deadlines -** 0.5 days

**Review priority** - high

## Code Review Flow

### Reviewer

- Approve changes? -  Tap approve.
- Do not approve changes? - Open MR discussions.
- In the discussion, author notified about resolving? - Double check ⇒ Resolve / Write questions/suggestions.
- Notify the author about finishing the review.

### Author

- Opened discussions? - Ask questions or add an arguments that the suggestion is not correct / Update code to resolve
discussion ⇒ notify in the discussion
- CODEOWNER has approved the MR? - MR could be merged.

## Exceptions

- Two people did not come to an agreement in the same discussion? - Ask the opinion of other code reviewers.
- There is no time for resolving code review discussions? - Only if the **MR Priority is** **Emergency,** create a
GitHub issue with provided description for fixing the discussions and add ToDo in the code. After that, you could merge
and fix the discussions in the future.

## Best practices (form GitLab documentation)

### Everyone

- Be kind.
- Accept that many programming decisions are opinions. Discuss tradeoffs, which you prefer, and reach a resolution quickly.
- Ask questions; don’t make demands. (“What do you think about naming this `:user_id`?”)
- Ask for clarification. (“I didn’t understand. Can you clarify?”)
- Avoid selective ownership of code. (“mine”, “not mine”, “yours”)
- Avoid using terms that could be seen as referring to personal traits. (“dumb”, “stupid”). Assume everyone is intelligent and well-meaning.
- Be explicit. Remember people don’t always understand your intentions online.
- Be humble. (“I’m not sure - let’s look it up.”)
- Don’t use hyperbole. (“always”, “never”, “endlessly”, “nothing”)
- Be careful about the use of sarcasm. Everything we do is public; what seems like good-natured ribbing to you and a long-time colleague might come off as mean and unwelcoming to a person new to the project.
- Consider one-on-one chats or video calls if there are too many “I didn’t understand” or “Alternative solution:” comments. Post a follow-up comment summarizing one-on-one discussion.
- If you ask a question to a specific person, always start the comment by mentioning them; this ensures they see it if their notification level is set to “mentioned” and other people understand they don’t have to respond.

### Having your merge request reviewed

Please keep in mind that code review is a process that can take multiple iterations, and reviewers may spot things later that they may not have seen the first time.

- The first reviewer of your code is *you*. Before you perform that first push of your shiny new branch, read through the entire diff. Does it make sense? Did you include something unrelated to the overall purpose of the changes? Did you forget to remove any debugging code?
- Be grateful for the reviewer’s suggestions. (“Good call. I’ll make that change.”)
- Don’t take it personally. The review is of the code, not of you.
- Explain why the code exists. (“It’s like that because of these reasons. Would it be more clear if I rename this class/file/method/variable?”)
- Extract unrelated changes and refactorings into future merge requests/issues.
- Seek to understand the reviewer’s perspective.
- Try to respond to every comment.
- The merge request author resolves only the threads they have fully addressed. If there’s an open reply, an open thread, a suggestion, a question, or anything else, the thread should be left to be resolved by the reviewer.
- It should not be assumed that all feedback requires their recommended changes to be incorporated into the MR before it is merged. It is a judgment call by the MR author and the reviewer as to if this is required, or if a follow-up issue should be created to address the feedback in the future after the MR in question is merged.
- Push commits based on earlier rounds of feedback as isolated commits to the branch. Do not squash until the branch is ready to merge (GitLab will squash automatically during merging). Reviewers should be able to read individual updates based on their earlier feedback. Also, do not rebase or rewrite the commit history. If you add and revert temporary commits, this should be traceable in MR commits history.
- Request a new review from the reviewer once you are ready for another round of review. If you do not have the ability to request a review, `@` mention the reviewer instead.

### Reviewing a merge request

Understand why the change is necessary (fixes a bug, improves the user experience, refactors the existing code). Then:

- Try to be thorough in your reviews to reduce the number of iterations.
- Communicate which ideas you feel strongly about and those you don’t.
- Identify ways to simplify the code while still solving the problem.
- Offer alternative implementations, but assume the author already considered them. (“What do you think about using a custom validator here?”)
- Seek to understand the author’s perspective.
- Check out the branch, and test the changes locally. You can decide how much manual testing you want to perform. Your testing might result in opportunities to add automated tests.
- If you don’t understand a piece of code, *say so*. There’s a good chance someone else would be confused by it as well.
- Ensure the author is clear on what is required from them to address/resolve the suggestion.
  - Consider using the [Conventional Comment format](https://conventionalcomments.org/#format) to convey your intent.
  - For non-mandatory suggestions, decorate with (non-blocking) so the author knows they can optionally resolve within the merge request or follow-up at a later stage.
  - There are [Chrome](https://chrome.google.com/webstore/detail/conventional-comments-but/pimlnmoahkppoahhfljddkaoefbkdikf)/[Firefox](https://addons.mozilla.org/en-US/firefox/addon/conventional-comments-button/) add-ons which you can use to apply [Conventional Comment](https://conventionalcomments.org/) prefixes.
- After a round of line notes, it can be helpful to post a summary note such as “Looks good to me”, or “Just a couple things to address.”
- Let the author know if changes are required following your review.
