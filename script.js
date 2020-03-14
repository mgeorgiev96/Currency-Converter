let outer = document.querySelector(".outer")
let inner = document.querySelector(".inner")
let inner1 = document.querySelector(".inner1")
let data
let base = document.querySelector(".base")
let compare = document.querySelector(".compare")
let amount = document.querySelector(".amount")
let button = document.querySelector("button")
let first = document.querySelector(".first"),
    second = document.querySelector(".second"),
    third = document.querySelector(".third")
let from = document.querySelector(".from")
let to = document.querySelector(".to")
let currentRate
let currentCur
let baseRate
    
let xml  = new XMLHttpRequest()

const getData  = ()=>{

xml.onreadystatechange = ()=>{
    if(xml.readyState===4 && xml.status === 200){
        data = JSON.parse(xml.responseText)
        base.innerHTML = data.base
        baseRate = data.base
    }
  }
xml.open("GET","https://api.exchangeratesapi.io/latest",true)
xml.send()
}


const chooseCurrency = (e)=>{
    let target = e.target
    if(e.target.classList[0]!=="list1" && e.target.classList.length>0){
    compare.innerHTML = e.target.classList[0]
    currentRate = data.rates[e.target.classList[0]] 
    currentCur = e.target.classList[0]
    }
}

const changeBase = (e)=>{
    let target = e.target
    compare.innerHTML = ""
    currentRate= ""
    first.innerHTML =""
    second.innerHTML =""
    third.innerHTML = ""
    xml.onreadystatechange = ()=>{
    if(xml.readyState===4 && xml.status === 200){
        data = JSON.parse(xml.responseText)
        base.innerHTML = data.base
        baseRate = data.base
    }
  }
xml.open("GET",`https://api.exchangeratesapi.io/latest?base=${e.target.classList[0]}`,true)
xml.send()
    
}

const convertAmount = ()=>{
    let regex = /[0-9]/g
    
    if(!currentRate){
        alert("Choose a comparison currency.")
    }else{
        if(amount.value.match(regex).length<amount.value.length){
        alert("Please enter a valid amount.")
    }else{
    let calculate = (+amount.value * currentRate).toFixed(3)
    first.innerHTML = `1 ${baseRate} = ${currentRate.toFixed(3)} ${currentCur}`
    second.innerHTML = `1 ${currentCur} =  ${(1/currentRate).toFixed(3)} ${baseRate}`
    third.innerHTML = `${+amount.value} ${baseRate} = ${calculate} ${currentCur}`
    amount.value = ""
    } 
    }
    
    

}




button.addEventListener("click",convertAmount)
inner1.addEventListener("click",changeBase)
inner.addEventListener("click",chooseCurrency)
getData()