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
				question.id = response.name;
				return question
			})
			.then(addToLocalStorage)
	}
	static renderList(){
		const questions = getQuestionsFromLocalStorage();
		const html = questions.length ? questions.map(toCard).join(''): <div class="mui--text-headline">test</div>;

	}
}
function addToLocalStorage(quation) {
	const all = getQuestionsFromLocalStorage();
	all.push(quation);
	localStorage.setItem('questions', JSON.stringify(all))
}
function getQuestionsFromLocalStorage() {
	return JSON.parse(localStorage.getItem('questions') || '[]');
}
function toCard(question) {

}
