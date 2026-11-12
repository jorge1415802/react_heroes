import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getHeroInformation } from "../actions/get-hero-information";

export const useHeroPage = () => {
  const { slug = '' } = useParams()

const { data: character } = useQuery({
  queryKey:['character',slug],
  queryFn: () => getHeroInformation(slug),
  staleTime: 1000 * 60 * 5
})

  const totalPower =
    character ? 
    character.strength + character.intelligence + character.speed + character.durability
    : 0;
  const averagePower = Math.round((totalPower / 4) * 10)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "activo":
        return "bg-green-500"
      case "inactivo":
        return "bg-gray-500"
      case "retirado":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "héroe":
        return "bg-blue-500"
      case "villano":
        return "bg-red-500"
      case "antihéroe":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return {
    character,
    totalPower,
    averagePower,
    getStatusColor,
    getCategoryColor
  }

}
