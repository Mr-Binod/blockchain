const uidInput = document.querySelector(".user-id");
const upwInput = document.querySelector(".user-pw");
const loginBnt = document.querySelector(".login-btn");
loginBnt.addEventListener("click", () => {
    const data = {
        uid: uidInput.value,
        upw: upwInput.value
    };
    console.log(`입력한 아이디는 ${data.uid}, 입력한 비밀번호는 ${data.upw}`);
});
