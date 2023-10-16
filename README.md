# Task Hub Vue3

[PREVIEW LINK](https://illia-kots.github.io/task_hub-vue3/)

**Tech stack:**
- VueJS
- Vue Router
- JavaScript
- TypeScript
- HTML
- CSS/SCSS
- Bulma

**Project task:**

1. Implement `TodoApp` component with an input field to create new todos on submit. Each item should have:
    - `id`
    - `title`
    - `completed`
1. Show the number of not completed todos in `TodoApp`;
1. Implement `TodoItem` component with ability to toggle the `completed` status using a checkbox.
1. Add the ability to toggle the completed status of all the todos with the `toggleAll` checkbox.
1. Add ability to switch between `All`/`Active`/`Completed` todos.
1. Links should update the URL (`/`, `/active` or `/completed`).
1. Add ability to remove a todo using the `destroy` button (`X`).
1. Add ability to clear completed todos - remove all completed items from the list. The button should contain text `Clear completed` in it.
1. Hide everything except the input to add new todo if there are no todos. But not if todos are just filtered out.
1. Make inline editing for the TODO item
    - double click on the TODO title makes it editable
    - `Enter` saves changes
    - `Ecs` cancels editing
    - Todo title can't be empty! If a user presses `Enter` when the title is empty, this todo should be removed.
    - Save changes `onBlur`
1. Save state of the APP to the `localStorage`
1. Implement saving the todos in [the API](https://mate-academy.github.io/fe-students-api/).
