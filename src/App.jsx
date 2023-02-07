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

  const BIRD_SIZE = 20
  const GAMEBOX_HEIGHT = 500
  const GAMEBOX_WIDTH = 500
  const GRAVITY = 7

  useEffect(() => {
    let timeId;
    if (birdPosition < GAMEBOX_HEIGHT - BIRD_SIZE) {
      timeId = setInterval(() => {
        setBirdPosition((birdPosition) => birdPosition + GRAVITY)
      }, 24)
    }

    return () => {
      clearInterval(timeId)
    }
  })

  return (
    <Container>
      <GameBox height={GAMEBOX_HEIGHT} width={GAMEBOX_WIDTH}>
        <Bird size={BIRD_SIZE} top={birdPosition}/>
      </GameBox>
    </Container>
  )
}

