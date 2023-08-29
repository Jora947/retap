import axios from 'axios'

export const getAllDevice = async () => {
	const response = await axios.get(
		`https://64e897df99cf45b15fdfd4e9.mockapi.io/api/v1/device`
	)
	return response
}
