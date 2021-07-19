
// const childNo1 = document.querySelector('#first-presentation-child')
// var hologram = bodymovin.loadAnimation({
//     container: childNo1,
//     renderer: 'svg',
//     loop: true,
//     autoplay: true,
//     path: "../Animations/animation hologram/data.json"
//   })


  const presentationChildren = document.querySelectorAll('#first-presentation-child')




let hologramIsLoaded  = false

  ScrollTrigger.create({
    trigger:'#first-presentation-child',
    start: 'top center',
    end: 'center 100px',
    // markers: true,
    
    onEnter:() => {
     


if (hologramIsLoaded){
  return
}

hologramIsLoaded = true
      if(!isMobile){
        presentationChildren.forEach(presentationChild => {
        
          let hologram = bodymovin.loadAnimation({
            container: presentationChild,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: "../Animations/animation hologram/data.json"
          })
          presentationChild.style.animation = 'flying 3s linear infinite'
        
        })
      }else{
        presentationChildren.forEach(presentationChild => {
        
          let hologram = bodymovin.loadAnimation({
            container: presentationChild,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: "../Animations/animation hologram/data.json"
          })
          presentationChild.style.animation = 'flying 3s linear infinite'
        
        })
      }
      
      
      






      const projectorFinder = setInterval(() => {
  
        let hologramEl = document.querySelector('#first-presentation-child').children[1];
        
        
      
        hologramEl.style.width = "43%"
        hologramEl.style.height = "20%"
        hologramEl.style.position = "relative"
        // hologramEl.style.z-index = "3"
        // hologramEl.style.border = "3px solid blue"
        hologramEl.style.margin = "0 auto"
      
      console.log('projectorFinder executed')
        if(hologramEl !== undefined){
          projectorFinderkill()
        }
      
      }, 1000);
      





      function projectorFinderkill () {
        clearInterval(projectorFinder)
      }
      
        
      
      // childNo1.style.animation = 'flying 3s linear infinite'
      const secondChild = document.querySelector('.parent').children[1];
      secondChild.style.flexGrow = 2;
      

    }//onEnter closing Brace
    
  })
  






  
  // hologram.id = "hologram-projector"
  // const hologramEl = document.querySelector('.parent').children[0].children[2]
  // hologram
  // width: 43%;
  //   height: 11%;
  //   transform: translate3d(0px, 0px, 0px);
  //   position: relative;
  //   z-index: 3;
  //   border: 3px solid blue;
  //   margin: 0 auto;



// hologramEl.style.width = "43%"
// hologramEl.style.height = "11%"
// hologramEl.style.position = "relative"
// // hologramEl.style.z-index = "3"
// hologramEl.style.border = "3px solid blue"
// hologramEl.style.margin = "0 auto"














//Hologram Functinality




// renderer.setClearColor( 0xffffff, 0);

//End of The hologram Functionality







// const projectorFinder = async function () {
  
//   let hologramEls = document.querySelectorAll('#first-presentation-child');
//     console.log('this is hologram',hologramEls)
//   hologramEls.forEach(async hologramEl =>{

//     let hologramSVG = await hologramEl.children[2]


//   hologramSVG.style.width = "43%"
//   hologramSVG.style.height = "20%"
//   hologramSVG.style.position = "relative"
//   // hologramEl.style.z-index = "3"
//   hologramSVG.style.border = "3px solid blue"
//   hologramSVG.style.margin = "0 auto"

// console.log('projectorFinder executed')
  

//   })
  

// };






// let clones = [];

// let allChildren = document.querySelectorAll('#first-presentation-child')
    
//     for (let index = 0; index < allChildren.length; index++) {
//       clones.push()
//       // allChildren[index].appendChild(projectorsLight)
      
//     }

  