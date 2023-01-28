const choice_block = document.querySelectorAll('.choiceBlock')
const p_score = document.querySelector('#p_score')
const c_score = document.querySelector('#c_score')
const round_result = document.querySelector('#round_result')
const end_game = document.querySelector('.end_game')
const start_game = document.querySelector('.start_game')
const info_page = document.querySelector('.directions')
const end_title = document.querySelector('.end_title')
const restart = document.querySelector('.restart')
const start = document.querySelector('.start')
const info = document.querySelector('.game_info')
const back = document.querySelector('.back')

let comp_score = 0
let player_score = 0

const game_key = [
  { pick: 'Rock', beats: 'Scissors' },
  { pick: 'Paper', beats: 'Rock' },
  { pick: 'Scissors', beats: 'Paper' }
]

// Game functionality
for (let index = 0; index < choice_block.length; index++) {
  choice_block[index].addEventListener('click', () => {

    let player_pick = game_key[index]
    let random_num = Math.floor(Math.random() * 3)

    userInterface.set_indicators(index, random_num)

    // Delay for message and scoring
    setTimeout(() => {

      // Game logic
      switch (true) {
        // Player beats computer
        case game_key[random_num].pick == player_pick.beats:
          gameMechanics.player_win(player_pick.pick, game_key[random_num].pick);
          break;
        // Computer beats player
        case player_pick.pick == game_key[random_num].beats:
          gameMechanics.computer_win(game_key[random_num].pick, player_pick.pick);
          break;
        // round is a tie
        default:
          gameMechanics.draw(index)
      }
      setTimeout(() => {
        userInterface.new_round(index, random_num)
      }, 1000)
    }, 1500)
  })
}
//userInterface.new_game()
const userInterface = (() => {

  //new game
  const new_game = () => {
    start.addEventListener('click', () => {
      console.log('click')
      start_game.classList.add('hidden')
    })
  }

  //restart game
  const restart_game = () => {
    restart.addEventListener('click', () => {
      console.log('check')
      end_game.classList.toggle('hidden')
      comp_score = 0
      c_score.innerText = comp_score
      player_score = 0
      p_score.innerText = player_score
    })
  }

  // Info page
  const instructions = () => {
    info.addEventListener('click', () => {
      console.log('click')
      info_page.classList.toggle('hidden')
    })
  }
  // Back button on info page
  const go_back = () => {
    back.addEventListener('click', () => {
      console.log('click')
      info_page.classList.toggle('hidden')
    })
  }

  // Clear message and indicators
  const new_round = (index, num) => {
    choice_block[index].style.boxShadow = 'none'
    choice_block[num].style.boxShadow = 'none'
    round_result.innerText = ""
  }

  // set choice indicators
  const set_indicators = (index, num) => {
    // Player choice indicator
    choice_block[index].style.boxShadow = 'inset 8px 8px 10px 7px #1B0AFF'

    // Delay for computer choice
    setTimeout(() => {
      choice_block[num].style.boxShadow = 'inset -8px -8px 13px 7px #FF1919'
    }, 500);
  }

  return {
    new_game,
    restart_game,
    instructions,
    go_back,
    new_round,
    set_indicators
  }
})()
userInterface.new_game()
userInterface.restart_game()
userInterface.instructions()
userInterface.go_back()

const gameMechanics = (() => {

  const player_win = (winning_pick, losing_pick) => {
    round_result.innerText = `Win - ${winning_pick} beats ${losing_pick}`;
    player_score++;
    p_score.innerText = player_score;
    if (player_score === 5) {
      end_title.innerText = 'Congratulations You Win!'
      end_game.classList.toggle('hidden');


    }
  }
  const computer_win = (winning_pick, losing_pick) => {
    round_result.innerText = `Lose - ${winning_pick} beats ${losing_pick}`;
    comp_score++;
    c_score.innerText = comp_score;
    if (comp_score === 5) {
      end_title.innerText = "Sorry, you didn't win this time."
      end_game.classList.toggle('hidden');

    }
  }

  const draw = (num) => {
    choice_block[num].style.boxShadow = 'inset 0px 0px 25px 11px rgba(18,255,0,0.43)'
    round_result.innerText = 'The round is a draw!'
  }

  return {
    player_win,
    computer_win,
    draw
  }

})()