# declare-to-call

让声明式的组件可以通过命令式的方式调用

## Features

* ✨ 支持 React 和 Vue
* 💅 支持多个组件的异步调用
* 🚀 体积只有 1kb

## Usage

### 安装

```shell
npm install declare-to-call
```

### 在 React 中使用

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

#### 调用组件
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

#### 使用 Children
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

### 在 Vue 中使用

#### Mount Container
```tsx
// main.ts
import { Mount } from 'declare-to-call/vue'
import App from './App.vue'

createApp(Mount(App)).mount('#app')
```

#### 调用组件
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

#### 使用 Children
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
