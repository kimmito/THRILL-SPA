
import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"
import { services } from '@/data/services'
import { offers } from '@/data/offers'

type PriceTabsState = {
  category: string
  service: string
}

const initialState: PriceTabsState = {
  category: 'offers',
  service: '',
}

const priceTabsSlice = createSlice({
  name: 'priceTabs',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload
      if (action.payload === 'offers') {
        state.service = offers.length ? offers[0].id : ''
      } else {
        const first = services.find(s => s.categoryId === action.payload)
        state.service = first ? first.id : ''
      }
    },
    setService(state, action: PayloadAction<string>) {
      state.service = action.payload
    }
  }
})

export const { setCategory, setService } = priceTabsSlice.actions
export const priceTabsReducer = priceTabsSlice.reducer