import React, { useReducer, useContext, useState, useEffect, ComponentProps } from 'react'
import View from 'baseUI/UI/View'
import Text from 'baseUI/UI/Text'

export default function MvDetailPage(
  props: ComponentProps<typeof View> & {
    id: ID
  }
) {
  return <Text>mvId: {props.id}</Text>
}
