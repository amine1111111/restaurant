let counter = document.querySelector("[counter]");
function counterIntro() {


let end = parseInt(counter.getAttribute("data-finished-value"))

let x = setInterval(counterIncrement , 40)
let start = 0 ;


function counterIncrement(){
   start++ ;

   counter.innerHTML = start ;
   start === end ? clearInterval(x) : 0 ; 
}


}
function gsapIntro(){
   
let timeline = gsap.timeline();



timeline.to(".intro" , 5, {
   width : "100vw" ,
   ease : "power2.inOut",
})




.to(".intro" , 3, {
   height : "100svh" ,
   ease : "power2.inOut",
})
.to("[counter]" , 2, {
   opacity : 0 ,
   ease : "power2.inOut",
} , "-=3")


.to(".intro" , 1, {
   opacity : 0 ,
   ease : "power2.inOut",
})    

.from(".hero" , 1 , {
   opacity : 0 ,
   ease : "power2.inOut",
} , 7.5)

.to(".intro", 1 , {
       ease: "power2.inOut",
       onComplete: () => {
           document.querySelector(".intro").style.display = "none";
       }
})
.to(counter, 1 , {
       ease: "power2.inOut",
       opacity : 0 ,
       onComplete: () => {
           document.querySelector(".intro").style.display = "none";
       }
})

.to("input" , 1, {
    opacity : 1 ,
    ease: "power2.inOut",
}, "-=2");

}


function preventScroll(){
   document.addEventListener("DOMContentLoaded", () => {
       document.body.classList.add("no-scroll");
   
       let downButton = document.querySelector("[class*='down']");
   
       downButton.addEventListener("click", (e) => {
           document.body.classList.remove("no-scroll");
   
           window.scrollBy(0 , window.innerHeight);
   
           setTimeout(() => {
               document.body.style.overflow = 'auto';
           }, 1000); 
       });
   });

}  
 function intro(){
   counterIntro() ;
   gsapIntro()
   preventScroll() ;
}

intro()



async function getData() {
    let response = await fetch("data.json");
    let data = await response.json();
    return data;
}

async function updateSlider(filteredData) {
    document.querySelector(".slider-container").innerHTML = filteredData.map(e => {
        let { name, price, description, img } = e;
        return `
            <div class="box overflow-hidden">
                <img src="images/${img}" loading="lazy">
                <p>${name}</p>
                <p>${price}</p>
                <div class="description mx-auto">${description}</div>
            </div>
        `;
    }).join("");
}
 async function initPlates() {
    let data = await getData();
    let initialPlate = data.filter(x => x.category === "burger");
    await updateSlider(initialPlate);

    let categoryBtns = [...document.querySelectorAll("[category-btns] .category-btn")];

    categoryBtns.forEach(categoryBtn => categoryBtn.addEventListener("click", async e => {
        let btnCategory = e.target.dataset.category;
        let btnFilteredCategory = data.filter(x => x.category === btnCategory);
        await updateSlider(btnFilteredCategory);
    }));
}
 function sliderClick(){
    const slider = document.querySelector(".slider-container");
const leftBtn = document.querySelector("[left-btn]");
const rightBtn = document.querySelector("[right-btn]");
let currentPosition = 0;

const updateSliderPosition = (direction) => {
    const sliderWidth = slider.clientWidth;
    const boxWidth = document.querySelector(".box").clientWidth + 20; 
    const totalWidth = document.querySelectorAll(".box").length * boxWidth;

    if (direction === 'right' && Math.abs(currentPosition) < totalWidth - sliderWidth) {
        currentPosition = Math.max(currentPosition - sliderWidth / 2, -(totalWidth - sliderWidth));
    } else if (direction === 'left' && currentPosition < 0) {
        currentPosition = Math.min(currentPosition + sliderWidth / 2, 0);
    }

    slider.style.translate = `${currentPosition}px 0`;
};

rightBtn.addEventListener("click", () => updateSliderPosition('right'));
leftBtn.addEventListener("click", () => updateSliderPosition('left'));
}
function allSlider () {
    initPlates() ;
    sliderClick() ;
}
allSlider()






let stickySections = [...document.querySelectorAll(".sticky")];

function createScrollImgs() {
    let chefs = [
        { 
            src: "images/chef-1.jpg", 
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, ullam?" ,
        },
        { 
            src: "images/chef-2.jpg", 
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, ullam?" ,
        },
        { 
            src: "images/chef-3.jpg", 
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, ullam?" ,
        },
        { 
            src: "images/chef-4.jpg", 
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, ullam?" ,
        },
    ];

    stickySections.forEach(section => {
        let scrollSection = section.querySelector(".scroll-section");

        chefs.forEach(chef => {
            let chefDiv = document.createElement("div");
            chefDiv.classList.add("one-chef", "rounded-3", "text-white", "position-relative", "border-0");

            chefDiv.innerHTML = `
                <div class="front h-100 position-absolute">
                    <img src="${chef.src}" class="w-100 h-100 object-fit-cover" loading="lazy">
                </div>
                <div class="back position-absolute  text-center px-2 d-flex justify-content-center align-items-center">
                    <span>${chef.description}</span>
                </div>
            `;

            scrollSection.append(chefDiv);
        });
    });
}

function scrollCalc(){
window.addEventListener("scroll" , e => {
    for(let i = 0 ; i < stickySections.length ; i++){
        transform(stickySections[i])
    }
})
}

function transform(section){
let offsetTop = section.parentElement.offsetTop;
let scrollSection = section.querySelector(".scroll-section");
let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;

percentage = percentage < 0 ? 0 : percentage > 350 ? 350 :  percentage ;
scrollSection.style.transform = `translate3d(-${percentage}vw , 0 , 0)`
}

function hzScroll(){
createScrollImgs() ;
scrollCalc()
}
hzScroll()

function infScroll(){
    const scrollers = document.querySelectorAll(".scroller");
    
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
    
    function addAnimation() {
      scrollers.forEach((scroller) => {
    
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);
    
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
}  
infScroll() ;







function topBtn (){
    let topBtn = document.querySelector(".top-btn") ;

    let btnWidth = topBtn.clientWidth ;

    topBtn.addEventListener("mousemove" , e => {
        let x = e.offsetX ;
        let y = e.offsetY ;


        let translateX = (x - btnWidth / 2) ;
        let translateY = (x - btnWidth / 2) ;

        topBtn.style.translate  = `${translateX}px ${translateY}px`
    });

    topBtn.addEventListener("mouseleave" , e => {
        topBtn.style.translate  = " 0 0" ;
    })

    topBtn.addEventListener("click" , _ => {
        window.scrollTo(0 , 0)
    })


    window.addEventListener("scroll" , _ => {
        if(window.scrollY > window.innerHeight * 2) {
            topBtn.style.display ="flex"
        }else {
        topBtn.style.display ="none"
        }
    })
}
topBtn();








document.addEventListener('DOMContentLoaded', intObserver);
function intObserver(){
    let hiddenEs = document.querySelectorAll("[class*='hidden-e']");
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {

            entry.isIntersecting ? entry.target.classList.add("show") : 0;
        });
    }, {
        threshold: 0.3, 
    });

    hiddenEs.forEach(e => observer.observe(e));
}