// this is an example of improting data from JSON

import * as data from '../data/orders.json';
import * as dataUsers from '../data/users.json';

const orders = data.default;
const users = dataUsers.default;


export default (function () {
    // YOUR CODE GOES HERE
    // next line is for example only
  initialization();

  function initialization(){
    var table = document.getElementsByTagName('tbody')[0];
    var user;
    orders.forEach((order)=>{
    
    	var row = document.createElement('tr');
      row.id = "order" + order.id;
     	var transaction_id = document.createElement('td');
    	transaction_id.innerHTML = order.transaction_id;

      var id = document.createElement('td');
      var tegA = document.createElement('a');
      
      if ( searchUsers(order.id) == undefined){
        tegA.innerHTML = "<span style = 'color: red'>user not found</span>";
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
    //console.log(user);
    var div = document.createElement('div');
    div.className += " user-details";
    div.style.position = "absolute";
    div.style.width = "200px";
    div.style.bootom = "0";
    div.style.background = "green";
    div.id = user.user.id;
    div.style.display = "none";
    div.style.zIndex = "99";

    var obj = {};
    obj.Birthday = changeDateForUser(user.user.birthday);
    obj.Company = user.user.company_id;
    obj.Industry = "Apparel / Consumer Services";
    
    

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

 
}());
