import { useState, useEffect, createContext } from "react"
import axios from "axios"

const BebidasContext = createContext()
const BebidasProvider = ({children}) => {
    //States
    const [bebidas,setBebidas] = useState([])
    const [modal,setModal] = useState(false)
    const [bebidaId,setBebidaId] = useState(null)
    const [receta,setReceta] = useState([])
    const [cargando, setCargando] = useState(false)
    //Consulta Bebidas de la API
    const consultarBebida = async  datos => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`

            const { data } = await axios(url)
            setBebidas(data.drinks)
        } catch (error) {
            console.log(error)
        }
    }
    //Muestra y Oculta Modal
    const handleModalClick = () => {
        setModal(!modal)
    }
    //Guarda en un state el id de la bebida al hacer click en el btn
    const handleBebidaIdClick = id => {
        setBebidaId(id)
    }
    //LLame a la API y muestre info de la bebida cuando el state del ID cambie
    useEffect(() => {
        setCargando(true)
        const obtenerReceta = async () => {
            if(!bebidaId) return //Si es null, no hace nada

            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
                const { data } = await axios(url)
                setReceta(data.drinks[0])
            } catch (error) {
                console.log(error)
            } finally {
                setCargando(false)
            }
        }
        obtenerReceta()
    }, [bebidaId])
    

  return (
      <BebidasContext.Provider
        value={{
            consultarBebida,
            bebidas,
            handleModalClick,
            modal,
            handleBebidaIdClick,
            receta,
            setReceta,
            cargando
        }}
      >
        {children}
      </BebidasContext.Provider>
  )
}

export {
  BebidasProvider
}

export default BebidasContext