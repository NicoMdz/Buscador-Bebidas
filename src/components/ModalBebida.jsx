import { Modal, Image } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"

const ModalBebida = () => {

    const {modal,handleModalClick,receta,setReceta,cargando} = useBebidas()
    console.log(receta)

    const mostrarIngredientes = () => {
        let ingredientes = []
            //Hasta 15 pq la api devuelve max 15 ingredientes
        for(let i=1; i < 16; i++){ 
            if( receta[`strIngredient${i}`]) {
                ingredientes.push(
                     <li>{receta[`strIngredient${i}`]} {receta[`strMeasure${i}`]}
                     </li>
                )
            }
        }
        return ingredientes
    }

  return (
    // onHide para cuando haces click afuera del modal, lo desaparece
    !cargando && (<Modal show={modal} onHide={() => {
        handleModalClick()
        // setReceta({}) //Otra Solucion al detalle de que aparece brevemente la receta anterior al ver la siguiente
    }}>
        <Image 
            src={receta.strDrinkThumb}
            alt={`Imagen receta ${receta.strDrink}`}
        />
        <Modal.Header>
            <Modal.Title>{receta.strDrink}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="p-3">
                <h2>Instrucciones</h2>
                {receta.strInstructions}
                <h2>Ingredientes y Cantidades</h2>
                {mostrarIngredientes()}
            </div>
        </Modal.Body>
    </Modal>)
  )
}

export default ModalBebida