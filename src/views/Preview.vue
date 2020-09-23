<template>
    <div class="preview" :style="{ background }">
        <Light />
        <MonsterPreview
            v-for="monster in monsters"
            :class="{ active: monster.name == $route.params.monster }"
            :key="monster.name"
            :name="monster.name"
            :finished="monster.finished"
        />
        <div class="navigation">
            <router-link
                class="item"
                v-for="monster in monsters"
                :class="{ active: monster.name == $route.params.monster }"
                :key="monster.name"
                :to="{
                    name: !monster.finished && monster.name == $route.params.monster ? 'Quiz' : 'Preview',
                    params: { monster: monster.name }
                }"
            >
                <img
                    :src="
                        !monster.finished && monster.name == $route.params.monster
                            ? '/MotivateMonstersToRead/dist/start.svg'
                            : `/MotivateMonstersToRead/dist/monsters/${monster.name}/${monster.finished ? 'body' : 'shadow'}.svg`
                    "
                />
            </router-link>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import Lockr from 'lockr'
import Monsters from '@/db.json'
import Light from '@/components/Light.vue'
import MonsterPreview from '@/components/MonsterPreview.vue'

export default {
    components: {
        Light,
        MonsterPreview
    },
    data() {
        return {
            monsters: _.map(Monsters, (value, name) => {
                return {
                    name,
                    color: value.color,
                    finished: Lockr.get(name, 0) === value.question.length
                }
            }),
            background: '#cccccc'
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

    methods: {
        changeBackground() {
            this.background = _.find(this.monsters, { name: this.$route.params.monster }).color
        }
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

    .light {
        margin-top: -10vh;
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

    .navigation {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row-reverse;
        flex-wrap: wrap;
        width: 100%;
        left: 0;
        bottom: 5vh;

        .item {
            position: relative;
            display: flex;
            width: 110px;
            height: 45px;
            align-items: center;
            justify-content: center;
            background: url('/MotivateMonstersToRead/dist/shape.svg') center no-repeat;
            margin: 6px;

            img {
                height: 24px;
            }

            &.active {
                background: url('/MotivateMonstersToRead/dist/shape-w.svg') center no-repeat;

                img {
                    height: 22px;
                }
            }
        }
    }
}
</style>
