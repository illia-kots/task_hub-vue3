<script lang="ts">
import type { Todo } from '@/types/Todo';

export default {
  name: 'TodoItem',
  props: {
    todo: Object as () => Todo,
  },
  emits: ['update', 'delete'],
  data() {
    return {
      editing: false,
      newTitle: this.todo?.title,
    };
  },
  methods: {
    toggle() {
      this.$emit('update', {
        ...this.todo,
        completed: !this.todo?.completed,
      });
    },
    rename() {
      if (!this.editing) {
        return;
      }

      this.editing = false;

      if (this.newTitle === this.todo?.title) {
        return;
      }

      if (!this.newTitle?.length) {
        this.remove();

        return;
      }

      this.$emit('update', {
        ...this.todo,
        title: this.newTitle,
      });

      this.newTitle = '';
    },
    remove() {
      this.$emit('delete');
    },
    edit() {
      this.newTitle = this.todo?.title;
      this.editing = true;

      this.$nextTick(() => {
        const titleField = this.$refs.input as HTMLInputElement;

        titleField.focus();
      });
    }
  },
};
</script>

<template>
  <div
    class="todo"
    :class="{ completed: todo?.completed }"
  >
    <label class="todo__status-label">
      <input
        type="checkbox"
        class="todo__status"
        :checked="todo?.completed"
        @change="toggle"
      />
    </label>

    <form
      v-if="editing"
      @submit.prevent="rename"
    >
      <input
        type="text"
        class="todo__title-field"
        placeholder="Empty todo will be deleted"
        ref="input"
        v-model="newTitle"
        @keyup.esc="editing = false"
        @blur="rename"
      />
    </form>

    <template v-else>
      <span
        class="todo__title"
        @dblclick="edit"
      >
        {{ todo?.title }}
      </span>

      <button
        type="button"
        class="todo__remove"
        @click="remove"
      >
        ×
      </button>
    </template>

    <div
      class="modal overlay"
      :class="{ 'is-active': false }"
    >
      <div class="modal-background has-background-white-ter"></div>
      <div class="loader"></div>
    </div>
  </div>
</template>
