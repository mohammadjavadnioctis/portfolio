
  const reactContainer = document.getElementById('react')
  let determiner = 0;

  
  let robot;

  // if(!isMobile){
    var turbine = bodymovin.loadAnimation({
        container: document.querySelector('#turbine'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: './Animations/Robot Enerji/data.json'
      })
      turbine.setSpeed(0.8)
      
     
    var battery = bodymovin.loadAnimation({
        container: document.querySelector('#battery'),
        renderer: 'canvas',
        loop:false,
        autoplay: false,
        path: './Animations/Battery/transparented bodymovin compressed/Compression Enabled/data.json'
      })


      
turbine.addEventListener('complete',() => {
  
  turbine.setSpeed(0.5)
   if(determiner === 0){
     turbine.goToAndPlay(6,true)
     battery.play()
     
     determiner+=1;
    
   }if(determiner === 1){
     turbine.goToAndPlay(6,true)
     
   }
  
 })



 ScrollTrigger.create({
  trigger:'#turbine',
  start: 'top center',
  end: 'center 100px',
  // markers: true,
  
  onEnter:() => {
    if(determiner === 0){
        turbine.play()
        
    }
    if (determiner === 1){
      turbine.play();
      battery.play();
     
    }
  },
  onLeave: () => {turbine.pause(); battery.pause()},
  onEnterBack: () => {turbine.play() ;battery.play()},
  onLeaveBack: () => {turbine.pause(); battery.pause()}
})



 battery.addEventListener('complete' ,() => {
  if(batteryIsplayed == false){
    batteryIsplayed = true;
    thunder.style.height = 30 + 'vh'
    secThunder.style.height = 30 + 'vh'
    secthunderCopy.style.height = 30 + 'vh'
    thunderCopy2.style.height = 30 + 'vh'

     battery.goToAndPlay(60, true)
   
   
     


    //heightInterval
  }
  if(batteryIsplayed == true){
    battery.goToAndPlay(60, true)

  }

 
})

    // }//isMobile Closing Rag

    let HTlan;
    
      let css;


      let js;


    var react = bodymovin.loadAnimation({
        container: document.querySelector('#react'),
        renderer: 'canvas',
        loop:false,
        autoplay: false,
        path: './Animations/React/Transparent 81 Precent Compression/data.json'
      })
     
    
  
  
   let monitor = document.querySelector('.monitor')
   let lovingRobot = document.querySelector('.loving-robot')

  
  
  
  
//Gsap And ScrollTrigger Functionality



//turbine and battery animation conditions

gsap.registerPlugin(ScrollTrigger)


let robotIsLoaded = false
//Lazy Loading Robot Animation
let hero = document.querySelector('.hero')
ScrollTrigger.create({
  trigger:'.hero',
  start: 'top bottom',
  end: 'center 100px',
  // markers: true,
  
  onEnter:() => {
    // if (!isMobile){

    if(robotIsLoaded == true){
      robot.play()
    }
    if(robotIsLoaded==false){
       robotIsLoaded = true
   robot = bodymovin.loadAnimation({
    container: document.querySelector('.hero'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: './Animations/Robot/data.json'
  })
  robot.addEventListener('DOMLoaded',(e)=>{
    hero.classList.add('fade-in')
    const robotLoading = document.querySelector('.sub-loading')
    robotLoading.parentNode.removeChild(robotLoading)
    setTimeout(()=>{robot.play()},1000)
    

  })
  

    }
   
  // }


  },
  onLeave: 
  () => {
    // if (!isMobile){
    robot.pause()
  // }
  },
  onEnterBack: () => {
    // if (!isMobile){
    robot.play()
  // }
  },
  onLeaveBack: () => {
    // if (!isMobile){
    robot.pause()
  // }
  }
})


//lazyloading monitor


function lazyLoadingImgTags (element){
  element.src = element.dataset.src
}



c.style.display = 'none'


ScrollTrigger.create({
  trigger:'.monitor',
  start: 'center center',
  
  // markers: true,
  
  onEnter:() => {
    
    // monitor.src = monitor.dataset.src
    lazyLoadingImgTags(monitor) 
    lazyLoadingImgTags(lovingRobot)   
    c.style.display = 'unset'
    setTimeout( ()=>{
      c.height = monitor.getBoundingClientRect().width/1.7;
      c.width = monitor.getBoundingClientRect().height/1.3;
    },1000)
    
  },
  onLeave: () => {},
  onEnterBack: () => {},
  onLeaveBack: () => {}
})


window.addEventListener('resize', ()=> {
	console.log('resizzed')
	// setTimeout(()=>{
		c.height =monitor.getBoundingClientRect().height/1.5
		c.width = monitor.getBoundingClientRect().width/1.5
	// } ,1000)
	
})

ScrollTrigger.create({
  trigger:'#battery',
  end: 'top 100px',
})




 
// }


//this part checks if the turbine animation is finished once and starts 
//looping the turbine and starts battery animation

 let batteryIsplayed = false;




//a functin that increases the height

let handle ;
let incrementer = 0;
const gradIncrement = function(element, desiredam) {
  element.style.visibility = 'visible';

  if (element.style.height !== desiredam){
   incrementer++;
  //  console.log('this is incrementor',incrementer)
   element.style.height = `${incrementer}vh`;
  //  console.log('this is element.style.height')
   }
   if(element.style.height == desiredam){
     clearInterval(heightInterval2)
    //  console.log('interval cleared')
   }
  
}

const batteryDiv = document.querySelector("#battery");
let batteryDivChildCount = 0;

const batteryDivChildHandler = function(){ 
  
  
    if( batteryDivChildCount == 0 ){
    batteryDivChildCount =  batteryDiv.childElementCount;
    // console.log('first if executed',batteryDivChildCount)

    }
    if(batteryDivChildCount == 1){
      svgInfoTaker()
    //  console.log('cleatInterval block executed')
      batteryCheckClearInterval()
      
    }
}

const batteryCheckInterval =  setInterval(() => {
   batteryDivChildHandler()
  //  console.log('this is batteryCheckInterval')
},3000)

let svgTag;
const batteryCheckClearInterval = function () {
  clearInterval(batteryCheckInterval)
} 



let svgInfoTaker = ()=>{}
// if(!isMobile){
 svgInfoTaker = () => {
svgTag = document.querySelector("#battery").firstElementChild;

let BatteryDivHeight = getComputedStyle(batteryDiv)
let svgHeight = getComputedStyle(svgTag).height;

svgHeightUpdater()




}
// }


const secondAlienDiv = document.querySelector('#second-alien') 
let calculatedTopForThunder;
let thunderHeight ;
let executed = false;
let alienDivHeight;
let alienDivWidth;
let parsedBatteryDivHeight;
let parsedBatteryDivMargin;
let svgHeightUpdater=()=>{}
// if (!isMobile){
  svgHeightUpdater = () => setInterval(() => {
  BatteryDivHeight = getComputedStyle(batteryDiv).height
  BatteryDivMargin = getComputedStyle(batteryDiv).marginTop
  alienDivHeight = getComputedStyle(alienDiv).height 
  alienDivWidth = getComputedStyle(alienDiv).width 
  parsedBatteryDivHeight = parseFloat(BatteryDivHeight)
  parsedBatteryDivMargin = parseFloat(BatteryDivMargin)

  calculatedTopForThunder = (parsedBatteryDivHeight + parsedBatteryDivMargin) - 10;

  thunder.style.top = calculatedTopForThunder + 'px'
  secThunder.style.top = calculatedTopForThunder + 'px'
  secthunderCopy.style.top = calculatedTopForThunder + 'px'
  thunderCopy2.style.top = calculatedTopForThunder + 'px'
  thunderHeight = parseFloat(getComputedStyle(thunder).height)
  secondAlienDiv.style.width = alienDivWidth
  if(thunder.style.height == '30vh'){
    
    horizontalThunder.style.top = calculatedTopForThunder + thunderHeight + "px"
    sideThunder1.style.top = calculatedTopForThunder + thunderHeight + "px"
    sideThunder2.style.top = calculatedTopForThunder + thunderHeight + "px"
    

    if(horizontalThunder.style.width !== '100vw' && executed == false){
     console.log('horizontal expalndder is executed')
    executed = true;
    setTimeout( () => {
      horizontalThunder.style.width = 100 + 'vw' 
      
      horizontalThunder.style.right = 0; 
      sideThunderExpander()
    }, 3000)}
  }
}, 2000)

// }


let heightInterval2;


const heightInterval = function (element, desiredam){
 heightInterval2 = setInterval(()=> gradIncrement(element, desiredam), 30)
}


//Creating the thunders

 const thunder = document.querySelector('.line');

 const secThunder = document.querySelector('.secline')
 const powerUnit = document.querySelector('#powerUnit')

  const secthunderCopy = secThunder.cloneNode(true);
  secthunderCopy.id = "fourthThunder"
  secthunderCopy.style.right = '36%';
   powerUnit.appendChild(secthunderCopy);




 const thunderCopy2 = thunder.cloneNode(true)
 thunderCopy2.id = 'thirdThunder'; 
 thunderCopy2.style.right = '34%';
 powerUnit.appendChild(thunderCopy2)



//horizontal Thunder Design
let horizontalThunder = thunder.cloneNode(true);
horizontalThunder.id = "horizontalThunder"; 
horizontalThunder.style.right = 14.5 + '%';
horizontalThunder.style.height = 6 + 'px';
horizontalThunder.style.width = 5 + 'vw';
powerUnit.appendChild(horizontalThunder)


let sideThunder1 = horizontalThunder.cloneNode(true)
sideThunder1.id = 'sideThunder';
const alienDiv = document.querySelector('.alien')
// let alienDivHeight = getComputedStyle(alienDiv).height

sideThunder1.style.right = 0;
sideThunder1.style.left = 0;
sideThunder1.style.width = 0;

const sideThunderExpander = () => {
  setTimeout(()=> {
    sideThunder1.style.height = alienDivHeight
    sideThunder2.style.height = alienDivHeight
    
  }, 2000)
  
}

const sideThunder2 = horizontalThunder.cloneNode(true);
sideThunder2.id = 'sideThunderRight'
sideThunder2.style.right = 1 + '%'
sideThunder2.style.width = 0;
sideThunder2.style.filter = 'url(#wavy2)';



powerUnit.appendChild(sideThunder1)
powerUnit.appendChild(sideThunder2)





const techHoriThunder = horizontalThunder.cloneNode(true);
techHoriThunder.id = 'techHoriThunderId'
techHoriThunder.style.right = 0 + '%'
techHoriThunder.style.bottom = 0 



//technologies Animation Start
const technologiesDiv = document.querySelector('#technologies')

technologiesDiv.appendChild(techHoriThunder)

const techHoriThunderLeft = horizontalThunder.cloneNode(true);
techHoriThunderLeft.id = 'techHoriThunderLeftId'
techHoriThunderLeft.style.left = 0 + '%'
techHoriThunderLeft.style.bottom = 0 
techHoriThunderLeft.style.filter = 'url(#wavy2)'
//technologies Animation Start

technologiesDiv.appendChild(techHoriThunderLeft)

const jsPlayer = () => (setTimeout(() => {js.play()}, 500))
const TechsPlayer = () => {

} 

let technologiesAreMounted = false;
//the scroll functionality of technologies animations
//and lazy loading animations
ScrollTrigger.create({
  trigger:'#technologies',
  start: 'top bottom',
  end: 'center top',
  // markers: true,
  scrub: true ,
  onEnter:() => {
    if(technologiesAreMounted == false)
    {

      technologiesAreMounted = true
  //adding css to page
  css = bodymovin.loadAnimation({
    container: document.querySelector('#css'),
    renderer: 'canvas',
    loop:false,
    autoplay: false,
    path: './Animations/CSS/81 Precent Compression/data.json'
  })

  
  // adding js to the page

   js = bodymovin.loadAnimation({
    container: document.querySelector('#js'),
    renderer: 'canvas',
    loop:false,
    autoplay: false,
    path: './Animations/JavaScript/Transparent 81Precent Compressoin/data.json'
  })


 HTLan = bodymovin.loadAnimation({
    container: document.querySelector('#html'),
    renderer: 'canvas',
    loop:false,
    autoplay: false,
    path: './Animations/HTML/Transparented 81Recent Copression/data.json'
  })
  
HTLan.addEventListener('complete', () => HTLan.goToAndPlay(30,true))
css.addEventListener('complete', () => css.goToAndPlay(50,true))
js.addEventListener('complete', () => js.goToAndPlay(60,true))


  
      techHoriThunder.style.width = '52%'
      techHoriThunderLeft.style.width = "52%"
      

  
      // setTimeout(() => {
      //   HTLan.play()
      //   css.play()
      //   jsPlayer()
      // }, 1000)

      HTLan.addEventListener('DOMLoaded',(e)=>{
        const htmltechload = document.querySelector('#htmltechLoad')
        htmltechload.parentNode.removeChild(htmltechload)
        setTimeout(()=>{HTLan.play()},1000)
        
    
      })

      
      css.addEventListener('DOMLoaded',(e)=>{
        const csstechload = document.querySelector('#csstechLoad')
        csstechload.parentNode.removeChild(csstechload)
        setTimeout(()=>{css.play()},1000)
        
    
      })

      js.addEventListener('DOMLoaded',(e)=>{
        const jstechload = document.querySelector('#jstechLoad')
        jstechload.parentNode.removeChild(jstechload)
        setTimeout(()=>{js.play()},1000)
        
    
      })



      

    }
    
  

  },
  
   onLeave: () => {
      HTLan.pause();
      css.pause()
      js.pause()

      
      },
   onEnterBack: () => {
     if(sideThunder2.style.height == alienDivHeight){
       HTLan.play()}
       css.play()
       js.play()
    },
   onLeaveBack: () => {
      HTLan.pause()
      css.pause()
      js.pause()
    }
})


const reactBottomThunder = techHoriThunder.cloneNode(true)
reactBottomThunder.id = 'react-bottom-thudner-id'
reactBottomThunder.style.position = "absolute"
document.querySelector('#react-container').appendChild(reactBottomThunder)


ScrollTrigger.create({
  trigger:'#react-container',
  start: 'top center',
  end: 'center top',
  // markers: true,
  scrub: true ,
  onEnter:() => {
   
        reactBottomThunder.style.width = '50%' 
        
        setTimeout(() => {
          // console.log('react Played')
        react.play()
        
        }, 3000)
        
    
  },

   onLeave: () => {
      react.pause();
      
      
      },
   onEnterBack: () => {
     if(sideThunder2.style.height == alienDivHeight){
       react.play()}
       
    },
   onLeaveBack: () => {
      react.pause()
     
    }
})


react.addEventListener('complete', () =>(react.goToAndPlay(70, true)))



const navigators = document.querySelectorAll('.navigator')
const navItems = document.querySelectorAll('.nav-item')
const options = {
  root: null,
  
  
  
}

function activator (entry, activatedID){
  // console.log(entry)
  if(entry.isIntersecting == true){

    navItems.forEach(navitem => {navitem.classList.remove('active')})
  let willBeActivedID = `nav-${activatedID}-item`
  const willBeActived = document.getElementById(willBeActivedID)
  // console.log('this is will be actived', willBeActived)
  willBeActived.classList.add('active')
  } 
  

}

const observer = new IntersectionObserver(function (entries, observer){

  entries.forEach(entry => {

    // console.log(entry.target.id)
    activator(entry, entry.target.id)


  })

}, options)


navigators.forEach(navigator => {
  observer.observe(navigator)
})




//clicking the google's error massage :(





  // ScrollTrigger.create({
  //   trigger:'.contact-form',
  //   start: 'top bottom',
   
    
    
  //   onEnter:() => {
      
  // const googleDismissButton = document.querySelector('.dismissButton');
  // setTimeout( () => {
  //   if(googleDismissButton)
  //   {

  //     // console.log('this is dismiss button ', googleDismissButton)
  // googleDismissButton.click()
  //   }
  // }     
  //   ,1000)
  //   },
    
  // })
  






window.addEventListener('load', () => {
  //removing googl's credential question
 
  // const batteryCanvas = batteryDiv.children[0]
  // batteryCanvas.style.transform = 'translateX(-17%)'


navigators.forEach(navigator => {
  observer.observe(navigator)
})

    
  })


  // document.querySelector('.contact100-map').style.width = '100%'

  // reactContainer.children[0].style.width = "60%"







  let userAgentString = 
  navigator.userAgent;

// Detect Chrome
let chromeAgent = 
  userAgentString.indexOf("Chrome") > -1;

// Detect Internet Explorer
let IExplorerAgent = 
  userAgentString.indexOf("MSIE") > -1 || 
  userAgentString.indexOf("rv:") > -1;

// Detect Firefox
let firefoxAgent = 
  userAgentString.indexOf("Firefox") > -1;

// Detect Safari
let safariAgent = 
  userAgentString.indexOf("Safari") > -1;
    
// Discard Safari since it also matches Chrome
if ((chromeAgent) && (safariAgent)) 
  safariAgent = false;

// Detect Opera
let operaAgent = 
  userAgentString.indexOf("OP") > -1;
    
// Discard Chrome since it also matches Opera     
if ((chromeAgent) && (operaAgent)) 
  chromeAgent = false;




//Matrix Rain Start



var c = document.getElementById("c");
var ctx = c.getContext("2d");

// let monitor;


//making the canvas full screen




// let english =   ['HTML', 'CSS', 'JavaScript', 'React', 'SCSS', 'jquery','WordPress', 'Gsap', 'Redux','FireBase' ]
let english =   'HTML CSS JS React FireB Gsap JQuery WP'


//converting the string into an array of single characters
 english = english.split(" ");


if(!isMobile){
  let font_size = 5;
}else{
  var font_size = 15;
}

var columns = c.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
	drops[x] = 1; 





  var background = new Image();
  background.src = "./assets/images/cty-view.jpg";
  
  // Make sure the image is loaded first otherwise nothing will draw.
  background.onload = function(){
      ctx.drawImage(background,0,0);   
  }




// drawing the characters
function draw()
{
	//Black BG for the canvas
	//translucent BG to show trail
	   ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    // ctx.fillStyle = 'hsla(0, 0%, 0%, 0.5)'
	ctx.fillRect(0, 0, c.width, c.height);
	

  // ctx.globalAlpha = 0.5;
	  // ctx.fillStyle = "#0F0"; //green text
	  ctx.fillStyle = "aqua"; //green text
	ctx.font = font_size + "px arial";
	//looping over drops
	for(var i = 0; i < drops.length; i++)
	{
		//a random chinese character to print
		var text = english[Math.floor(Math.random()*english.length)];
		//x = i*font_size, y = value of drops[i]*font_size
		ctx.fillText(text, i*font_size, drops[i]*font_size);
		
		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if(drops[i]*font_size > c.height && Math.random() > 0.975)
			drops[i] = 0;
		
		//incrementing Y coordinate
		drops[i]++;
	}
}

setInterval(draw, 70);


//Matrix Rain End





//adding box shadow and flying animatin to the flying scroll
if(!isMobile){
let flies = document.querySelectorAll('.scroll-fly')
flies.forEach(fly => {
 
  fly.style.animation = 'Dflying 1s linear infinite'
})
}
