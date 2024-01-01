import React from 'react'
import News from './News'

const Home = (props) => {
    return (
    <div>
        <News category={props.category} pageSize={props.pageSize} setProgress={props.setProgress}/>
    </div>
  )
}

export default Home
