import { Container } from '@mui/material'
import React from 'react'

const AppContainer = ({children}) => {
  return (
    <Container maxWidth={false} sx={{width:"100vw", p:0, m:0}} style={{padding:0}}>
        {children}
    </Container>
  )
}

export default AppContainer