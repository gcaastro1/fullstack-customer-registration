import { Button } from "./styles/Buttons"
import { Container } from "./styles/Global"
import { Text } from "./styles/Text"

export default function App() {
  return (
    <>
      <Text variant="title1">Clientes & Contatos</Text>
      <hr/>
      <Container>
        <Button variant="grayDefault">Adicionar Cliente</Button>
      </Container>
    </>
  )
}
