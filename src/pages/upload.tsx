import React from 'react'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'

import styled, { css } from 'styled-components'
import { useNavigate } from 'react-router-dom'

function Upload() {
  const navigate = useNavigate()
  const [name, setName] = React.useState<string>('')
  const [type, setType] = React.useState<string>('')
  // const [grade, setGrade] = React.useState<number>(NaN)
  // const [isSeleted, setIsSelected] = React.useState<boolean>(false)
  // const hearts = [1, 2, 3, 4, 5]

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  const handleType = (event: SelectChangeEvent) => {
    setType(event.target.value)
  }
  // const handleClick = (index: number) => {
  //   setGrade(index)
  //   setIsSelected(true)
  // }
  // const handleEnter = (index: number) => {
  //   setGrade(index)
  // }
  // const handleLeave = () => {
  //   setGrade(NaN)
  // }
  const handleSubmit = () => {
    const store = {
      name,
      type
    }
    fetch(`${process.env.REACT_APP_SERVER_URL}/store`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(store)
    }).then(() => {
      alert('맛집이 등록되었습니다!')
      navigate('/')
    })
  }

  return (
    <MainStyle>
      <ItemStyle>
        <TextField
          id="standard-basic"
          label="맛집 이름"
          variant="standard"
          onChange={handleName}
        />
      </ItemStyle>
      <ItemStyle>
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-standard-label">
            음식 종류
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={type}
            onChange={handleType}
            label="음식 종류"
          >
            <MenuItem value="한식">한식</MenuItem>
            <MenuItem value="일식">일식</MenuItem>
            <MenuItem value="중식">중식</MenuItem>
            <MenuItem value="양식">양식</MenuItem>
            <MenuItem value="배달">배달</MenuItem>
          </Select>
        </FormControl>
      </ItemStyle>
      {/* <ItemStyle>
        <Title>평점</Title>
        <MapWrapper>
          {hearts.map((length) => {
            return (
              <SvgWrapper key={length} index={length} grade={grade}>
                <svg
                  onClick={() => handleClick(length)}
                  onMouseEnter={() => {
                    if (!isSeleted) handleEnter(length)
                  }}
                  onMouseLeave={() => {
                    if (!isSeleted) handleLeave()
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-heart"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  stroke="#2c3e50db"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>
              </SvgWrapper>
            )
          })}
        </MapWrapper>
      </ItemStyle> */}
      <ItemStyle>
        <Button variant="contained" onClick={() => handleSubmit()}>
          맛집 등록
        </Button>
      </ItemStyle>
    </MainStyle>
  )
}

export const FlexCol = () => css`
  display: flex;
  flex-direction: column;
`

const MainStyle = styled.section`
  ${FlexCol()}
`

const ItemStyle = styled.div`
  margin: 10px 0px;
  ${FlexCol()}
`

const Title = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
`

const MapWrapper = styled.div`
  display: flex;
`

const SvgWrapper = styled.div<{ index: number; grade: number }>`
  cursor: pointer;
  .icon {
    fill: ${(props) => (props.index <= props.grade ? 'red' : 'none')};
    stroke: ${(props) => (props.index <= props.grade ? 'red' : '#2c3e50db')};
  }
`

export default Upload
