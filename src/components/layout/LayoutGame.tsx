import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { LoadingScreen, Title } from '@/components'

export const LayoutGame: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const isLoading = useSelector((state: any) => state.engine.loadingScreen)

  return (
    <>
      <div>{isLoading && <LoadingScreen />}</div>
      <Title />
      {!isLoading && children}
    </>
  )
}
