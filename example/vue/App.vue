<script setup lang="ts">
import createApi from '../../src/adaptor/vue'
import DialogForm from './DialogForm.vue'

async function handleClick() {
  const form = await createApi<{ name: string, region: string }>(DialogForm)({ title: 'My shipping address' })
  // eslint-disable-next-line no-console
  console.log('form', form.name, form.region)
}
</script>

<template>
  <div>
    <button type="button" @click="handleClick">
      vue button
    </button>
  </div>
</template>

<style>
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
  margin-bottom: 10px;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
