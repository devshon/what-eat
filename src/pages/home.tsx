import React from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import { Button } from '@mui/material'

function Home() {
  const [randomData, setRandomData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(false)

  const navigate = useNavigate()
  const handleNavigate = (url: string) => {
    navigate(url)
  }
  const handleRandom = () => {
    setRandomData(null)
    setLoading(true)
    fetch(`${process.env.REACT_APP_SERVER_URL}/store`, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          if (data.store === null) {
            handleRandom()
            return
          }
          setLoading(false)
          setRandomData(data.store)
        }, 1000)
      })
  }

  const handleRemove = () => {
    const result = window.confirm('맛집을 삭제하나요?')
    if (result) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/store`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: randomData.id
        })
      }).then(() => {
        setRandomData(null)
      })
    }
  }

  return (
    <div>
      <Header>
        <ButtonWrapper>
          <Button
            variant="text"
            className="btn"
            onClick={() => handleNavigate(`/upload`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-plus"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="rgba(25, 94, 159, 0.7)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            맛집 등록
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            variant="text"
            className="btn"
            disabled={loading}
            onClick={() => handleRandom()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-rotate"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={loading ? 'rgb(0 0 0 / 26%)' : 'rgba(25, 94, 159, 0.7)'}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5" />
            </svg>
            랜덤 돌리기
          </Button>
        </ButtonWrapper>
      </Header>
      {loading && <Spinner>Loading...</Spinner>}
      {randomData && (
        <StoreWrapper>
          <div>
            <h1>{randomData.name}</h1>
            <svg
              onClick={() => handleRemove()}
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <div>
            <span>{randomData.type}</span>
            <span>❤️ X {randomData.grade}</span>
          </div>
        </StoreWrapper>
      )}
    </div>
  )
}
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  .btn {
    font-size: 24px;
  }
  svg {
    margin-right: 4px;
  }
`
const StoreWrapper = styled.div`
  div {
    display: flex;
  }
  div:nth-child(1) {
    align-items: center;
    justify-content: center;
    svg {
      :hover {
        stroke: red;
      }
      cursor: pointer;
    }
  }
  div:nth-child(2) {
    align-items: center;
    justify-content: space-evenly;
  }
  h1 {
    font-size: 40px;
    margin: 60px 0px 40px;
  }

  span {
    margin: 30px 0px;
    font-size: 24px;
  }
`
export const Spinner = styled.div`
  margin: 100px auto;
  font-size: 25px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load5 1.1s infinite ease;
  animation: load5 1.1s infinite ease;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  @-webkit-keyframes load5 {
    0%,
    100% {
      box-shadow: 0em -2.6em 0em 0em #195e9f,
        1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2),
        2.5em 0em 0 0em rgba(25, 94, 159, 0.2),
        1.75em 1.75em 0 0em rgba(25, 94, 159, 0.2),
        0em 2.5em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em 1.8em 0 0em rgba(25, 94, 159, 0.2),
        -2.6em 0em 0 0em rgba(25, 94, 159, 0.5),
        -1.8em -1.8em 0 0em rgba(25, 94, 159, 0.7);
    }
    12.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(25, 94, 159, 0.7),
        1.8em -1.8em 0 0em #195e9f, 2.5em 0em 0 0em rgba(25, 94, 159, 0.2),
        1.75em 1.75em 0 0em rgba(25, 94, 159, 0.2),
        0em 2.5em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em 1.8em 0 0em rgba(25, 94, 159, 0.2),
        -2.6em 0em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em -1.8em 0 0em rgba(25, 94, 159, 0.5);
    }
    25% {
      box-shadow: 0em -2.6em 0em 0em rgba(25, 94, 159, 0.5),
        1.8em -1.8em 0 0em rgba(25, 94, 159, 0.7), 2.5em 0em 0 0em #195e9f,
        1.75em 1.75em 0 0em rgba(25, 94, 159, 0.2),
        0em 2.5em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em 1.8em 0 0em rgba(25, 94, 159, 0.2),
        -2.6em 0em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2);
    }
    37.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(25, 94, 159, 0.2),
        1.8em -1.8em 0 0em rgba(25, 94, 159, 0.5),
        2.5em 0em 0 0em rgba(25, 94, 159, 0.7), 1.75em 1.75em 0 0em #195e9f,
        0em 2.5em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em 1.8em 0 0em rgba(25, 94, 159, 0.2),
        -2.6em 0em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2);
    }
    50% {
      box-shadow: 0em -2.6em 0em 0em rgba(25, 94, 159, 0.2),
        1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2),
        2.5em 0em 0 0em rgba(25, 94, 159, 0.5),
        1.75em 1.75em 0 0em rgba(25, 94, 159, 0.7), 0em 2.5em 0 0em #195e9f,
        -1.8em 1.8em 0 0em rgba(25, 94, 159, 0.2),
        -2.6em 0em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2);
    }
    62.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(25, 94, 159, 0.2),
        1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2),
        2.5em 0em 0 0em rgba(25, 94, 159, 0.2),
        1.75em 1.75em 0 0em rgba(25, 94, 159, 0.5),
        0em 2.5em 0 0em rgba(25, 94, 159, 0.7), -1.8em 1.8em 0 0em #195e9f,
        -2.6em 0em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2);
    }
    75% {
      box-shadow: 0em -2.6em 0em 0em rgba(25, 94, 159, 0.2),
        1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2),
        2.5em 0em 0 0em rgba(25, 94, 159, 0.2),
        1.75em 1.75em 0 0em rgba(25, 94, 159, 0.2),
        0em 2.5em 0 0em rgba(25, 94, 159, 0.5),
        -1.8em 1.8em 0 0em rgba(25, 94, 159, 0.7), -2.6em 0em 0 0em #195e9f,
        -1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2);
    }
    87.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(25, 94, 159, 0.2),
        1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2),
        2.5em 0em 0 0em rgba(25, 94, 159, 0.2),
        1.75em 1.75em 0 0em rgba(25, 94, 159, 0.2),
        0em 2.5em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em 1.8em 0 0em rgba(25, 94, 159, 0.5),
        -2.6em 0em 0 0em rgba(25, 94, 159, 0.7), -1.8em -1.8em 0 0em #195e9f;
    }
  }
  @keyframes load5 {
    0%,
    100% {
      box-shadow: 0em -2.6em 0em 0em #195e9f,
        1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2),
        2.5em 0em 0 0em rgba(25, 94, 159, 0.2),
        1.75em 1.75em 0 0em rgba(25, 94, 159, 0.2),
        0em 2.5em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em 1.8em 0 0em rgba(25, 94, 159, 0.2),
        -2.6em 0em 0 0em rgba(25, 94, 159, 0.5),
        -1.8em -1.8em 0 0em rgba(25, 94, 159, 0.7);
    }
    12.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(25, 94, 159, 0.7),
        1.8em -1.8em 0 0em #195e9f, 2.5em 0em 0 0em rgba(25, 94, 159, 0.2),
        1.75em 1.75em 0 0em rgba(25, 94, 159, 0.2),
        0em 2.5em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em 1.8em 0 0em rgba(25, 94, 159, 0.2),
        -2.6em 0em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em -1.8em 0 0em rgba(25, 94, 159, 0.5);
    }
    25% {
      box-shadow: 0em -2.6em 0em 0em rgba(25, 94, 159, 0.5),
        1.8em -1.8em 0 0em rgba(25, 94, 159, 0.7), 2.5em 0em 0 0em #195e9f,
        1.75em 1.75em 0 0em rgba(25, 94, 159, 0.2),
        0em 2.5em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em 1.8em 0 0em rgba(25, 94, 159, 0.2),
        -2.6em 0em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2);
    }
    37.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(25, 94, 159, 0.2),
        1.8em -1.8em 0 0em rgba(25, 94, 159, 0.5),
        2.5em 0em 0 0em rgba(25, 94, 159, 0.7), 1.75em 1.75em 0 0em #195e9f,
        0em 2.5em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em 1.8em 0 0em rgba(25, 94, 159, 0.2),
        -2.6em 0em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2);
    }
    50% {
      box-shadow: 0em -2.6em 0em 0em rgba(25, 94, 159, 0.2),
        1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2),
        2.5em 0em 0 0em rgba(25, 94, 159, 0.5),
        1.75em 1.75em 0 0em rgba(25, 94, 159, 0.7), 0em 2.5em 0 0em #195e9f,
        -1.8em 1.8em 0 0em rgba(25, 94, 159, 0.2),
        -2.6em 0em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2);
    }
    62.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(25, 94, 159, 0.2),
        1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2),
        2.5em 0em 0 0em rgba(25, 94, 159, 0.2),
        1.75em 1.75em 0 0em rgba(25, 94, 159, 0.5),
        0em 2.5em 0 0em rgba(25, 94, 159, 0.7), -1.8em 1.8em 0 0em #195e9f,
        -2.6em 0em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2);
    }
    75% {
      box-shadow: 0em -2.6em 0em 0em rgba(25, 94, 159, 0.2),
        1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2),
        2.5em 0em 0 0em rgba(25, 94, 159, 0.2),
        1.75em 1.75em 0 0em rgba(25, 94, 159, 0.2),
        0em 2.5em 0 0em rgba(25, 94, 159, 0.5),
        -1.8em 1.8em 0 0em rgba(25, 94, 159, 0.7), -2.6em 0em 0 0em #195e9f,
        -1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2);
    }
    87.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(25, 94, 159, 0.2),
        1.8em -1.8em 0 0em rgba(25, 94, 159, 0.2),
        2.5em 0em 0 0em rgba(25, 94, 159, 0.2),
        1.75em 1.75em 0 0em rgba(25, 94, 159, 0.2),
        0em 2.5em 0 0em rgba(25, 94, 159, 0.2),
        -1.8em 1.8em 0 0em rgba(25, 94, 159, 0.5),
        -2.6em 0em 0 0em rgba(25, 94, 159, 0.7), -1.8em -1.8em 0 0em #195e9f;
    }
  }
`
export default Home
