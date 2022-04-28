(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("monMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,a,n)=>{const r=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),m=await r.json();document.getElementById("monMessage").classList.add("hidden"),m.error&&t(m.error),m.redirect&&(window.location=m.redirect),n&&n(m)},hideError:()=>{document.getElementById("monMessage").classList.add("hidden")}}}},t={};function a(n){var r=t[n];if(void 0!==r)return r.exports;var m=t[n]={exports:{}};return e[n](m,m.exports,a),m.exports}(()=>{const e=a(603);let t="";const n=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#monName").value,n=t.target.querySelector("#_csrf").value;return a?(e.sendPost(t.target.action,{name:a,_csrf:n},i),!1):(e.handleError("All fields are required!"),!1)},r=a=>{a.preventDefault(),e.hideError();const n=a.target.parentElement.querySelector("#monName").innerHTML.split("Name:")[1].trim(),r=t;e.sendPost("/update",{name:n,_csrf:r,train:"health"},i),e.sendPost("/pay",{_csrf:r},i)},m=a=>{a.preventDefault(),e.hideError();const n=a.target.parentElement.querySelector("#monName").innerHTML.split("Name:")[1].trim(),r=t;e.sendPost("/update",{name:n,_csrf:r,train:"attack"},i)},o=a=>{a.preventDefault(),e.hideError();const n=a.target.parentElement.querySelector("#monName").innerHTML.split("Name:")[1].trim(),r=t;e.sendPost("/update",{name:n,_csrf:r,train:"speed"},i)},c=e=>React.createElement("form",{id:"monForm",onSubmit:n,name:"monForm",action:"/maker",method:"POST",className:"monForm"},React.createElement("label",{htmlFor:"name"},"Name: "),React.createElement("input",{id:"monName",type:"text",name:"name",placeholder:"Put Mons Name Here"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"makeMonSubmit",type:"submit",value:"Make new Mons"})),s=e=>{if(0===e.mons.length)return React.createElement("div",{className:"monList"},React.createElement("h3",{className:"emptyMon"},"No Mons Yet!"));const t=e.mons.map((e=>React.createElement("div",{key:e._id,className:"mon"},React.createElement("img",{src:"/assets/img/monster-cartoon.png",alt:"monster",className:"monFace"}),React.createElement("h3",{id:"monName",className:"monName"}," Name: ",e.name," "),React.createElement("h3",{className:"monHealth"}," Health: ",e.health," "),React.createElement("h3",{className:"monAttack"}," Attack: ",e.attack," "),React.createElement("h3",{className:"monSpeed"}," Speed: ",e.speed," "),React.createElement("input",{onClick:r,className:"trainHealth",type:"button",value:"Health"}),React.createElement("input",{onClick:m,className:"trainAttack",type:"button",value:"Attack"}),React.createElement("input",{onClick:o,className:"trainSpeed",type:"button",value:"Speed"}))));return React.createElement("div",{className:"monList"},t)},l=e=>React.createElement("div",{id:"moneyCounter",name:"moneyCounter"},React.createElement("label",{htmlFor:"money"},"Money: ",e.money)),i=async()=>{const e=await fetch("/getMons"),t=await e.json();ReactDOM.render(React.createElement(s,{mons:t.mons}),document.getElementById("mons"))};window.onload=async()=>{const e=await fetch("/getToken"),a=await e.json();t=a.csrfToken,console.log(a.csrfToken),ReactDOM.render(React.createElement(c,{csrf:a.csrfToken}),document.getElementById("makeMon")),ReactDOM.render(React.createElement(s,{mons:[]}),document.getElementById("mons")),i();const n=await fetch("/start"),r=await n.json();ReactDOM.render(React.createElement(l,{money:r.money}),document.getElementById("money"))}})()})();