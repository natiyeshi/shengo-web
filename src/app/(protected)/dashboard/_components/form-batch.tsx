import { Badge } from '@mantine/core'
import React, { PropsWithChildren } from 'react'


const FormBatch = ({children}: PropsWithChildren) => {
  return (
    <Badge>{children}</Badge>
  )
}

export default FormBatch