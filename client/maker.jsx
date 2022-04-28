const helper = require('./helper.js');
let csrfToken = "";

const handleMon = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#monName').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!name) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, _csrf}, loadMonsFromServer);

    return false;
}

const trainHealth = (e) => {
    e.preventDefault();
    helper.hideError();

    const nameArray =  e.target.parentElement.querySelector('#monName').innerHTML.split("Name:");
    const name = nameArray[1].trim();
    const _csrf = csrfToken;
    const train = "health";
    
    helper.sendPost('/update', {name, _csrf, train}, loadMonsFromServer);
    helper.sendPost('/pay', {_csrf}, loadMonsFromServer);
}

const trainAttack = (e) => {
    e.preventDefault();
    helper.hideError();

    const nameArray =  e.target.parentElement.querySelector('#monName').innerHTML.split("Name:");
    const name = nameArray[1].trim();
    const _csrf = csrfToken;
    const train = "attack";
    
    helper.sendPost('/update', {name, _csrf, train}, loadMonsFromServer);
}

const trainSpeed = (e) => {
    e.preventDefault();
    helper.hideError();

    const nameArray =  e.target.parentElement.querySelector('#monName').innerHTML.split("Name:");
    const name = nameArray[1].trim();
    const _csrf = csrfToken;
    const train = "speed";
    
    helper.sendPost('/update', {name, _csrf, train}, loadMonsFromServer);
}

const MonForm = (props) => {
    return (
        <form id="monForm"
            onSubmit={handleMon}
            name="monForm"
            action="/maker"
            method="POST"
            className="monForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="monName" type="text" name="name" placeholder="Put Mons Name Here" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeMonSubmit" type="submit" value="Make new Mons" />
        </form>
    );
}

const MonList = (props) => {
    if(props.mons.length === 0) {
        return (
            <div className="monList">
                <h3 className="emptyMon">No Mons Yet!</h3>
            </div>
        );
    }

    const monNodes = props.mons.map(mon => {
        return (
            <div key={mon._id} className="mon" >
                <img src="/assets/img/monster-cartoon.png" alt="monster" className="monFace" />
                <h3 id="monName" className="monName"> Name: {mon.name} </h3>
                <h3 className="monHealth"> Health: {mon.health} </h3>
                <h3 className="monAttack"> Attack: {mon.attack} </h3>
                <h3 className="monSpeed"> Speed: {mon.speed} </h3>
                <input onClick={trainHealth} className="trainHealth" type="button" value="Health" />
                <input onClick={trainAttack} className="trainAttack" type="button" value="Attack" />
                <input onClick={trainSpeed} className="trainSpeed" type="button" value="Speed" />
            </div>
        );
    });

    return (
        <div className="monList">
            {monNodes}
        </div>
    );
}

const MoneyCounter = (props) => {
    return (
        <div id="moneyCounter"
            name="moneyCounter"
        >
            <label htmlFor="money">Money: {props.money}</label>
        </div>
    );
}

const loadMonsFromServer = async () => {
    const response = await fetch('/getMons');
    const data = await response.json();
    ReactDOM.render(
        <MonList mons={data.mons} />,
        document.getElementById('mons')
    );
}

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    csrfToken = data.csrfToken;
    console.log(data.csrfToken);
    ReactDOM.render(
        <MonForm csrf={data.csrfToken} />,
        document.getElementById('makeMon')
    );

    ReactDOM.render(
        <MonList mons={[]} />,
        document.getElementById('mons')
    );

    loadMonsFromServer();

    const newResponse = await fetch('/start');
    const newData = await newResponse.json();

    ReactDOM.render(
        <MoneyCounter money={newData.money} />,
        document.getElementById('money')
    );
}

window.onload = init;