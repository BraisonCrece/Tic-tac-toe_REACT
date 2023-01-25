import React, { useState } from 'react'
import JSConfetti from 'js-confetti'
import { Square } from './components/Square.jsx'
import { TURNS, WINNER_COMBOS } from './constants.js'
import { checkWinner, chekEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'


function App() {
  const [board, setBoard] = useState(() => {
    const localBoard = window.localStorage.getItem('board')
    return localBoard ? JSON.parse(localBoard) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const localTurn = window.localStorage.getItem('turn')
    return localTurn ? JSON.parse(localTurn) : TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X)
    window.localStorage.setItem('turn', JSON.stringify(turn === TURNS.X ? TURNS.O : TURNS.X))
    const playerWins = checkWinner(newBoard)
    if (playerWins) {
      setWinner(playerWins)
      const confetti = new JSConfetti()
      confetti.addConfetti({
        emojiSize: 100,
        confettiNumber: 500,
      })
    } else if (chekEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={() => { resetGame() }}>
        Empezar de nuevo
      </button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
