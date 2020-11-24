
<template>
    <div class="helper">
        <span class="left">{{ unFinishedTodoLength }} items left</span>
        <span class="tabs">
            <span
                v-for="state in stats"
                :key="state"
                :class="[state, filter === state ? 'actived' : '']"
                @click="toggleFilter(state)"
            >
                {{ state }}
            </span>
        </span>
        <span class="clear" @click="clearAllCompleted">Clear Completed</span>
    </div>
</template>

<script>
export default {
    props: {
        filter: {
            type: String,
            required: true,
        },
        todos: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            stats: ['all', 'active', 'completed'],
        };
    },
    computed: {
        unFinishedTodoLength() {
            return this.todos.filter(todo => todo.completed === false).length;
        },
    },
    methods: {
        clearAllCompleted() {
            this.$emit('clear-all');
        },
        toggleFilter(state) {
            this.$emit('toggle', state);
        },
    },
};
</script>

<style lang="less" scoped>
.helper {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    line-height: 30px;
    font-size: 14px;
    font-weight: 100;
    background-color: #fff;
}

.left,
.clear,
.tabs {
    padding: 0 10px;
    box-sizing: border-box;
}

.left .clear {
    width: 150px;
}

.left {
    text-align: left;
}

.clear {
    text-align: right;
    cursor: pointer;
}

.tabs {
    display: flex;
    width: 200px;
    justify-content: space-around;

    * {
        display: inline-block;
        padding: 0 10px;
        cursor: pointer;
        border: 1px solid rgba(175, 47, 47, 0);

        &.actived {
            border-color: rgba(175, 47, 47, 0.4);
            border-radius: 5px;
        }
    }
}
</style>
