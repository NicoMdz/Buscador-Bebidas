import { Col, Card, Button} from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"

const Bebida = ({bebida}) => {

    const { handleModalClick,handleBebidaIdClick,agregarFav} = useBebidas()

  return (
    <Col md={6} lg={3}>
        <Card className="mb-4 text-center ">
            <Card.Img 
                variant="top"
                src={bebida.strDrinkThumb}
                alt={`Imagen de ${bebida.strDrink}`}
            />
            <Card.Body>
                <Card.Title>{bebida.strDrink}</Card.Title>
                {/* <Card.Text>Lorem Ipsum</Card.Text> */}

                <Button 
                    variant="danger"
                    className="w-100 text-uppercase mt-2"
                    onClick={() => {
                        handleModalClick()
                        handleBebidaIdClick(bebida.idDrink)
                    }}
                >
                    Ver Receta
                </Button>
                <Button
                    variant="danger"
                    className="mt-1"
                    onClick={() => {
                        agregarFav(bebida)
                    }}
                >
                    ♡
                </Button>
            </Card.Body>
        </Card>
    </Col>
  )
}

export default Bebida