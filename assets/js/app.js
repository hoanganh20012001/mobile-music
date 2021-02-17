const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let audios = $$('#song')
let items = $$('.item')
let imgs = $$('.img')
let nameAudios = $$('.name-audio')

let pause = $('.fa-pause-circle')
let play = $('.fa-play')
let displayImg = $('.item-img')
let displayHeading = $('.heading-audio')

const imgRotate = displayImg.animate(
    [{transform: 'rotate(360deg)'}]
,{
    duration: 10000,
    iterations: Infinity
})

imgRotate.pause()

const app = {

    displayHeadingAudio: function (indexName) {
        const nameAudio = nameAudios[indexName].textContent
        displayHeading.textContent = nameAudio
    },
    displayImgae: function (indexImage) {
        const linkImg = imgs[indexImage].getAttribute('src')
        displayImg.style.backgroundImage = `url(${linkImg})`

    },
    playAudio : function(indexAudio) {
        audios.forEach((audio, index) => {
            audio.pause()
            items[index].style.backgroundColor = '#fff'
        })

        audios[indexAudio].play()
        audios[indexAudio].currentTime = 0
        items[indexAudio].style.backgroundColor = '#f02a71'
    },
    run: function() {
        items.forEach(function(item,index) {
            item.onclick = function() {
                app.playAudio(index)
                app.displayImgae(index)
                app.displayHeadingAudio(index)
                app.currentIndex = index
                pause.style.display = 'block'
                play.style.display = 'none'
                imgRotate.play()
            }
        }
    )},
    next: function() {
        app.currentIndex++
        if (app.currentIndex > (audios.length -1 )) {
            app.currentIndex = 0
        }
        pause.style.display = 'block'
        play.style.display = 'none'
        app.playAudio(app.currentIndex)
        app.displayImgae(app.currentIndex)
        app.displayHeadingAudio(app.currentIndex)
    },
    previous: function() {
        app.currentIndex--
        if (app.currentIndex < 0) {
            app.currentIndex = audios.length - 1
        }
        pause.style.display = 'block'
        play.style.display = 'none'
        app.playAudio(app.currentIndex)
        app.displayImgae(app.currentIndex)
        app.displayHeadingAudio(app.currentIndex)
    },
    pauseAudio: function() {

        const audio = audios[app.currentIndex]
        if (audio.paused) {
            audio.play()
            imgRotate.play()
            pause.style.display = 'block'
            play.style.display = 'none'
        } else {
            pause.style.display = 'none'
            play.style.display = 'block'
            audio.pause()
            imgRotate.pause()
        }

        // audio.onplay = function() {
        //     img.play()
        // }

        // audio.onpause = function() {
        //     img.pause()
        // }
    },
    repeat: function() {
        const audio = audios[app.currentIndex]
        audio.loop = false
        console.log(audio)
        if (audio.loop) {
            audio.loop = false
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
        app.displayHeadingAudio(app.currentIndex)
        pause.style.display = 'block'
        play.style.display = 'none'
        imgRotate.play()
    },
    handleEvent: function() {
        // event scroll top
        const itemImg = $('.item-img')
        const itemImgWidth = itemImg.offsetWidth

        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newItemImgWidth = itemImgWidth - scrollTop

            itemImg.style.width = newItemImgWidth > 0 ? newItemImgWidth + 'px' : 0
            itemImg.style.height = newItemImgWidth > 0 ? newItemImgWidth + 'px' : 0
            itemImg.style.opacity = newItemImgWidth / itemImgWidth
        }
        // rotate display image 
    }
}

app.run()
app.handleEvent()
$('.btn-next').onclick = app.next
$('.btn-previous').onclick = app.previous
$('.btn-pause').onclick = app.pauseAudio
$('.btn-repeat').onclick = app.repeat
$('.btn-random').onclick = app.random