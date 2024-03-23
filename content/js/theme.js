let toggleBtn = document.querySelector('.toggle_theme_wrapper')
let toggleBtnActive = document.querySelector('.btn_theme')

toggleBtn.addEventListener('click',(event)=>{
    toggleBtnActive.classList.toggle('btn_theme-active')
    document.querySelector('.container').classList.toggle('dark_theme-active')
})


