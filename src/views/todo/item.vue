
<template>
    <div :class="['todo-item', todo.completed ? 'completed' : '']">
        <input type="checkbox" class="toggle" v-model="todo.completed" />
        <label for="">{{ todo.content }}</label>
        <button class="destory" @click="deleteTodo"></button>
    </div>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true,
            default: () => {
                return { completed: false, id: '', content: '' };
            },
        },
    },
    methods: {
        deleteTodo() {
            console.log(this.todo.id);
            this.$emit('del', this.todo.id);
        },
    },
};
</script>

<style lang="less" scoped>
.todo-item {
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    background-color: #fff;

    &:hover {
        .destory::after {
            content: 'x';
        }
    }

    label {
        display: block;
        margin-left: 45px;
        padding: 15px 60px 15px 15px;
        line-height: 1.2em;
        white-space: pre-line;
        word-break: break-all;
        transition: color 0.4s;
    }

    &.completed {
        label {
            color: #d9d9d9;
            text-decoration: line-through;
        }
    }
}

.toggle {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    text-align: center;
    border: none;
    appearance: none;
    outline: none;
    cursor: pointer;

    .checkbox-style(@url) {
        content: '';
        position: absolute;
        left: 8px;
        top: 0;
        background-image: url(@url);
        background-size: cover;
        height: 40px;
        width: 40px;
    }

    &::after {
        .checkbox-style('../../assets/images/todo.png');
    }

    &:checked::after {
        .checkbox-style('../../assets/images/done.png');
    }
}

.destory {
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
    background-color: transparent;
    appearance: none;
    border-width: 0;
    outline: none;
    cursor: pointer;
}
</style>
