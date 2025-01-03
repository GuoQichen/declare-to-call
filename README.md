# declare-to-call

Make declarative components callable in an imperative way

## Features

* ✨ Support for React and Vue
* 💅 Support for asynchronous calls to multiple components
* 🚀 Only 1kb in size

## Usage

### Installation

```shell
npm install declare-to-call
```

### Using in React

#### Mount Container
```tsx
// main.tsx
import { Mount } from 'declare-to-call'
import _App from './App.tsx'

const App = Mount(_App)

createRoot(document.getElementById('react-root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

#### Calling Components
```tsx
// App.tsx
import createApi from 'declare-to-call'
import MyFormDialog from './MyFormDialog.tsx'
const createMyFormDialog = createApi(MyFormDialog)

export default function App() {
  const handleClick = async () => {
    const result = await createMyFormDialog({ title: 'Create My Form Dialog' })
    console.log('result', result)
  }

  return <button onClick={handleClick}>click me</button>
}
```

#### Using Children
```tsx
// App.tsx
export default function App() {
  const handleClick = async () => {
    const myProps = { title: 'Create My Form Dialog' }
    const result = await createMyFormDialog(myProps, () => <div className="foo">bar</div>)
    console.log('result', result)
  }

  return <button onClick={handleClick}>click me</button>
}
```

### Using in Vue

#### Mount Container
```tsx
// main.ts
import { Mount } from 'declare-to-call/vue'
import App from './App.vue'

createApp(Mount(App)).mount('#app')
```

#### Calling Components
```html
// App.vue
<script setup lang="ts">
import createApi from 'declare-to-call/vue'
import MyFormDialog from './MyFormDialog.vue'
const createMyFormDialog = createApi(MyFormDialog)

async function handleClick() {
  const result = await createMyFormDialog({ title: 'Create My Form Dialog' })
  console.log('result', result)
}
</script>

<template>
  <button @click="handleClick">click me</button>
</template>
```

#### Using Children
```html
<script setup lang="ts">
async function handleClick() {
  const myProps = { title: 'Create My Form Dialog' }
  const result = await createMyFormDialog(myProps, (h) => h('div', { class: 'foo' }, 'bar'))
  console.log('result', result)
}
</script>

<template>
  <button @click="handleClick">click me</button>
</template>
```

## License

This library was created under the [MIT License](LICENSE).
