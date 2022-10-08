export const state = () => ({
    workItems: [
        {
            type: 'full',
            image: [require('~/assets/images/01.jpg')],
            alt: '01.jpg'
        },
        {
            type: 'full',
            image: [require('~/assets/images/01.jpg')],
            alt: '01.jpg'
        },
        {
            type: 'half',
            image: [require('~/assets/images/01.jpg')],
            alt: '01.jpg'
        },
        {
            type: 'half',
            image: [require('~/assets/images/01.jpg')],
            alt: '01.jpg'
        }
    ]
})

export const getters = {
    getCounter(state) {
        return state.counter
    }
}

export const mutations = {
    increment(state) {
        state.counter++
    }
}

export const actions = {
    async fetchCounter({ state }) {
        // make request
        const res = { data: 10 };
        state.counter = res.data;
        return res.data;
    }
}