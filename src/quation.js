export class Question{
	static create(question) {
		return fetch('https://podcast-wascoyur-app.firebaseio.com/questions.json', {
			method: 'POST',
			body: JSON.stringify(question),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(response => {
				console.log(response);
			})
	}
}