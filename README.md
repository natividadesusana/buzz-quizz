# Project #06 - Project: BuzzQuizz

## Project developed for Bootcamp Driven Education

_____

<img width="782" alt="Captura de Tela 2023-01-30 às 21 22 50" src="https://user-images.githubusercontent.com/95102911/215626947-7353ae54-a251-4bd4-90c5-d036f67bc56a.png">

_____

<img width="895" alt="Captura de Tela 2023-01-30 às 21 23 29" src="https://user-images.githubusercontent.com/95102911/215626958-4aee343c-6e07-4f1e-a857-2e9c909ae649.png">

_____

## ✅ Requirements

- General
     - [ ] Do not use any library to implement this project (jquery, lodash, etc), only pure JavaScript (exception: axios library) and also do not use other languages that translate to JavaScript (ClojureScript, Elm, etc).
     - [ ] Your project must be developed using Git and GitHub. For each implemented requirement, make a commit with a descriptive message of what you have evolved.
     - [ ] All screens must be implemented in a single HTML file. If you prefer, for organization purposes, you can split your JavaScript/CSS into multiple files.
- *Layout*
     - [ ] Apply the *layout* for mobile and desktop, following the provided Figma.
     - [ ] *layout* should switch to mobile version when window width is less than 1100px.
- Screen 1: List of quizzes
     - [ ] On this screen, the quizzes provided by the server must be listed, following the *layout* offered.
     - [ ] The user's quiz list should only show your quizzes, while the bottom list should show all received quizzes, without the user's. To differentiate user quizzes from others, see requirement **User Quizzes.**
     - [ ] Quizzes must be displayed in a rectangular format (according to *layout*), with the quizz image and title. The image should be overlaid with a gradient from black to transparent. When clicking on the quizz, this screen should disappear and give way to **Screen 2: Page of a quizz** of the quizz in question.
        
         🔥 **Tip**: search for how to make gradient (gradient) with CSS.
        
     - [ ] When clicking on "Create Quizz" or on the "+" this screen should disappear, giving way to the screen of **Screen 3: Quizz Creation.**
- Screen 2: Quizz page (questions)
     - [ ] At the top of the quiz, a banner with the image and title of the quiz must be displayed. The image should be darkened with a black layer of 60% opacity.
     - [ ] The answers to each question must be displayed randomly.
     - [ ] When clicking on an answer, the others should gain the "whitish" effect of the *layout.*
     - [ ] It should not be possible to change the answer after choosing.
     - [ ] After choosing an answer, the text of the options must be red or green, according to the layout, indicating which were the wrong and right answers.
     - [ ] After two seconds of answering, you must scroll the page to the next question.
- Screen 2: Quizz page (quizz end)
     - [ ] After answering all the questions, the quiz result box should appear at the end of the screen. As with passing questions, you must wait two seconds after the last answer and then scroll the screen to display this result box.
     - [ ] The quiz score (percentage of correct answers over total questions) must be calculated in the *front*, without any communication with the server, as well as the ranking of which level the user was based on this score.
     - [ ] The title, image and description of the level that the user got should be displayed.
     - [ ] The *score* must be rounded so as not to have decimal places.
        
         🔥 **Tip**: search for `Math.ceil`, `Math.floor`, `Math.round` functions (and use the one you prefer).
        
     - [ ] When clicking on the "Restart Quizz" button, the screen should be scrolled back to the top, the answers reset to the initial state and the result box hidden again.
     - [ ] When clicking on the "Back to home" button, this screen should disappear and give way to **Screen 1: List of quizzes.**
- Screen 3: Quizz creation
     - [ ] The process of creating a quiz will go through 4 screens, following the *layout*:
         - Screen 3.1: Basic information of the quiz.
         - Screen 3.2: Quizz questions.
         - Screen 3.3: Quizz levels.
         - Screen 3.4: Success of the quiz.
     - [ ] At each step, before advancing to the next screen, validations must be made in the entered information, following the rules below:
         - Basic quiz information
             - [ ] Quizz title: must have a minimum of 20 and a maximum of 65 characters.
             - [ ] Image URL: must have URL format.
             - [ ] Number of questions: at least 3 questions.
             - [ ] Number of levels: at least 2 levels.
         - quiz questions
             - [ ] Question text: at least 20 characters.
             - [ ] Background color: must be a color in hexadecimal (starting with "#", followed by 6 hexadecimal characters, that is, numbers or letters from A to F).
             - [ ] Response texts: cannot be empty.
             - [ ] URL of response images: must have URL format.
             - [ ] It is mandatory to insert the correct answer and at least 1 wrong answer. Therefore, it is allowed to have questions with only 2 or 3 answers instead of 4.
         - Quizz levels
             - [ ] Level Title: Minimum 10 characters.
             - [ ] Minimum Hit %: A number between 0 and 100.
             - [ ] Level Image URL: Must be in URL format.
             - [ ] Level Description: Minimum 30 characters.
             - [ ] It is mandatory to have at least 1 level whose minimum hit % is 0%.
        - [ ] If any validation fails, an alert should be displayed asking the user to fill in the data correctly. For simplicity, it is not mandatory to inform which validation failed.
        - [ ] When finishing the creation of the quiz and saving it on the server, the user should see **Screen 3.4: Success of the quiz**. On this screen, he can click on the quiz (or on the "Access Quizz" button) to view the created quiz (Screen 2) or go back to home (Screen 1).
        - [ ] When the user returns home (either immediately or later), it should update the listed quizzes to include the newly created quiz.
        - User quizzes
             - [ ] When creating a quiz on the server, it will return the complete object of the quiz created as a response, including the id (unique identifier) that the server generated for this quiz.
             - [ ] In order to be able to differentiate a user-created quiz from other quizzes in the future, you can store these ids when creating the quiz.

                 🔥 **Tip**: For this, you'll use a JavaScript feature called *Local Storage*. We have prepared an article to help you with this:

                 [Article: How to store data on user's computer? (LocalStorage)](https://www.notion.so/Artigo-Como-armazenar-dados-no-computador-do-usu-rio-LocalStorage-c5c124921bec4bd583d98f5f9da061dd)

             - [ ] On **Screen 1: List of quizzes**, you can compare the id of the quizzes coming from the server with these ids stored in the creation of the quizzes to verify if a certain quizz was created by the user in question.

