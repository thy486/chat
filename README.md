# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## Notes
# CSS flex 布局之省略号问题

```html
<div class="A">
    <div class="B">
        <div class="C">
            我是一段需要省略的文字
            我是一段需要省略的文字
            我是一段需要省略的文字
            我是一段需要省略的文字
            我是一段需要省略的文字
            我是一段需要省略的文字
            我是一段需要省略的文字
            我是一段需要省略的文字
        </div>
    </div>
</div>
<style>
    .A {
        display: flex;
    }
    .B {
        overflow: hidden;
    }
    .C {
        overflow: hidden; /* 溢出部分隐藏 */
        text-overflow: ellipsis; /* 溢出用省略号显示 */
        white-space: nowrap; /* 不换行 */
    }
</style>
```

* B 样式的 `overflow: hidden;`  的属性的是相对于C来设置的。
* 踩坑: <font color="red">当 A 样式设置  </font>`align-items: flex-start;`<font color="red"> 属性时，B样式还需要搭配</font>  `max-width: 100%;` <font color="red">否则省略号消失。这个属性的是相对于A来设置的。</font>
* `max-width: 100%;` 不生效则可以尝试 `width: 0;`
