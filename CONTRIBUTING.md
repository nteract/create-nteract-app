
# Welcome to the create-nteract-app contributing guide!
We are _thrilled_ you want to contribute to create-nteract-app! Below you will find guidance on how you can jump in and help out :tada:

[Code of Conduct](#code-of-conduct)

[Questions about create-nteract-app?](#questions-about-create-nteract-app)

[How to Contribute](#how-to-contribute)
- [What do I need to know to help?](#what-do-i-need-to-know-to-help)
- [How to make a contribution](#how-to-make-a-contribution)
- [How should I write my commit messages and PR titles?](#how-should-i-write-my-commit-messages-and-pr-titles)

## Code of Conduct
First and foremost, nteract is an inclusive organization. This project and everyone participating in it is governed by the [nteract Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [rgbkrk@gmail.com](mailto:rgbkrk@gmail.com).

## Questions about create-nteract-app
Feel free to post issues on GitHub or chat with us in [Slack](https://nteract.slack.com/) ([request an invite](https://slack.nteract.io/)) if you need help or have
questions. If you have trouble creating an account on Slack, either email
rgbkrk@gmail.com or post an issue on GitHub.

## How to Contribute

### What do I need to know to help
You'll need knowledge of JavaScript (ES6), React and Next.js to help out with this project. That's a whole lot of cool stuff! But don't worry, we've got some resources to help you out.

- [Kent C. Dodd](https://github.com/kentcdodds)'s beginner guide to React course on [egghead.io](https://egghead.io/courses/the-beginner-s-guide-to-react)
- [Learning to build a simple Next.js app](https://nextjs.org/learn/)

### How to make a contribution
Never made an open source contribution before? Wondering how contributions work
in the nteract world? Here's a quick rundown!

1. Find an issue that you are interested in addressing or a feature that you would like to address.
2. Fork the repository associated with the issue to your local GitHub username or organization.
    
    ___Note___: if you are already a member of the nteract organization, it's not necessary to fork create-nteract-app to contribute -- you can clone create-nteract-app and push your branch directly to the create-nteract-app repo.
3. Clone the repository to your local machine using:

       git clone https://github.com/github-username/create-nteract-app.git

4. Create a new branch for your fix using:

       git checkout -b branch-name-here

5. Make the appropriate changes for the issue you are trying to address or the feature that you want to add.
6. Confirm that unit tests and linting still pass successfully with:
   
       node src/index.js snow-leopard && yarn test
   
   If tests fail, don't hesitate to ask for help.

7. Add and commit the changed files using `git add` and `git commit`.
8. Push the changes to the remote repository using:

       git push origin branch-name-here

9. Submit a pull request to the upstream repository.
10. Title the pull request per the requirements outlined in the section below.
11. Set the description of the pull request with a brief description of what you
    did and any questions you might have about what you did.
12. Wait for the pull request to be reviewed by a maintainer.
13. Make changes to the pull request if the reviewing maintainer recommends
    them.
14. Celebrate your success after your pull request is merged! :tada:

### How should I write my commit messages and PR titles

Good commit messages serve at least three important purposes:

* To speed up the reviewing process.

* To help us write a good release note.

* To help the future maintainers of nteract/nteract (it could be you!), say
  five years into the future, to find out why a particular change was made to
  the code or why a specific feature was added.

Structure your commit message like this:

```
> Short (50 chars or less) summary of changes
>
> More detailed explanatory text, if necessary.  Wrap it to about 72
> characters or so.  In some contexts, the first line is treated as the
> subject of an email and the rest of the text as the body.  The blank
> line separating the summary from the body is critical (unless you omit
> the body entirely); tools like rebase can get confused if you run the
> two together.
>
> Further paragraphs come after blank lines.
>
>   - Bullet points are okay, too
>
>   - Typically a hyphen or asterisk is used for the bullet, preceded by a
>     single space, with blank lines in between, but conventions vary here
>
```
*Source: http://git-scm.com/book/ch5-2.html*

#### DO

* Write the summary line and description of what you have done in the
  imperative mode, that is as if you were commanding. Start the line
  with "Fix", "Add", "Change" instead of "Fixed", "Added", "Changed".
* Always leave the second line blank.
* Line break the commit message (to make the commit message readable
  without having to scroll horizontally in gitk).

#### DON'T

* Don't end the summary line with a period - it's a title and titles don't end
  with a period.

#### Tips

* If it seems difficult to summarize what your commit does, it may be because it
  includes several logical changes or bug fixes, and are better split up into
  several commits using `git add -p`.

#### References

The following blog post has a nice discussion of commit messages:

* "On commit messages" http://who-t.blogspot.com/2009/12/on-commit-messages.html

#### How fast will my PR be merged?

Your pull request will be merged as soon as there are maintainers to review it
and after tests have passed. You might have to make some changes before your
PR is merged but as long as you adhere to the steps above and try your best,
you should have no problem getting your PR merged.

That's it! You're good to go!