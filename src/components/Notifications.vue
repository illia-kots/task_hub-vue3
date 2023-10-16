<script lang="ts">
export default {
  name: 'Notifications',
  props: {
    active: Boolean,
  },
  emits: ['hide'],
  mounted() {
    setInterval(() => {
      this.hide();
    }, 3000);
  },
  methods: {
    hide() {
      this.$emit('hide');
    },
  },
};
</script>

<template>
  <div
    class="notification is-light has-text-weight-normal"
    :class="{ 'hidden': !active }"
  >
    <button
      type="button"
      class="delete"
      @click="hide"
    />
      <slot></slot>
  </div>
</template>
