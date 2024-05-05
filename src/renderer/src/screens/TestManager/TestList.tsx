import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetTestList } from '@renderer/hooks/res/testNameRes/UseTestNameAPI'
import { TestInterface } from '@renderer/interfaces/tests/test'
import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

export const TestList: React.FC = () => {
  // Get all test info
  const { data } = useGetTestList()
  // Estado para los ítems que se mostrarán
  const [lista, setLista] = useState<TestInterface[]>([])
  // Estado para saber si hay más ítems por cargar
  const [tieneMas, setTieneMas] = useState<boolean>(true)
  // Cantidad de ítems a mostrar inicialmente y en cada carga
  const cantidadPorCarga: number = 20

  useEffect(() => {
    // Cargar los primeros ítems
    setLista(data!.slice(0, cantidadPorCarga))
  }, [data])

  const cargarMas = (): void => {
    if (lista.length >= data!.length) {
      setTieneMas(false)
      return
    }
    // Simular una carga de datos después de un delay
    setTimeout(() => {
      setLista(lista.concat(data!.slice(lista.length, lista.length + cantidadPorCarga)))
    }, 1500)
  }

  return (
    <ScrollArea className="h-[400px] w-[400px] rounded-md border m-2">
      <InfiniteScroll
        dataLength={lista.length}
        next={cargarMas}
        hasMore={tieneMas}
        loader={<h4>Cargando...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <h3>Ya has visto todos los ítems</h3>
          </p>
        }
      >
        {lista.map((item, index) => (
          <div key={index}>
            <div># {index}</div>
            <h2>{item.testName}</h2>
            {/* <h3>{`$ ${item.testPrice}`}</h3> */}
          </div>
        ))}
      </InfiniteScroll>
    </ScrollArea>
  )
}
