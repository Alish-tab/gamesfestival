export default ($axios) => ({
    fifa() {
        return $axios.get('/fifa/')
    },
    dota() {
        return $axios.get('/dota2/')
    },
    csgo() {
        return $axios.get('/csgo/')
    }
})