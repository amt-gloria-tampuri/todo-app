const wholePage = document.querySelectorAll(".wholePage");
const heroBackground = document.getElementById("hero-bg");
const switchIcon = document.getElementById("icon");

switchIcon.onclick=function(){
    document.body.classList.toggle('dark-switch')
    if(document.body.classList.contains('dark-switch')){
        icon.src='/images/icon-sun.svg';
        heroBackground.classList.remove("hero-image")
        heroBackground.classList.add("dark-hero")

    }
    else{
        icon.src='/images/icon-moon.svg';
        heroBackground.classList.remove("dark-hero")
        heroBackground.classList.add("hero-image")

    }
    console.log('clicked');
}