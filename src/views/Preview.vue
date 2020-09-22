<template>
    <div class="preview" :style="{ background }">
        <div class="light" :style="{ width: `${squareSize}px`, height: `${squareSize}px` }"></div>
        <MonsterPreview
            v-for="monster in monsters"
            :class="{ active: monster.name == $route.params.monster }"
            :key="monster.name"
            :name="monster.name"
        />
    </div>
</template>

<script>
import _ from 'lodash'
import Monsters from '@/db.json'
import MonsterPreview from '@/components/MonsterPreview.vue'

export default {
    components: {
        MonsterPreview
    },
    data() {
        return {
            monsters: _.map(Monsters, (value, name) => ({ name, color: value.color })),
            background: '#cccccc',
            squareSize: 0
        }
    },
    watch: {
        $route() {
            this.changeBackground()
        }
    },
    created() {
        this.changeBackground()
    },
    mounted() {
        this.changeSquareSize()
        window.addEventListener('resize', this.changeSquareSize)
    },
    methods: {
        changeSquareSize() {
            this.squareSize = (window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth) * 1.5
        },
        changeBackground() {
            this.background = _.find(this.monsters, { name: this.$route.params.monster }).color
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.changeSquareSize)
    }
}
</script>

<style lang="scss">
.preview {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transition: background 0.6s ease-in-out;

    @keyframes light {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .light {
        position: absolute;
        width: 0;
        height: 0;
        background: url('/light.svg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        animation: light 60s linear infinite;
    }

    .monster-preview {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s linear;

        &.active {
            opacity: 1;
            pointer-events: all;
        }
    }
}
</style>
