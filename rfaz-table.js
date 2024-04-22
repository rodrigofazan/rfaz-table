/*
rfazTable() - Create a HTML Table based in a json with the data or the API adress 
Author: Rodrigo Fazan
*/
const rfazTable = (tableObject) => {
    const type = tableObject.hasOwnProperty('api') ? 'api' : 'local';
    const obtainDataParam = (type === "api") ? tableObject.api : tableObject.localData; 
    
    //add style to the table
    setStyle(tableObject.tableId);
    
    obtainData(type, obtainDataParam, tableObject);
}

const obtainData = (type, dataArg, tableObject) => {
    let resultData;

    if (type === "api"){
        fetch(dataArg.url, dataArg.requestOptions)
            .then(response => response.text() )
            .then(result => {
                try{
                    resultData = JSON.parse(result);
                    createHtmlTable(tableObject, resultData);
                } catch(err){
                    console.error(err);
                }
            })
            .catch(error => console.log('error', error));
    }else if (type === "local"){
        resultData = dataArg;
        createHtmlTable(tableObject, resultData);
    }
}

//getHeaderFromData(data) - returns the keys of object data to use the keys as table header
const getHeader = (columns, data) => {
    let header = [];

    if (columns){
        columns.forEach(element => {
            header.push(element.title);
        })
    }else{
        header = Object.keys(data[0]);
    }
    
    return header;
} 

//createHtmlTable(id: html table id, header: array with the fields to create the header, data: array of objects with the data) - 
//returns the keys of object data to use the keys as table header
const createHtmlTable = (tableObject, data) => {
    const htmlTable = document.getElementById(tableObject.tableId);
    const header = getHeader(tableObject.columns, data);
    const columns = tableObject.columns;

    //create head
    createHeader(htmlTable, header);

    //create body
    createBoby(htmlTable, header, data, columns);

    //create footer
    createFooter(htmlTable, data);
}

//createHeader(table: html element , columns: array with the fields to create the header) - create the header and append to the table
const createHeader = (table, columns) => {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    
    columns.forEach (element => {
        const th = document.createElement("th");
            th.appendChild( document.createTextNode(element[0].toUpperCase() + element.slice(1)) );
            tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);
}

//createBoby(table: html element , header: header, data: array of obejects with the date) - create the header and append to the table
const createBoby = (table, header, data, columns) => {
    const tbody = document.createElement("tbody");
    let fields = [];

    data.forEach (element => {
        const row = document.createElement("tr");
        let info = "";

        if (columns){
            columns.forEach( headerItem => {
                const td = document.createElement("td");        
                
                if (headerItem.type === "object"){
                    const keys = Object.keys(eval("element."+headerItem.property));
                    
                    if (keys.constructor === Array){
                        keys.forEach(key=>{
                            const obj = eval("element."+headerItem.property);
                            info = obj[key][headerItem.childProp];
                        })
                    }else{
                        info = eval("element."+keys+"."+headerItem.property)
                    }
                    
                }else{
                    info = eval("element."+headerItem.property)
                }

                td.appendChild( document.createTextNode(info) );
                row.appendChild(td);
            })
        }else{            
            header.forEach( headerItem => {
                const td = document.createElement("td");        
                td.appendChild( document.createTextNode(element[headerItem]) );
                row.appendChild(td);
            })
        }
        
        tbody.appendChild(row);
    });
        
    table.appendChild(tbody);
}

const createFooter = (table, data) => {
    const tfoot = document.createElement("tfoot");
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    const span = document.createElement("span");
    span.appendChild(document.createTextNode(data.length));
    td.appendChild(span);
    td.appendChild( document.createTextNode(`rows`) );
    tr.appendChild(td);
    tfoot.appendChild(tr);

    table.appendChild(tfoot);
}

const setStyle = (tableId) => {
    const table = document.getElementById(tableId);

    styleFonts();

    table.classList.add("rfazTable")
}

const styleFonts = () => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css?family=Roboto|Sofia|Trirong:wght@400;500;600;700;800;900&display=swap";

    document.head.appendChild(link);
}