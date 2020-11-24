
<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="what do you want to do"
            @keyup.enter="addTodo"
        />
        <Item :todo="todo" v-for="todo in filteredTodos" :key="todo.id" @del="deleteTodo" />
        <Tabs
            :filter="filter"
            :todos="todos"
            @toggle="toggleFilter"
            @clear-all="clearAllCompleted"
        />
    </section>
</template>

<script>
import Item from './item.vue';
import Tabs from './tabs.vue';

let id = 0;
export default {
    data() {
        return {
            todos: [],
            filter: 'all',
        };
    },
    components: {
        Item,
        Tabs,
    },
    computed: {
        filteredTodos() {
            if (this.filter === 'all') {
                return this.todos;
            }
            const completed = this.filter === 'completed';
            return this.todos.filter(todo => todo.completed === completed);
        },
    },
    methods: {
        addTodo(e) {
            console.log(id);
            if (e.target.value !== '') {
                this.todos.unshift({
                    id: (id += 1),
                    content: e.target.value.trim(),
                    completed: false,
                });
                e.target.value = '';
            }
        },
        deleteTodo(tId) {
            this.todos.splice(
                this.todos.findIndex(todo => todo.id === tId),
                1,
            );
        },
        toggleFilter(state) {
            this.filter = state;
        },
        clearAllCompleted() {
            console.log(123);
            this.todos = this.todos.filter(todo => !todo.completed);
        },
    },
};
</script>

<style lang="less" scoped>
.real-app {
    width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;

    .add-input {
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        // font-smoothing: antialiased;
        padding: 16px 16px 16px 60px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.4);
    }
}
</style>
