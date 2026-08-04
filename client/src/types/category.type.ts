import type { Service } from "./service.type"

export type Category = {
	id: number
	name: string
	slug: string
  services: Service[]
}
