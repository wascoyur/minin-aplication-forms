import {Question} from './quation'
import './styles.css'
import {isValid} from './utils';
const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const btnSend = form.querySelector('#submit');
form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
	btnSend.disabled = !isValid(input.value);
})
function submitFormHandler (event){
	event.preventDefault();
	if (isValid(input.value)) {
		const question = {
			text: input.value.trim(),
			date: new Date().toJSON(),
		}
		btnSend.disabled = true;
		//Аcинхронный заппрос на сервер для сохранения вопроса
		Question.create(question)
			.then(() => {
                console.log(question);
                input.value = '';
                input.classList.remove('mui--is-not-empty');
                btnSend.disabled = false;
            })

	}
}
