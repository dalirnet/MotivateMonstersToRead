<template>
    <div class="quiz">
        <MonsterQuiz :name="$route.params.monster" />
    </div>
</template>

<script>
import MonsterQuiz from '@/components/MonsterQuiz.vue'

export default {
    components: {
        MonsterQuiz
    }
}
</script>

<style lang="scss">
.quiz {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #f9f9f9;
}
</style>
