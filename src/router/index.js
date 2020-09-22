import _ from 'lodash'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Preview from '../views/Preview.vue'
import Quiz from '../views/Quiz.vue'
import Monsters from '../db.json'

Vue.use(VueRouter)

const monstersKeys = _.keys(Monsters)

const routes = [
    {
        path: `/p/:monster(${monstersKeys.join('|')})`,
        name: 'Preview',
        component: Preview
    },
    {
        path: `/q/:monster(${monstersKeys.join('|')})`,
        name: 'Quiz',
        component: Quiz
    },
    {
        path: '*',
        name: 'Default',
        redirect: {
            name: 'Preview',
            params: {
                monster: _.head(monstersKeys)
            }
        }
    }
]

const router = new VueRouter({
    routes
})

export default router
