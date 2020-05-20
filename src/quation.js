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
			.then(Question.renderList)
	}
	static renderList(){
		const questions = getQuestionsFromLocalStorage();
		const html = questions.length?questions.map(toCard)
					.join(''):
					`<div class="mui--text-headline">Ничего не спрашивалось</div>`;
		const list = document.getElementById('list');
		list.innerHTML = html;
	}
}
function addToLocalStorage(question) {
	const all = getQuestionsFromLocalStorage();
	all.push(question);
	localStorage.setItem('questions', JSON.stringify(all))
}
function getQuestionsFromLocalStorage() {
	return JSON.parse(localStorage.getItem('questions') || '[]');
}
function toCard(question) {
	return `
	<div class="mui--text-black-54 mui--text-body2">Ваши вопросы</div>
				<div class="mui-divider"></div>
	`;
}
