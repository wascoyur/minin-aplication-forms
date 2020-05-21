import { Question } from './quation';
import {getAuthForm, authWithEmailAndPassword} from'./auth';
import './styles.css'
import {createModal, isValid} from './utils';
const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const btnSend = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn')
window.addEventListener('load', Question.renderList);
modalBtn.addEventListener('click', openModal);
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

function openModal(params) {
	createModal('Авторизация', getAuthForm());
	document
		.getElementById('auth-form')
		.addEventListener('submit', authFormHandler, {once: true})
}
function authFormHandler(event) {
	event.preventDefault();

	const email = event.target.querySelector('#email').value
	const password = event.target.querySelector('#password').value
	authWithEmailAndPassword(email, password);
}
