import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  function handleNavigate(url: string) {
    navigate(url)
  }
  return (
    <div>
      <h1 onClick={() => handleNavigate(`/upload`)}>맛집 등록</h1>
    </div>
  )
}

export default Home
