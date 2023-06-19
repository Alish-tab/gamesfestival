import MatchesService from '~/services/matches'
import ScoreTable from '~/services/scoreTable'
import GameService from '~/services/game'

export default ({$axios},inject) => {

    const matchesService = MatchesService($axios)
    const scoreTableService = ScoreTable($axios)
    const gameService=GameService($axios)

    inject('services',{
        matches:matchesService,
        scoreTable:scoreTableService,
        game:gameService,
    })
}