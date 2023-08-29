import { useState } from 'react'

export const useFetch = callback => {
	const [isLoading, setIsLoading] = useState(true)
	const [errors, setErrors] = useState(false)

	const fetching = async () => {
		try {
			setIsLoading(true)
			await callback()
		} catch (e) {
			console.log(e)
			setErrors(e)
		} finally {
			setIsLoading(false)
		}
	}
	return [fetching, isLoading, errors]
}
