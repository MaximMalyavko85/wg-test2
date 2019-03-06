import * as data from '../data/orders.json';
import * as dataUsers from '../data/users.json';

const orders = data.default;
const users = dataUsers.default;


export default (function () {

  clickTableHeader();
  initialization(orders);
  setIventToTable();

  function initialization( ordersArray){
  
    var table = document.getElementsByTagName('tbody')[0];
    table.innerHTML = "";
    var user;
    ordersArray.forEach((order)=>{
    
    	var row = document.createElement('tr');
      row.id = "order" + order.id;
     	var transaction_id = document.createElement('td');
    	transaction_id.innerHTML = order.transaction_id;

      var id = document.createElement('td');
      var tegA = document.createElement('a');
      
      if ( searchUsers(order.id).user == undefined){
        tegA.innerHTML = "<h6 style = 'color: red; font-size:12px;'>user not found (does not participate in statistics and sorting)</h6>";
      } else {
        user = searchUsers(order.id);
        tegA.innerHTML =  user.name
        tegA.href = "#";
        tegA.style.position = "relative";
        tegA.append (addInfoBlock(user));
        tegA.onclick = function (){
          clickName(order.id);
        };
      }
           
      id.append(tegA);

      var date = document.createElement('td');
      date.innerHTML =  changeDate(order.created_at);

      var total = document.createElement('td');
      total.innerHTML = order.order_country + order.total;

      var card_number = document.createElement('td');
      card_number.innerHTML = changeCardNumber(order.card_number);

      var card_type = document.createElement('td');
      card_type.innerHTML = order.card_type;

      var location = document.createElement('td');
      location.innerHTML = order.order_country+" ("+ order.order_ip +")";

      row.append(transaction_id);
      row.append(id);
      row.append(date);
      row.append(total);
      row.append(card_number);
      row.append(card_type);
    	row.append(location);

    	table.appendChild(row);
    });

    setStatistic(table);

  }

  function changeDate(date){
    var refDate = new Date(Number(date));
    var month = '' + (refDate.getMonth() + 1);
    var day = '' + refDate.getDate();
    var year = refDate.getFullYear();
    var hour = refDate.getHours();
    var minute = refDate.getMinutes();
    var sec = refDate.getSeconds();
    var ampm;
    if (hour < 12){
      ampm = "AM";
    } else {
      ampm = "PM";
    }
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    if (hour.toString().length < 2) hour = '0' + hour;
    if (minute.toString().length < 2) minute = '0' + minute;
    if (sec.toString().length < 2) sec = '0' + sec;



    var dataToString = year+"/"+month+"/"+day+ " " + hour+":" + minute + ":" + sec+ " "+ampm;

  return dataToString;
  }

  function changeDateForUser(date){
    var refDate = new Date(Number(date));
    var month = '' + (refDate.getMonth() + 1);
    var day = '' + refDate.getDate();
    var year = refDate.getFullYear();
       
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var dataToString = day +"/"+month+"/"+year;

  return dataToString;
  }

  function changeCardNumber(value){
    var changeValue =value.replace(eval('/'+value.substr(2,10)+'/'),'**********');

    return changeValue;
  }

  function searchUsers(userId){
    var name;
    var returnUser;
    users.forEach((user)=>{
      if (user.id == userId){
        name = changeName(user);
        returnUser = user;
      }
    });

    return {user:returnUser, name: name};
  }

  function changeName(user){
    var fullName;
    if (user.gender == "Male") {
      fullName = "Mr. "+ user.first_name+" "+user.last_name;
    } else {
      fullName = "Ms. "+ user.first_name+" "+user.last_name;
    }
  
    return fullName;
  }


  function addInfoBlock (user){
    var div = document.createElement('div');
    div.className += " user-details";
    div.style.position = "absolute";
    div.style.width = "200px";
    div.style.bootom = "0";
    div.style.background = "green";
    div.style.display = "none";
    div.style.zIndex = "99";

    try {
      div.id = user.user.id;

      var obj = {};
      obj.Birthday = changeDateForUser(user.user.birthday);
      obj.Company = user.user.company_id;
      obj.Industry = "Apparel / Consumer Services";

    } catch(e){}
    
    for (let key in obj){
      var p = document.createElement('p');
      p.innerHTML = key + ":  " + obj[key];

      p.style.color = "#fff";
      p.style.fontSize = "14px";
      p.style.fontWeight = "bold";
      p.style.paddingLeft = "10px";
      div.append(p);
    }

    var p = document.createElement('p');
    var a = document.createElement('a');

    a.innerHTML = "Bumbershoot Corp."
    a.href = "http://awesome.website";

    p.style.textAlign = "center";
    p.append(a);

    var img = document.createElement('img');
    img.src = '../data/ico/nasa.png';

    div.append(p);
    div.append(img);

  return div;
  }

  function clickName(id) {
    closeBlock();
    var idBlock = document.getElementById(id);
    idBlock.style.display = "block";
  }

  function closeBlock(){
    users.forEach((user)=>{
      var closeBlock = document.getElementById(user.id);
      closeBlock.style.display = "none";
    });
  }


 function setIventToTable(){
   var table  = document.getElementById('tebleHeader').children;
   
   for (let count = 0; count<table.length; count++){
      table[count].onclick = function(){
       sort(this);
     }
   }
 }

 function sort(element){
   closeBlock();
   var el = element.children;
  
  if (element.textContent == "User Info" || element.textContent == "User Info↓"){
      if (element.textContent == "User Info"){

        var sortUser = users.sort(sortByFullNameUp);

        var icoSort = document.createElement('span');
        icoSort.innerHTML = "&#8595;";
        icoSort.style.marginLeft = "10px";
        icoSort.id = "icoSort";
        element.append(icoSort);
        refactOrders(sortUser);
      } else {
        var sortUser = users.sort(sortByFullNameDown);
        refactOrders(sortUser);
        element.textContent = "User Info";
      }
     
    } else if (element.textContent == "Location" || element.textContent == "Location↓"){
        if (element.textContent == "Location"){
          
          var sortOrders = orders.sort(sortByLocationUp);

          var icoSort = document.createElement('span');
          icoSort.innerHTML = "&#8595;";
          icoSort.style.marginLeft = "10px";
          icoSort.id = "icoSort";

          element.append(icoSort);
          refactOrders(sortOrders);
        } else {
          var sortOrders = orders.sort(sortByLocationDown);

        refactOrders(sortOrders);

        element.textContent = "Location";
      }
         
      }

}

   //console.log("add <span></span>");
  
 function sortByFullNameUp(a, b){
    if (a.first_name> b.first_name)
      return -1;
    if (a.first_name< b.first_name) 
      return 1;
    if (a.last_name> b.last_name)
      return -1;
    if (a.last_name< b.last_name) 
      return 1;    
  }

 function sortByFullNameDown(a, b){
    if (a.first_name > b.first_name)
      return 1;
    if (a.first_name< b.first_name) 
      return -1;
    if (a.last_name> b.last_name)
      return 1;
    if (a.last_name< b.last_name) 
      return -1; 
 }

 function sortByLocationUp(a, b){
   if (a.order_country > b.order_country)
      return -1;
    if (a.order_country < b.order_country) 
      return 1;
    if (a.order_ip > b.order_ip)
      return -1;
    if (a.order_ip < b.order_ip) 
      return 1; 
 }

 function sortByLocationDown(a, b){
   if (a.order_country > b.order_country)
      return 1;
    if (a.order_country < b.order_country) 
      return -1;
    if (a.order_ip > b.order_ip)
      return 1;
    if (a.order_ip < b.order_ip) 
      return -1; 
 }

  function refactOrders(sortUsers){
    var newOrder = [];
    sortUsers.forEach((user)=>{
      orders.forEach((order)=>{
        if (user.id == order.id){
          newOrder.push(order);
        }
      });
    });

    initialization(newOrder)
  }

  function clickTableHeader(){
    var style = document.createElement('style');
    style.type = 'text/css';

    var h = '.headerItem:hover{cursor: s-resize;}';
    var hover = document.createTextNode(h);
    style.appendChild(hover);

    var head = document.getElementsByTagName('head')[0];

    head.appendChild(style);
  }

/**
* get Statistiv
* @param { table } the table to which the statistics field will be added
*/
  function setStatistic(table){
    
    var orderCount = createdTd("Orders Count", 5);
    var valueOrderCount = createdTd("$ " + getOrdersLength(), 2);
   
     valueOrderCount.style.textAlign = "right";

    var trOrder = createdTr(orderCount, valueOrderCount);

    var orderTotal = createdTd("Orders Total", 5);
    var valueOrderTotal = createdTd("$ " + getOrdersTotal().toFixed(2), 2);
     valueOrderTotal.style.textAlign = "right";

    var trOrderTotal = createdTr(orderTotal, valueOrderTotal);
    

    var medianValue = createdTd("Median Value", 5);
    var valueMedian = createdTd("$ " + "$ " + getMediana(), 2);
     valueMedian.style.textAlign = "right";

    var valueMedianValue = createdTr(medianValue, valueMedian);

    var averageCheck = createdTd("Average Check", 5);
    var valueAverageCheck = createdTd("$ " + getAverageCheck(getOrdersLength(), getOrdersTotal().toFixed(2)), 2);
    valueAverageCheck.style.textAlign = "right";

    var valueAverageCheck = createdTr(averageCheck, valueAverageCheck);

    var averageFemaleCheck = createdTd("Average Check (Female)", 5);
    var valueAverageFemaleCheck = createdTd("$ " + getAverageFemaleCheck(getOrdersLength(), getOrdersTotal().toFixed(2)).female, 2);
    valueAverageFemaleCheck.style.textAlign = "right";

    var valueAverageFemaleCheck = createdTr(averageFemaleCheck, valueAverageFemaleCheck);

    var averageMaleCheck = createdTd("Average Check (Male)", 5);
    var valueAverageMaleCheck = createdTd("$ " + getAverageFemaleCheck(getOrdersLength(), getOrdersTotal().toFixed(2)).male, 2);
    valueAverageMaleCheck.style.textAlign = "right";

    var valueAverageMaleCheck = createdTr(averageMaleCheck, valueAverageMaleCheck);




    table.append(trOrder);
    table.appendChild(trOrderTotal);
    table.appendChild(valueMedianValue);
    table.appendChild(valueAverageCheck);
    table.appendChild(valueAverageFemaleCheck);
    table.appendChild(valueAverageMaleCheck);
}

/**
* @return { stat } object with statistics fields
*/
  function getOrdersLength(){
    return orders.length;
  }

  /**
* @return { stat } object with statistics fields
*/
  function getOrdersTotal(){
    var summ =0;
    orders.forEach((order)=>{
      summ +=  Number(order.total);
    });

    return summ;
  }

  function getMediana(){
    var mediana;
    var massTotal = [];
    orders.forEach((order)=>{
      massTotal.push(order.total);
    });

    massTotal.sort();

    if (Number.isInteger(massTotal.length/2)){
      var center = massTotal.length/2;

      mediana = (Number(massTotal[center]) + Number(massTotal[center + 1]))/2;
    } else {
     var centerToDown = Math.floor(massTotal.length/2);
     mediana = massTotal[centerToDown + 1];
    }

    return mediana;
  }

  function getAverageCheck(count, total){
    return (total/count).toFixed(2);
  }

  function getAverageFemaleCheck(count, total){
    var massFemale = [];
    var massMan = [];

    users.forEach((user)=>{
      if (user.gender == "Female"){
        massFemale.push(user.id)
      } else {
        massMan.push(user.id);
      }
    });

    var countFemale = getCountFemaleMale(massFemale);
    var countMale = getCountFemaleMale(massMan);
    
    return {
      female: countFemale.toFixed(2),
      male: countMale.toFixed(2)
    };
  }

  function getCountFemaleMale(femaleArray){
    var count=0;
    femaleArray.forEach((id)=>{
      orders.forEach((order)=>{
        if (id === order.id){
          count += Number(order.total);
        }
      });
    });

    return count;
  }

  function createdTd(nameField, colspanValue){
    var td = document.createElement('td');
    td.setAttribute('colspan', colspanValue);
    td.innerHTML = nameField;

    return td;
  }

  function createdTr(itemTd, valueTd){
    var tr = document.createElement('tr');

    tr.append(itemTd);
    tr.append(valueTd);

   return tr;
  }

}());
