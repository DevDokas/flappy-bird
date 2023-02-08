//
import React, { useState, useEffect }from "react"
import styled from "styled-components"

const BIRD_SIZE = 40
const GAMEBOX_HEIGHT = 500
const GAMEBOX_WIDTH = 500
const GRAVITY = 10
const JUMP_HEIGHT = 150
const OBSTACLE_WIDTH = 80
const OBSTACLE_GAP = 200

export default function App() {

  const [birdPosition, setBirdPosition] = useState(250)
  const [gameStarted, setGameStarted] = useState(false)
  const [obstacleHeight, setObstacleHeight] = useState(50)
  const [obstacleLeft, setObstacleLeft] = useState(GAMEBOX_WIDTH - OBSTACLE_WIDTH)
  const [score, setScore] = useState(0)

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

  useEffect(() => {
    let obstacleId
    if (gameStarted && obstacleLeft >= - (2 * OBSTACLE_WIDTH)) {
      obstacleId = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - 5)
      }, 24)

      return () => {
        clearInterval(obstacleId)
      }
    } else if (gameStarted) {
      setObstacleLeft(GAMEBOX_WIDTH - OBSTACLE_WIDTH)
      setObstacleHeight(Math.floor(Math.random() * (GAMEBOX_HEIGHT - OBSTACLE_GAP - BIRD_SIZE))
      )
      setScore(score => score + 1)
    }
  }, [gameStarted, obstacleLeft])

  useEffect(() => {
    const collidedWithTop = birdPosition >= 0 && birdPosition < (obstacleHeight - BIRD_SIZE/1.5)
    const collidedWithBottom =  birdPosition <= 500 && birdPosition >= 500 - bottomObstacleHeight
    const collidedWithFloor = birdPosition >= 460

    if (obstacleLeft >= 0 && obstacleLeft <= OBSTACLE_WIDTH && (collidedWithBottom || collidedWithTop)) {
      setGameStarted(false)
    } else if (collidedWithFloor) {
      setGameStarted(false)
    }
  }, [birdPosition, obstacleHeight, bottomObstacleHeight, obstacleLeft])

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
        <Bird size={BIRD_SIZE} top={birdPosition} />
        <TopObstacle 
          top={0}
          width={OBSTACLE_WIDTH}
          height={obstacleHeight}
          left={obstacleLeft + OBSTACLE_WIDTH}
          />
        <BottomObstacle 
          top={GAMEBOX_HEIGHT - (obstacleHeight + bottomObstacleHeight)}
          width={OBSTACLE_WIDTH}
          height={bottomObstacleHeight}
          left={obstacleLeft + OBSTACLE_WIDTH}
          />
          <ShowScore>{score}</ShowScore>
          {gameStarted ? null : <>
          <RestartButton onClick={() => location.reload()}>Reiniciar</RestartButton>
          <StartText>Clique na tela para iniciar</StartText>
          <RestartText>Caso tenha morrido, clique em reiniciar</RestartText>
          </>}
      </GameBox>
    </Container>
  )
}

export const Bird = styled.div`
    position: absolute;
    left: 45%;
    background-image: url("/src/assets/flappybird.png");
    background-size: 50px;
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
    position: relative;
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;

    background-image: url("/src/assets/background.png");
    background-size: cover;
    overflow: hidden;
`;

export const TopObstacle = styled.div`
    position: relative;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
    background-image: url("/src/assets/obstacle.svg");
    transform: rotate(180deg);
    background-size: cover;
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
`;

export const BottomObstacle = styled.div`
    position: relative;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
    background-image: url("/src/assets/obstacle.svg");
    background-size: cover;
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
`;

export const ShowScore = styled.div`
  position: absolute;
  font-size: 60px;
  color: grey;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
`;

export const RestartButton = styled.button`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 60px;
  width: 120px;
  border: 5px solid grey;
  border-radius: 5%;
  font-size: 20px;
  font-weight: 600;
  color: black;
  background-image: linear-gradient(#f0f0f0, #afafaf);
`;

export const StartText = styled.span`
  position: absolute;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  color: rgba(0,0,0,0.8);
  top: 70%;
  width: 100%;
`;

export const RestartText = styled.span`
  position: absolute;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  color: rgba(0,0,0,0.8);
  top: 85%;
  width:100%;
`;