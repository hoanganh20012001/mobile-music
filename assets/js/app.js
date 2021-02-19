const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let audios = $$('#song')
let items = $$('.item')
let imgs = $$('.img')
let nameAudios = $$('.name-audio')

let pause = $('.fa-pause-circle')
let play = $('.btn-pause .fa-play-circle')
let displayImg = $('.item-img')
let displayHeading = $('.heading-audio')
let process = $('.progress')

const imgRotate = displayImg.animate(
    [{transform: 'rotate(360deg)'}]
,{
    duration: 10000,
    iterations: Infinity
})

imgRotate.pause()

const app = {
    isSeeking: false,
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
        
        items[indexAudio].style.backgroundColor = '#f02a71'
        const audio = audios[indexAudio]
        audio.play()
        audio.currentTime = 0
        // auto next audio
        audio.onended = app.next
        // time up date

        audio.ontimeupdate = function() {
            if (audio.duration) {
                let length = audio.currentTime / audio.duration;
                // $(``).style.width = length*100 + "%"
                process.value = audio.currentTime * (100/ audio.duration)
                let curmins = Math.floor(audio.currentTime / 60)
                let cursecs = Math.floor(audio.currentTime - curmins*60)
                let durmins = Math.floor(audio.duration / 60)
                let dursecs = Math.floor(audio.duration - durmins*60)

                cursecs < 10 && (cursecs = "0" + cursecs)
                dursecs < 10 && (dursecs = "0" + dursecs)
                curmins < 10 && (curmins = "0" + curmins)
                $('.curtime').innerHTML = curmins + ':' + cursecs
                $('.durtime').innerHTML = durmins + ':' + dursecs
            } else {
                $('.curtime').innerHTML = "00" + ':' + "00"
                $('.durtime').innerHTML = "00" + ':' + "00"
            }
        }
        // mouse controls
        
        process.addEventListener('change',function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        })

        process.addEventListener('mousedown',function(e) {
    
        })
        
        process.addEventListener('mousemove',function(e) {
            
        })
        
        process.addEventListener('mouseup',function() {
            
        })
        
        function seek(e) {
            if (audio.duration) {
                null
            } else {
                if (app.isSeeking) {
                    seekSlider.value = e.clientX - seekSlider.offsetLeft
                    audio.currentTime = audio.duration * (seekSlider.value / 100)
                }
            }
        }

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

        return audios[app.currentIndex]
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
        
    },
    repeat: function() {
        const audio = audios[app.currentIndex]
        
        if (audio.loop) {
            audio.loop = false
            $('.btn-repeat i').style.color = '#8884b7'
        } else {
            $('.btn-repeat i').style.color = '#eb003e'
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

        //Mousedown mousemove mouseup process
        

        $('.btn-next').onclick = app.next
        $('.btn-previous').onclick = app.previous
        $('.btn-pause').onclick = app.pauseAudio
        $('.btn-repeat').onclick = app.repeat
        $('.btn-random').onclick = app.random
    }
}

app.run()
app.handleEvent()
// $('.btn-next').onclick = app.next
// $('.btn-previous').onclick = app.previous
// $('.btn-pause').onclick = app.pauseAudio
// $('.btn-repeat').onclick = app.repeat
// $('.btn-random').onclick = app.random