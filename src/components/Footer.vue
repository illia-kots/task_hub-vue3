<script lang="ts">
import type { Todo } from '@/types/Todo';

export default {
  props: {
    todos: {
      type: Array as () => Todo[],
      default: () => [],
    },
    modelValue: String,
    activeTodos: Array as () => Todo[],
    completedTodos: Array as () => Todo[],
  },
  emits: ['delete', 'update:modelValue'],
  methods: {
    removeCompletedTodos() {
      this.completedTodos?.forEach((todo) => {
        this.$emit('delete', todo.id);
      });
    },
  },
};
</script>

<template>
  <footer class="todoapp__footer">
    <span class="todo-count" data-cy="todosCounter">
      {{`${activeTodos?.length} item${activeTodos?.length === 1 ? '' : 's'} left `}}
    </span>

    <nav class="filter">
      <router-link
        to="/"
        class="filter__link"
        :class="{ selected: modelValue === 'all' }"
        @click="$emit('update:modelValue', 'all')"
      >
        All
      </router-link>

      <router-link
        to="/active"
        class="filter__link"
        :class="{ selected: modelValue === 'active' }"
        @click="$emit('update:modelValue', 'active')"
      >
        Active
      </router-link>

      <router-link
        to="/completed"
        class="filter__link"
        :class="{ selected: modelValue === 'completed' }"
        @click="$emit('update:modelValue', 'completed')"
      >
        Complete
      </router-link>
    </nav>

    <button
      type="button"
      class='todoapp__clear-completed'
      :class="{ 'todoapp__clear-completed--hidden': !completedTodos?.length }"
      @click="removeCompletedTodos"
    >
      Clear completed
    </button>
  </footer>
</template>
