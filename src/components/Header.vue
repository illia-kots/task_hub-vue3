<script lang="ts">
import { createTodo } from '../api/todos';
import type { Todo } from '@/types/Todo';

export default {
  props: {
    todos: {
      type: Array as () => Todo[],
      default: () => [],
    },
    activeTodos: Array as () => Todo[],
    completedTodos: Array as () => Todo[],
  },
  emits: ['update', 'updateErrorMessage'],
  data() {
    return {
      title: '',
    };
  },
  methods: {
    handleSubmit() {
      if (!this.title.trim()) {
        this.$emit('updateErrorMessage', 'Title can\'t be empty');

        return;
      }

      createTodo(this.title)
        .then(({ data }) => {
          this.todos.push(data);
          this.title = '';
        })
        .catch(() => {
          this.$emit('updateErrorMessage', 'Unable to add a todo');
        });
    },
    toggleAllTodos() {
      const allTogglers = this.completedTodos?.length !== this.todos.length
        ? this.activeTodos
        : this.todos;

      allTogglers?.forEach((todo) => {
        this.$emit('update', {
          ...todo,
          completed: !todo.completed,
        });
      });
    },
  },
};
</script>

<template>
  <header class="todoapp__header">
    <button
      v-if="!!todos.length"
      type="button"
      class="todoapp__toggle-all"
      :class="{ active: !activeTodos?.length }"
      @click="toggleAllTodos"
    ></button>

    <form @submit.prevent="handleSubmit">
      <input
        type="text"
        class="todoapp__new-todo"
        placeholder="What needs to be done?"
        v-model="title"
      />
    </form>
  </header>
</template>
