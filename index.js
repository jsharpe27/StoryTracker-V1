//element captures
const loginBtnEl = document.getElementById('login-btn')
const loginModalEl = document.getElementById('login-modal')

loginBtnEl.addEventListener('click', function(){
    loginModalEl.style.display = 'block'
})