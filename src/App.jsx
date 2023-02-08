//
import React, { useState, useEffect }from "react"
import styled from "styled-components"
/*
// Components
import { Bird } from './components/Bird'
import { Obstacle } from './components/Obstacle'

// Styles
import {
  Container,
  GameBox,
} from './styles/styles' */

const BIRD_SIZE = 20
const GAMEBOX_HEIGHT = 500
const GAMEBOX_WIDTH = 500
const GRAVITY = 6
const JUMP_HEIGHT = 100
const OBSTACLE_WIDTH = 40
const OBSTACLE_GAP = 200

export default function App() {

  const [birdPosition, setBirdPosition] = useState(250)
  const [gameStarted, setGameStarted] = useState(false)
  const [obstacleHeight, setObstacleHeight] = useState(50)
  const [obstacleLeft, setObstacleLeft] = useState(GAMEBOX_WIDTH - OBSTACLE_WIDTH)

  const bottomObstacleHeight = GAMEBOX_HEIGHT - OBSTACLE_GAP - obstacleHeight

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
        <Obstacle 
          top={0}
          width={OBSTACLE_WIDTH}
          height={obstacleHeight}
          left={obstacleLeft}
        />
        <Obstacle 
          top={GAMEBOX_HEIGHT - (obstacleHeight + bottomObstacleHeight)}
          width={OBSTACLE_WIDTH}
          height={bottomObstacleHeight}
          left={obstacleLeft}
        />
      </GameBox>
    </Container>
  )
}

export const Bird = styled.div`
    position: absolute;
    background-color: red;
    height: ${(props) => props.size}px;
    width: ${(props) => props.size}px;
    margin-top: ${(props) => props.top}px;
    border: 0;
    border-radius: 50%;
`;

export const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

export const GameBox = styled.div`
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    background-color: green;
`;

export const Obstacle = styled.div`
    position: relative;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
    background-color: blue;
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
`;