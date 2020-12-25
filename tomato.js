// 目前日期時間
let now = new Date();
document.querySelector(".time h1").innerHTML = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
document.querySelector(".time h2").innerHTML = appendZero(now.getHours()) + ":" + appendZero(now.getMinutes());
setInterval(function () {
  let now = new Date();
  let time = appendZero(now.getHours()) + ":" + appendZero(now.getMinutes());
  if (time != document.querySelector(".time h2").innerHTML) {
    document.querySelector(".time h2").innerHTML = time;
  }
}, 1000);

function appendZero(v) {
  if (v < 10) {
    return "0" + "" + v;
  } else {
    return v;
  }
}


let btn = document.querySelector('.send');
function saveTitle(e){
    let titleStr = document.querySelector('.title').value;
    let saveTitle = localStorage.getItem('saveTitle');
    
    if(saveTitle == null) {
        let newarr = [];
        newarr.push(titleStr);
        localStorage.setItem('saveTitle',JSON.stringify(newarr));
    }else {
        let arr = JSON.parse(saveTitle);
        arr.push(titleStr);
        localStorage.setItem('saveTitle',JSON.stringify(arr));
    }
    
    showtodo();

    document.querySelector(".title").value = "";
    document.querySelector(".addTask").style.display = "none";
    document.querySelector(".todo").style.display = "block";
}


btn.addEventListener('click',saveTitle);
showtodo();

// 把localStorage的值顯示到畫面上的 todo
function showtodo() {
  let saveTitleCount = 0 ;
  let doneTitleCount = 0 ;
  let length = 0;
  let todo = document.querySelector(".todolist");
  let getsaveTitleAry = JSON.parse(localStorage.getItem('saveTitle'));
  //todo
  if(localStorage.getItem('saveTitle') != null) {
    saveTitleCount = getsaveTitleAry.length;
    if(getsaveTitleAry.length > 5) {
        length = 5;
    }else {
        length = getsaveTitleAry.length;
    }
  }

  todo.innerHTML = "";

  for(let i = 0 ; i < 5 ; i++) {
    if(i < length){
      todo.innerHTML += '<div class="item"><i class="fas fa-arrow-right"></i><p>' + getsaveTitleAry[i] + "</p></div>";
    } else {
      todo.innerHTML += '<div class="item"><i class="fas fa-arrow-right"></i><p></p></div>';
    }
  }
  

  length = 0;
  let getdoneTitleAry = JSON.parse(localStorage.getItem('doneTitle'));
  let done = document.querySelector('.donelist');
  //done
  if(localStorage.getItem("doneTitle") != null){
    doneTitleCount = getdoneTitleAry.length;
    if(getdoneTitleAry.length >5){
      length = 5;
    }else{
      length = getdoneTitleAry.length;
    }
  }

  done.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    console.log("x");
    if (i < length) {
      done.innerHTML += '<div class="item"><i class="fas fa-check"></i><p>' + getdoneTitleAry[i] + "</p></div>";
    } else {
      done.innerHTML += '<div class="item"><i class="fas fa-check"></i><p></p></div>';
    }
  }
  
  // 上方文字
  document.querySelector(".list h2").innerHTML = doneTitleCount + " / " + saveTitleCount;
}


//倒數
let isCountDown = false;
let timer;
let time = document.querySelector('.clock h2');
document.querySelector('.play').addEventListener('click', function(e) {
  let saveTitle = localStorage.getItem("saveTitle");
  let saveTitleCount = saveTitle == null ? 0 : JSON.parse(saveTitle).length;
  if (saveTitleCount == 0) {
    alert("目前無todo");
  } else {
    if (isCountDown == true) {
      clearInterval(timer);
      isCountDown = false;
      document.querySelector('.play i').removeAttribute('class');
      document.querySelector('.play i').setAttribute('class', 'fas fa-play');
    } else {
      timer = setInterval(function () {
        countDown();
      }, 1000);
      isCountDown = true;
      document.querySelector('.play i').removeAttribute('class');
      document.querySelector('.play i').setAttribute('class', 'fas fa-pause');
    }
  }
});

function countDown() {
  let status = document.querySelector(".clock h1").innerHTML;
  let minutes = time.innerHTML.split(':')[0];
  let seconds = time.innerHTML.split(':')[1];
  let totalSeconds = parseInt(minutes * 60) + parseInt(seconds);
  if (totalSeconds == 0) {
    if (status == "-Start Work-") {
      time.innerHTML = "05:00";
      document.querySelector(".clock h1").innerHTML = "-Start Break-";
      document.querySelector(".clock h1").style.color = "#19B5FE";
      document.querySelector(".clock h2").style.color = "#19B5FE";
    } else {
      time.innerHTML = "25:00";
      document.querySelector(".clock h1").innerHTML = "-Start Work-";
      document.querySelector(".clock h1").style.color = "#F4D03F";
      document.querySelector(".clock h2").style.color = "#F4D03F";
      if (!removeTodo()) {
        clearInterval(timer);
        isCountDown = false;
        document.querySelector('.play i').removeAttribute('class');
        document.querySelector('.play i').setAttribute('class', 'fas fa-play');
      }
    }
  } else {
    totalSeconds--;
    time.innerHTML = appendZero(parseInt(totalSeconds / 60)) + ':' + appendZero(totalSeconds % 60);
  }
}




//跳下一頁
document.querySelector(".add").addEventListener("click",function(e){
  document.querySelector(".addTask").style.display = "block";
  document.querySelector(".todo").style.display = "none";
})

//關閉新增畫面
document.querySelector(".newtask i").addEventListener('click',function(e){
  document.querySelector(".todo").style.display = "block";
  document.querySelector(".addTask").style.display = "none";
})

//取消新增畫面
document.querySelector(".cancel").addEventListener('click',function(e){
  document.querySelector(".todo").style.display = "block";
  document.querySelector(".addTask").style.display = "none";
})


//直接結束
document.querySelector(".finish").addEventListener("click", function (e) {
  let saveTitle = localStorage.getItem("saveTitle");
  let saveTitleCount = saveTitle == null ? 0 : JSON.parse(saveTitle).length;
  if (saveTitleCount == 0) {
    alert("目前無todo");
  } else {
    time.innerHTML = "25:00";
    document.querySelector(".clock h1").innerHTML = "-Start Work-";
    document.querySelector(".clock h1").style.color = "#F4D03F";
    document.querySelector(".clock h2").style.color = "#F4D03F";
    if (!removeTodo()) {
      clearInterval(timer);

    }
  }
});

// 重新計時
document.querySelector(".redo").addEventListener("click", function (e) {
  let status = document.querySelector(".clock h1").innerHTML;
  if (status == "-Start Work-") {
    time.innerHTML = "25:00";
    document.querySelector(".clock h1").style.color = "#F4D03F";
    document.querySelector(".clock h2").style.color = "#F4D03F";
    clearInterval(timer);
  } else {
    time.innerHTML = "05:00";
    document.querySelector(".clock h1").style.color = "#19B5FE";
    document.querySelector(".clock h2").style.color = "#19B5FE";
    clearInterval(timer);
  }
  isCountDown = false;
  document.querySelector(".play i").removeAttribute("class");
  document.querySelector(".play i").setAttribute("class", "fas fa-play");
});

//移除第一筆 todo，並加到 done 中
function removeTodo() {
  let saveTitle = localStorage.getItem("saveTitle");
  let doneTitle = localStorage.getItem("doneTitle");
  let saveArr = JSON.parse(saveTitle);
  //加到 done
  if (doneTitle == null) {
    let doneArr = [];
    doneArr.push(saveArr[0]);
    localStorage.setItem("doneTitle", JSON.stringify(doneArr));
  } else {
    let doneArr = JSON.parse(doneTitle);
    doneArr.push(saveArr[0]);
    localStorage.setItem("doneTitle", JSON.stringify(doneArr));
  }
  // 移除第一個 todo
  saveArr.splice(0, 1);
  localStorage.setItem("saveTitle", JSON.stringify(saveArr));
  showtodo();

  // 如果 todo 中沒有待辦事項了，就回傳 false
  if (saveArr.length == 0) {
    return false;
  } else {
    return true;
  }
}

