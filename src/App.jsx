//
import React, { useState, useEffect }from "react"
import styled from "styled-components"

//
import { 
  Bird 
} from './components/Bird'

// Styles
import {
  Container,
  GameBox,
} from './styles/styles'

export default function App() {
  const [birdPosition, setBirdPosition] = useState(250)
  const [gameStarted, setGameStarted] = useState(false)

  const BIRD_SIZE = 20
  const GAMEBOX_HEIGHT = 500
  const GAMEBOX_WIDTH = 500
  const GRAVITY = 7
  const JUMP_HEIGHT = 100

  useEffect(() => {
    let timeId;
    if (gameStarted && birdPosition < GAMEBOX_HEIGHT - BIRD_SIZE) {
      timeId = setInterval(() => {
        setBirdPosition((birdPosition) => birdPosition + GRAVITY)
      }, 24)
    }

    return () => {
      clearInterval(timeId)
    }
  }, [birdPosition, gameStarted])

  const handleJump = () => {
    let newBirdPosition = birdPosition - JUMP_HEIGHT
    if (!gameStarted) {
      setGameStarted(true)
    } else if (newBirdPosition < 0) {
      setBirdPosition(0)
    } else {
      setBirdPosition(newBirdPosition)
    }

  }

  return (
    <Container onClick={handleJump}>
      <GameBox height={GAMEBOX_HEIGHT} width={GAMEBOX_WIDTH}>
        <Bird size={BIRD_SIZE} top={birdPosition}/>
      </GameBox>
    </Container>
  )
}

