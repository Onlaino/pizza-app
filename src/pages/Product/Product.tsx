import { useParams } from "react-router-dom"

export const Product = () => {
	const params = useParams();
	console.log(params)
  return (
	<div>Product -  {params.id}</div>
  )
}