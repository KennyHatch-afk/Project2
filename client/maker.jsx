const helper = require('./helper.js');
let csrfToken = "";

const handleDomo = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!name) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, _csrf}, loadDomosFromServer);

    return false;
}

const trainHealth = (e) => {
    e.preventDefault();
    helper.hideError();

    const nameArray =  e.target.parentElement.querySelector('#domoName').innerHTML.split("Name:");
    const name = nameArray[1].trim();
    const _csrf = csrfToken;

    helper.sendPost('/update', {name, _csrf}, loadDomosFromServer);

    //const result = await response.json();

    //helper.sendPost("/update", {name}, updateDomo);
}

const updateDomo = async () => {
    //const response = await fetch('/update');
    //const data = await response.json();
}

const trainAttack = (e) => {
    console.log("good");
}

const trainSpeed = (e) => {
    console.log("good");
}

const DomoForm = (props) => {
    return (
        <form id="domoForm"
            onSubmit={handleDomo}
            name="domoForm"
            action="/maker"
            method="POST"
            className="domoForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    );
}

const DomoList = (props) => {
    if(props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(domo => {
        return (
            <div key={domo._id} className="domo" >
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 id="domoName" className="domoName"> Name: {domo.name} </h3>
                <h3 className="domoHealth"> Health: {domo.health} </h3>
                <h3 className="domoAttack"> Attack: {domo.attack} </h3>
                <h3 className="domoSpeed"> Speed: {domo.speed} </h3>
                <input onClick={trainHealth} className="trainHealth" type="button" value="Health" />
                <input onClick={trainAttack} className="trainAttack" type="button" value="Attack" />
                <input onClick={trainSpeed} className="trainSpeed" type="button" value="Speed" />
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
}

const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();
    ReactDOM.render(
        <DomoList domos={data.domos} />,
        document.getElementById('domos')
    );
}

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    csrfToken = data.csrfToken;
    console.log(data.csrfToken);
    ReactDOM.render(
        <DomoForm csrf={data.csrfToken} />,
        document.getElementById('makeDomo')
    );

    ReactDOM.render(
        <DomoList domos={[]} />,
        document.getElementById('domos')
    );

    loadDomosFromServer();
}

window.onload = init;