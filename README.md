## Overview:

Writing an essay about yourself is hard and boring. Let's make it fun!
This small application built with React/Redux asks a user
some simple questions, and assembles the answers into an exciting essay.

## Flow:

- install packages using `yarn install`
- start the project using `yarn start`
- the application will open in a new window on `http://127.0.0.1:3000/` or `http://localhost:3000/`

## Packages used:

- React
- Redux
- Redux Thunk
- React String Replace

## CHALLENGES:

### Bolding user text in a preview of the essay

#### The problem and Options

The most intuitive way of solving this problem would be to use `dangerouslySetInnerHTML` - this way I would combine the template string with html tag, and bold user's text. This is not a desired way because it makes the app vulnerable to XSS attack. If I have chose this method I would create additional problems - how to sanitize the text and make sure the attack would be prevented.

#### My solution

The flow for bolding the text is as follows:

- the user types the answer, that is saved in an object named `fieldAnswers`
- the answer template is chosen at random and the `$answer` is replaced in the template, that filled template is saved in the store in an the same object as `filledTemplate`
- the essay is created based on the filled templates that are currently saved in the store
- the Preview component is reponsible for bolding the user's text. The answers in `fieldAnswers` are being matched and bolded incorresponding sentences from `filledTemplate`.

Because the `fieldAnswers` is an object that contains all data related to particular answer I can also track changes to the individual questions and select a different template in case a given answer has changed. This way changing template would not affect other filled templates.

### Input validation & Error handling

#### The problem and Options

There are various packages available for form validation. However I decided not to use them, because at the moment the input
requirements are pretty straightforward and custom validation makes the application size smaller. May the requirements and number of question grow this should be further looked into. At the moment I only make sure that the answer is longer than 1 character (one letter word would not make much sense as an answer).

#### My solution

Most of the validation is done in the store. The reason for that is because based on user's input the store decides whether
the user removed the value or not - the essay text can then be updated. This way the component stays unaware of main logic, and has very simple role. If the validation was done within the component then the component would have to track the previous value and a new value and dispatch appropriate actions. The main logic would also be placed in multiple places and this way hard to follow, and test.

The flow for validation is as follows:

- If the user's input is less then 2 characters, or user made the input field dirty (typed and removed the answer) - the error for the field is set in the store in `errors` object.
- If the user's input is an empty string the field answer is set to null, and the filled template is set to an empty string.
