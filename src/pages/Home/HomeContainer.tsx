import { Container } from "@mui/material"
import { UsersAge } from "./UsersAge"
import { ViewCount } from "./ViewCount"

export const HomeContainer = () => {

  return (
    <Container maxWidth='lg'>
      <UsersAge />
      <ViewCount />
    </Container>
  )
}