const LOOP = 20;  //数字ボタンの出現回数

let passSec = 0;
let count;
let num;
let cdiv;
let selectLevel;

//背景生成
function chgImg(){
    const pdiv = document.getElementById("parent-div");

    //canvasの描画
    const canvas = document.createElement("canvas");
    canvas.width = 460;
    canvas.height = 345;
    pdiv.appendChild(canvas);
    const context = canvas.getContext("2d");
    context.fillStyle = "#000000";
    context.rect(0,0,canvas.width,canvas.height);
    context.fill();

    //canvasからimgに変換
    const jpg = canvas.toDataURL();
    const newImg = document.createElement("img");
    newImg.src = jpg;
    pdiv.replaceChild(newImg, canvas);
}

//画面内消去
function Clear(){
    while(cdiv.firstChild){
        cdiv.removeChild(cdiv.firstChild);
    }
}

//起動画面
function Start(){
    //タイトル
    const titleText = document.createElement("h1");
    const titleContent = document.createTextNode("Simple Game");
    titleText.appendChild(titleContent);
    titleText.id = "title";
    cdiv.appendChild(titleText);

    //スタートボタン
    const startButton = document.createElement("button");
    const startContent = document.createTextNode("START");
    startButton.appendChild(startContent);
    startButton.id = "start";
    cdiv.appendChild(startButton);

    //難易度選択(ラジオボタン)
    const levelText = document.createElement("p");
    const levelContent = document.createTextNode("-LEVEL-");
    levelText.appendChild(levelContent);
    levelText.id = "level";
    cdiv.appendChild(levelText);
    const levelDiv = document.createElement("div");
    levelDiv.id = "level-div";
    cdiv.appendChild(levelDiv);

      //難易度：難しい
    const hardDiv = document.createElement("div");
    levelDiv.appendChild(hardDiv);
    const hardRadio = document.createElement("input");
    const hardAtt = {
        type: "radio",
        name: "select",
        value: "hard",
        id: "hard"
    }
    for(let i in hardAtt){
        hardRadio[i] = hardAtt[i];
    }
    hardDiv.appendChild(hardRadio);
    const hardLabel = document.createElement("label");
    const hardText = document.createTextNode("Hard");
    hardLabel.appendChild(hardText);
    hardLabel.htmlFor = "hard";
    hardDiv.appendChild(hardLabel);


}

//タイマー処理
function showPassage(){
    const watch = document.getElementById("wat-style");
    passSec++;

    let sec = passSec % 60;  //秒
    let min = parseInt(passSec / 60);  //分

    if(sec <= 9){
        sec = "0" + sec;
    }
    if(min >= 10){
        const watLayout = window.getComputedStyle(watch);
        watch.style.left = watLayout.left;
        watch.style.left = 395 + "px";
    }

    count = min + "：" + sec;
    watch.innerHTML = count;
}

//数字ボタンの位置決定
function Move(){
    let x, y;

    do{
        x = Math.random();  //imgの左上隅画素の中心を原点(0,0)とした時の、右方向へ正のX座標を決める乱数
        y = Math.random();  //imgの左上隅画素の中心を原点(0,0)とした時の、下方向へ正のY座標を決める乱数
    }while((x * 1600 > 200 && y * 800 > 287) || (x * 1600 > 200 && y * 800 < 30));  //終了ボタンやタイマーと重なったらやり直し

    const numberBut = document.getElementById("num-but");
    const numStyle = window.getComputedStyle(numberBut);
    numberBut.style.left = numStyle.left;
    numberBut.style.top = numStyle.top;
    numberBut.style.left = x * 429 + "px";
    numberBut.style.top = y * 324 + "px";
}

//終了画面
function End(issue){
    const name = document.createElement("h1");
    name.id = "nametag";
    const result = document.createElement("h2");
    result.id = "resulttag";

    //1:ゲームクリア, 2:ゲームオーバー
    switch(issue){
        case 1: const winContent = document.body.innerHTML = "<a href=main.html>自己紹介</a>";
                name.appendChild(winContent);
                cdiv.appendChild(name);
                const timeResult = document.createTextNode(count);
                result.appendChild(timeResult);
                cdiv.appendChild(result);
                break;
        case 2: const loseContent = document.body.innerHTML = "<a href=main.html>クリアできない雑魚</a>";
                name.appendChild(loseContent);
                cdiv.appendChild(name);
                const scoreResult = document.createTextNode(num);
                result.appendChild(scoreResult);
                cdiv.appendChild(result);
                const max = document.createElement("h3");
                max.id = "maxtag";
                const maxContent = document.createTextNode("/" + LOOP);
                max.appendChild(maxContent);
                cdiv.appendChild(max);
    }

    //リターンボタン(ページリロード)
    const returnButton = document.createElement("button");
    const returnContent = document.createTextNode("Return");
    returnButton.appendChild(returnContent);
    returnButton.id = "return";
    cdiv.appendChild(returnButton);
    returnButton.onclick = function(){
        window.location.reload();
    }

    //設定難易度の表示
    const selectText = document.createElement("p");
    const myLevel = selectLevel.charAt(0).toUpperCase() + selectLevel.slice(1);
    selectText.innerHTML = "LEVEL: <span id=\"select-" + selectLevel + "\">" + myLevel + "</span>"
    selectText.id = "select-text";
    cdiv.appendChild(selectText);
}

window.onload = function(){
    cdiv = document.getElementById("child-div");
    chgImg();
    Start();

    document.getElementById("start").addEventListener("click", function(){
        let first, next;

        const select = document.getElementsByName("select");

        //ラジオボタンで難易度設定
        for(let i = 0; i < select.length; i++){
            if(select[i].checked){
                selectLevel = select[i].value;
                break;
            }
        }

          //hard:難しい, normal:普通, easy:易しい
        switch(selectLevel){
            case "hard":   first = 700;
                           next = 300 / (LOOP - 1);
                           break;
            case "normal": first = 850;
                           next = 250 / (LOOP - 1);
                           break;
            case "easy":   first = 1000;
                           next = 200 / (LOOP - 1);
        }

        Clear();

        //タイマー生成
        const watch = document.createElement("p");
        watch.id = "wat-style";
        cdiv.appendChild(watch);
        watch.innerHTML = "0：00";
        passSecID = setInterval("showPassage()", 1000);

        //数字ボタンの処理
        const numButton = document.createElement("input");
        numButton.type = "button";
        numButton.value = "01";
        num = 1;
        numButton.id = "num-but";
        cdiv.appendChild(numButton);
        Move();
        timer = setInterval("Move()", first);
        numButton.onclick = function(){
            clearInterval(timer);
            if(num < 9){
                numButton.value = "0" + ++num;
            }else{
                numButton.value = ++num;
            }
            Move();
            timer = setInterval("Move()", first - next * (num - 1));
            if(numButton.value > LOOP){
                clearInterval(timer);
                clearInterval(passSecID);
                Clear();
                End(1);
            }
        }

        //終了ボタン
        const endButton = document.createElement("button");
        const endContent = document.createTextNode("Give up");
        endButton.appendChild(endContent);
        endButton.id = "give-up";
        cdiv.appendChild(endButton);
        endButton.onclick = function(){
            clearInterval(timer);
            clearInterval(passSecID);
            Clear();
            End(2);
        }
    });
}