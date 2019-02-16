/*
「現在ページ(curPage)」をセットした状態で、
changePage()メソッドを実行すると、
curPageの値に合わせた画面に切り替わります。
*/


//「現在ページ」を「00ページ」にセット
var curPage = "00";


//オブジェクトを格納するための配列を用意
const objs = [];


//画面の中心の位置を変数に入れておく
wCenter = window.innerWidth/2;
hCenter = window.innerHeight/2;


//画面読み込み後にすぐページ変更
//（上記の00ページがセットされる）
window.onload = function initial(){
  changePage();
}


//「現在ページ」を変更
function setPage(num){
  curPage = num;
}


//「現在ページ」を画面に反映させる
function changePage(){

  //「pageDiv」というクラス名が属性としてセットされているHTML要素をすべて取得します。
  arrAllPages = document.querySelectorAll(".pageDiv");

  for(let objPage of arrAllPages){

    //上記で取得したHTML要素のうち、現在ページと一致するdiv要素だけを表示する。
    if(objPage.id == "page" + curPage){

      //一致すれば表示
      show(objPage);

    } else {

      //一致しなければ非表示
      hide(objPage);
    }
  }
}


//毎回書くのがめんどくさいので、関数にしました。
//（jQueryなどを用いればもっと簡単に書けます。）
function gebId(id){
  return document.getElementById(id);
}


//毎回書くのがめんどくさいので、関数にしました。
//（jQueryなどを用いればもっと簡単に書けます。）
function gebClass(strClass){
  return document.getElementsByClassName(strClass);
}


//引数で渡されたオブジェクトの表示を消します。
//毎回書くのがめんどくさいので、関数にしました。
//（jQueryなどを用いればもっと簡単に書けます。）
function hide(obj){
  obj.style.display="none";
}


//引数で渡されたオブジェクトの表示を有効にします。
//毎回書くのがめんどくさいので、関数にしました。
//（jQueryなどを用いればもっと簡単に書けます。）
function show(obj){
  obj.style.display="block";
}


/*
引数で渡されたオブジェクトを、描画対象の配列に格納します。
その際、加速度や位置を計算するためのメソッドを、オブジェクトに追加しています。
*/
function addObj(obj){
  obj.xAccel = 0;
  obj.yAccel = 0;
  obj.xSpeed = 0;
  obj.ySpeed = 0;

  //doEachTimeメソッドは、作成された全てのオブジェクトに対して一定時間ごとに実行されるので、
  //仮にdoEachTimeメソッドがセットされないオブジェクトがあった際のエラーを防ぐため、
  //空の関数をあらかじめセット。
  obj.doEachTime = function(){};

  //受けた力を元に、加速度計算
  // (加速度) = (受けた力) / (物体の重さ)
  obj.addForce = function(xForce, yForce){
    this.xAccel = xForce / this.weight;
    this.yAccel = yForce / this.weight;
  }

  //加速度を元に、速度計算
  // (速度変化) = (速度) + (加速度) * (時間)
  obj.calcSpeed = function(){
    this.xSpeed = this.xSpeed + this.xAccel * intTimeStep;
    this.ySpeed = this.ySpeed + this.yAccel * intTimeStep;
  }

  //速度を元に、位置計算
  // (位置変化)= (位置) + (速度) * (時間)
  obj.calcPos = function(){
    this.style.left = parseInt(this.style.left) + Math.floor(this.xSpeed * intTimeStep) + "px";
    this.style.top = parseInt(this.style.top) + Math.floor(this.ySpeed * intTimeStep) + "px";
  };

  //描画対象のオブジェクトを格納するための配列に格納
  objs.push(obj);
}


/*
「ねむい」等の文字を動かせるように生成する関数です。
*/
function createChar(char, strClass, x, y, weight){

  //spanという種類のHTML要素を作る（spanはググると出てくると思います。）
  var span = document.createElement("span");

  //引数で受け取った文字をHTMLとして保有（この場合は「<span>ねむい</span>」）
  span.innerHTML = char;

  //作成したHTML要素のclass属性に、引数で受け取った文字列をセットする
  span.className = strClass;

  //「position:fixed」や「position:absolute」をセットすると、他の要素の位置に影響を与えず、画面上を自由に動かせます。
  span.style.position = "fixed";

  //引数で受け取った、初期位置をセットします。
  span.style.top = y + "px";
  span.style.left = x + "px";


  //「現在ページ」のidを持つdiv要素の中に、上記で作成したspan要素を配置します。
  gebId("page" + curPage).appendChild(span);


  //引数で受け取った、物体の重さをセットします。
  span.weight = weight;

  //作成したspan要素を、描画対象としてセットします。
  addObj(span);
}


/*
魚やシュークリームの画像を動かせるように生成する関数です。
*/
function createImg(strSrc, strClass, x, y, weight){

  //HTMLのimg要素を作成
  var img = document.createElement("img");

  //引数で受け取った、画像の格納場所のURLをセット
  img.src = strSrc;

  //引数で受け取ったHTML要素のclass属性をセット
  img.className = strClass;

  //「position:fixed」や「position:absolute」をセットすると、他の要素の位置に影響を与えず、画面上を自由に動かせます。
  img.style.position = "fixed";

  //引数で受け取った、初期位置をセットします。
  img.style.top = y + "px";
  img.style.left = x + "px";


  //「現在ページ」のidを持つdiv要素の中に、上記で作成したimg要素を配置します。
  gebId("page" + curPage).appendChild(img);


  //引数で受け取った、物体の重さをセットします。
  img.weight = weight;

  //作成したspan要素を、描画対象としてセットします。
  addObj(img);
}


/*
main.js側から、各オブジェクトに対してタイムステップごとに実行したい関数が渡されますので、
各オブジェクトに、doEachTime()というメソッド名で、その渡されてきた関数を持たせます。

「シュークリームは下向きに力を受ける」や
「"ねむい"はランダムな方向に力を受ける」などの関数が渡されてきます。
*/
function makeMethodForEachTime(strClass, func){

  for (let obj of objs){
    if(obj.className == strClass){
      //引数で渡されてきたクラス名に一致するオブジェクトに対してのみ、
      //引数で渡された関数を、メソッドとして持たせます。
      obj.doEachTime = func;
    }
  }
}


/*
main.js側の最終行から呼び出されています。
一定間隔（タイムステップ）毎に実行される関数です。
*/
function nextTime(){

  //すべての描画対象オブジェクトに対し、以下の計算を行います。
  for (let obj of objs){

    //受けた力と加速度を計算
    obj.doEachTime();

    //速度を計算
    obj.calcSpeed();

    //位置計算
    obj.calcPos();
  }
}