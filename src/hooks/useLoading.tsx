import { useContext } from "react"
import { SpinnerContext } from "../context/SpinnerContext"

const useLoading = () => useContext(SpinnerContext);

export default useLoading