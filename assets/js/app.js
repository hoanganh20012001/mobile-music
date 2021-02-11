const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let audios = $$('#song')
let items = $$('.item')
let imgs = $$('.img')
let pause = $('.fa-pause-circle')
let play = $('.fa-play')
let displayImg = $('.item-img')

const app = {
    
    displayImgae: function (indexImage) {
        const linkImg = imgs[indexImage].getAttribute('src')
        console.log(linkImg)
        displayImg.style.backgroundImage = `url(${linkImg})`
       
    },
    playAudio : function(indexAudio) {
        audios.forEach((audio) => {
            audio.pause()
        })

        audios[indexAudio].play()
        audios[indexAudio].currentTime = 0


    },
    run: function() {
        items.forEach(function(item,index) {
            item.onclick = function() {
                app.playAudio(index)
                app.displayImgae(index)
                app.currentIndex = index
                console.log(app.currentIndex)
                pause.style.display = 'block'
                play.style.display = 'none'
            }
        }
    )},
    next: function() {
        app.currentIndex++
        if (app.currentIndex > (audios.length -1 )) {
            app.currentIndex = 0
        }
        console.log(app.currentIndex)
        pause.style.display = 'block'
        play.style.display = 'none'
        app.playAudio(app.currentIndex)
        app.displayImgae(app.currentIndex)
    },
    previous: function() {
        app.currentIndex--
        if (app.currentIndex < 0) {
            app.currentIndex = audios.length - 1
        }
        console.log(app.currentIndex)
        pause.style.display = 'block'
        play.style.display = 'none'
        app.playAudio(app.currentIndex)
        app.displayImgae(app.currentIndex)
    },
    pauseAudio: function() {
        const audio = audios[app.currentIndex]
        console.log(audio)
        if (audio.paused) {
            audio.play()
            pause.style.display = 'block'
            play.style.display = 'none'
        } else {
            pause.style.display = 'none'
            play.style.display = 'block'
            audio.pause()
        }

    },
    repeat: function() {
        const audio = audios[app.currentIndex]
        audio.loop = false
        console.log(audio)
        if (audio.loop) {
            audio.loop = false
            // pause.style.display = 'block'
            // play.style.display = 'none'
        } else {
            audio.loop = true
        }
    },
    randomNumber: function(min, max) {
        const step1 = max - min + 1
        const step2 = Math.random() * step1
        const result = Math.floor(step2) + min 
        return result
    },
    random: function() {
        const randomIndex = app.randomNumber(0, audios.length - 1)
        app.currentIndex = randomIndex
        app.playAudio(app.currentIndex)
        app.displayImgae(app.currentIndex)
    }
}


app.run()
$('.btn-next').onclick = app.next
$('.btn-previous').onclick = app.previous
$('.btn-pause').onclick = app.pauseAudio
$('.btn-repeat').onclick = app.repeat
$('.btn-random').onclick = app.random