<script lang="ts">
import { getTodos, updateTodo, deleteTodo } from '../api/todos';
import Header from '../components/Header.vue';
import TodoItem from '../components/TodoItem.vue';
import Footer from '../components/Footer.vue';
import Notifications from '../components/Notifications.vue';
import { getFromLocalStorage } from '../utils/getFromLocalStorage';
import type { Todo } from '../types/Todo';

export default {
  components: {
    Header,
    TodoItem,
    Footer,
    Notifications,
  },
  data() {
    return {
      todos: getFromLocalStorage<Todo[]>('todos', []),
      status: 'all',
      errorMessage: '',
    };
  },
  mounted() {
    getTodos()
      .then(({ data }) => this.todos = data)
      .catch(() => {
        this.errorMessage = 'Unable to load todos';
      });
  },
  computed: {
    activeTodos() {
      return this.todos.filter((todo: Todo) => !todo.completed);
    },
    completedTodos() {
      return this.todos.filter((todo: Todo) => todo.completed);
    },
    visibleTodos() {
      switch (this.status) {
        case 'active':
          return this.activeTodos;

        case 'completed':
          return this.completedTodos;

        default:
          return this.todos;
      }
    }
  },
  watch: {
    todos: {
      deep: true,
      handler() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
      },
    }
  },
  methods: {
    updateTodo({ id, title, completed }: Todo) {
      updateTodo({ id, title, completed })
        .then(({ data }) => {
          this.todos = this.todos.map(
            todo => todo.id !== id ? todo : data,
          );
        })
        .catch(() => {
          this.errorMessage = 'Unable to update a todo';
        });
    },
    deleteTodo(todoId: number) {
      deleteTodo(todoId)
        .then(() => {
          this.todos = this.todos.filter(
            todo => todo.id !== todoId,
          );
        })
        .catch(() => {
          this.errorMessage = 'Unable to delete a todo';
        });
    },
    updateErrorMessage(message: string) {
      this.errorMessage = message;
    },
  },
};
</script>

<template>
  <div class="todoapp">
    <h1 class="todoapp__title">todos</h1>

    <div class="todoapp__content">
      <Header
        :todos="todos"
        :activeTodos="activeTodos"
        :completedTodos="completedTodos"
        @updateErrorMessage="updateErrorMessage"
        @update="updateTodo"
      />

      <TransitionGroup
        name="list"
        tag="section"
        class="todoapp__main"
      >
        <TodoItem
          v-for="todo of visibleTodos"
          :key="todo.id"
          :todo="todo"
          @update="updateTodo"
          @delete="deleteTodo(todo.id)"
        />
      </TransitionGroup>

      <Footer
        v-if="!!todos.length"
        v-model="status"
        :todos="todos"
        :activeTodos="activeTodos"
        :completedTodos="completedTodos"
        @delete="deleteTodo"
      />
    </div>


      <Notifications
        class="is-danger"
        :active="!!errorMessage.length"
        @hide="errorMessage = ''"
      >
        <p>{{ errorMessage }}</p>
      </Notifications>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  max-height: 60px;
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  max-height: 0;
  transform: scaleY(0);
}
</style>
