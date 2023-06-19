export default($axios) => ({
    getGames() {
       return $axios.get('/game/')
    }
})