<template>
    <div class="monster-quiz" :style="{ background: monster.color }">
        <Light />
        <div class="inner">
            <div class="header">
                <router-link
                    class="home"
                    :style="{ borderColor: monster.color }"
                    :to="{ name: 'Preview', params: { monster: name } }"
                >
                    <img class="image" :src="`/monsters/${name}/shadow.svg`" />
                </router-link>
                <img class="name" :src="`/monsters/${name}/name.svg`" />
                <span class="counter">
                    <small>{{ convertNumber(currenQuestion >= allQuestion ? allQuestion : currenQuestion + 1) }}</small>
                    <small :style="{ color: monster.color }"> / </small>
                    <strong>{{ convertNumber(allQuestion) }}</strong>
                </span>
            </div>
            <div class="question">
                <div class="text">
                    <span class="word" v-for="(word, key) in question" :key="key">
                        <span :class="{ active: key == pointer }">{{ word }}</span>
                        <span class="space"></span>
                    </span>
                </div>
            </div>
            <div class="answer">
                <span class="item" v-for="(word, key) in answer" :key="key" @click="checkAnswer(word)">
                    <span>{{ word }}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import Lockr from 'lockr'
import Monsters from '@/db.json'
import Light from '@/components/Light.vue'

export default {
    components: {
        Light
    },
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            answer: ['', '', '', ''],
            currenQuestion: Lockr.get(this.name, 0),
            pointer: 0,
            renew: 0
        }
    },
    watch: {
        currenQuestion(value) {
            Lockr.set(this.name, value)
        },
        pointer() {
            this.initAnswer()
        },
        renew() {
            this.initAnswer()
        }
    },
    computed: {
        monster() {
            return _.get(Monsters, this.name)
        },
        allQuestion() {
            return this.monster.question.length
        },
        question() {
            return _.split(
                this.convertNumber(
                    _.get(
                        this.monster.question,
                        this.currenQuestion >= this.allQuestion ? this.allQuestion - 1 : this.currenQuestion
                    )
                ),
                ' '
            )
        },
        currenWord() {
            return _.get(this.question, this.pointer)
        }
    },
    mounted() {
        this.initAnswer()
    },
    methods: {
        initAnswer() {
            this.answer = _.shuffle([
                this.currenWord,
                ..._.take(_.shuffle(_.without(this.question, this.currenWord)), 3)
            ])
        },
        checkAnswer(word) {
            if (word == this.currenWord) {
                if (this.pointer < this.question.length - 1) {
                    this.pointer++
                } else {
                    if (this.currenQuestion < this.allQuestion - 1) {
                        this.pointer = -1
                        this.$nextTick(() => {
                            this.answer = []
                            setTimeout(() => {
                                this.currenQuestion++
                                this.$nextTick(() => {
                                    this.pointer = 0
                                })
                            }, 2000)
                        })
                    } else {
                        this.pointer = -1
                        this.currenQuestion = this.allQuestion
                        this.$nextTick(() => {
                            this.answer = []
                            setTimeout(() => {
                                this.$router.push({ name: 'Preview', params: { monster: this.name } })
                            }, 2000)
                        })
                    }
                }
            } else {
                this.renew++
            }
        },
        convertNumber(input, toPersian = true) {
            if (!_.isString(input) && !_.isNumber(input)) {
                return input
            }
            if (toPersian) {
                return input
                    .toString()
                    .replace(/0/g, '۰')
                    .replace(/1/g, '۱')
                    .replace(/2/g, '۲')
                    .replace(/3/g, '۳')
                    .replace(/4/g, '۴')
                    .replace(/5/g, '۵')
                    .replace(/6/g, '۶')
                    .replace(/7/g, '۷')
                    .replace(/8/g, '۸')
                    .replace(/9/g, '۹')
            } else {
                return input
                    .toString()
                    .replace(/۰/g, '0')
                    .replace(/۱/g, '1')
                    .replace(/۲/g, '2')
                    .replace(/۳/g, '3')
                    .replace(/۴/g, '4')
                    .replace(/۵/g, '5')
                    .replace(/۶/g, '6')
                    .replace(/۷/g, '7')
                    .replace(/۸/g, '8')
                    .replace(/۹/g, '9')
            }
        }
    }
}
</script>

<style lang="scss">
.monster-quiz {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    align-self: stretch;

    .light {
        animation: none;
    }

    .inner {
        display: flex;
        align-self: stretch;
        flex: 1;
        flex-direction: column;
        padding: 24px;
        box-sizing: border-box;
        z-index: 1;
    }

    .header,
    .question,
    .answer {
        display: flex;
    }

    .header {
        align-items: center;
        justify-content: space-between;
        border-radius: 20px 20px 0 0;
        background: rgba(255, 255, 255, 0.8);
        padding: 20px;

        .home {
            position: relative;
            display: flex;
            top: 2px;
            height: 28px;
            width: 28px;
            align-items: center;
            justify-content: center;
            border: solid 1px;
            padding: 3px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);

            img {
                height: 22px;
                max-width: 22px;
            }
        }

        .name {
            height: 30px;
            padding-top: 2px;
        }

        .counter {
            line-height: 0;
            font-size: 20px;
            padding-top: 6px;
        }
    }

    .question {
        align-items: flex-start;
        justify-content: center;
        flex: 1;
        background: rgba(255, 255, 255, 0.8);
        padding: 40px 20px 20px 20px;
        font-size: 20px;

        .text {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            color: #555;
            line-height: 50px;
            text-align: justify;
        }

        .word {
            .space {
                margin: 0 5px;
            }

            .active {
                font-size: 24px;
                background: rgba(255, 255, 255, 0.75);
                border: solid 1px rgba(0, 0, 0, 0.075);
                padding: 4px 10px 6px 10px;
                border-radius: 10px;
                color: #000;
            }
        }
    }

    .answer {
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        border-radius: 0 0 20px 20px;
        background: rgba(255, 255, 255, 0.8);
        padding: 20px;

        .item {
            position: relative;
            display: flex;
            width: 120px;
            height: 47px;
            align-items: center;
            justify-content: center;
            background: url('/shape-w.svg') center no-repeat;
            color: #fff;
            margin: 10px;
            cursor: pointer;
            transition: transform 0.1s linear;

            &:hover {
                transform: scale(1.05);
            }
        }
    }
}
</style>
