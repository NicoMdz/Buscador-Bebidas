import { useState, useEffect, createContext } from "react"
import axios, { AxiosError } from "axios"

const BebidasContext = createContext()
const BebidasProvider = ({children}) => {
    //States
    const [bebidas,setBebidas] = useState([])
    const [modal,setModal] = useState(false)
    const [bebidaId,setBebidaId] = useState(null)
    const [receta,setReceta] = useState([])
    const [cargando, setCargando] = useState(false)
    const [favoritos,setFavoritos] = useState([])
    //Consulta Bebidas de la API
    const consultarBebida = async datos => {
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
    //Consultar Bebidas Favoritas
    const consultarFavoritas = async () => {
        try {
          const nuevasBebidas = await Promise.all(
            favoritos.map(async (fav) => {
              try {
                let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${fav.idDrink}`;
                let { data } = await axios(url);
                return(data.drinks[0])
              } catch (error) {
                console.log(error);
                return null; // O manejar el error de alguna otra manera
              }
            })
          );
       
          // Filtra elementos nulos (errores) y actualiza el estado
          setBebidas(nuevasBebidas.filter((bebida) => bebida !== null));
        } catch (error) {
          console.log(error);
        }
      };
     //Añadir bebida a Favoritos
     const agregarFav = bebida => {
        if(favoritos.some( bebidaState =>  bebidaState.idDrink === bebida.idDrink )) {
            // Iterar para no añadir repetida
            const favoritosActualizado = favoritos.map( bebidaState => {
                if( bebidaState.idDrink === bebida.idDrink ) {
                    bebidaState.strDrink = bebida.strDrink;
                } 
                return bebidaState;
            });
            // Se asigna al array
            setFavoritos([...favoritosActualizado]);
            // localStorage.setItem('carrito', JSON.stringify( carrito ));
        } else {
            // En caso de que el articulo no exista, es nuevo y se agrega
            setFavoritos([...favoritos, bebida]);
            // localStorage.setItem('carrito', JSON.stringify( carrito ));
        }
    }
    

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
            cargando,
            agregarFav,
            consultarFavoritas
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