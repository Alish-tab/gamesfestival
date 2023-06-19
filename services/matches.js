export default ($axios) => ({
    match() {
        return $axios.get('/match/')
    },

    deleteMatch(id){
        return $axios.delete(`/match/${id}`)
    },

    editMatch(id,match){
        return $axios.put(`/match/${id}`, {match})
    }
})