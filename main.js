//時間単位に1をセット
intTimeStep = 1;

//startボタン押下時の処理（index.htmlから呼ばれてます）
function startMovie(){
  setPage("01");
  changePage();



  //---------ねむい ここから---------
  //「ねむい」をたくさん配置
  for(i=wCenter-20; wCenter+5 > i; i++){
    for(j=hCenter-70; hCenter-47 > j; j++){

      //helper.jsのcreateChar関数を用いて、「ねむい」という文字列を持つspan要素を生成
      createChar("ねむい", "particle", i, j, 10);
    }
  }


  /*
  helper.js側のメソッドに、引数として文字列"particle"と関数を渡しています。
  "particle"は、「ねむい」という文字を持つHTMLのspan要素の、class属性としてセットされます。

  span要素に、ランダムな方向の力が働いている様子を表した関数を、以下で作成し、
  helper.js内でspanのオブジェクトにメソッドとしてセットしています。
  */
  makeMethodForEachTime("particle",

    function(){
      randX = Math.floor( Math.random() * 3 ) - 1;
      randY = Math.floor( Math.random() * 3 ) - 1;

      this.addForce(randX, randY);
    }
  );
  //---------ねむい ここまで---------



  //---------syuuここから---------
  //シュークリームを配置
  createImg("https://2.bp.blogspot.com/-9sR6Rc3bFos/XGbS0ujXrLI/AAAAAAAAEFY/Z8igVpM4UJ0YdCuiMAT-lkH5X14Jm0OoACLcBGAs/s320/syuu.png", "syuu", wCenter-100, -1500, 100);


  /*
  helper.js側のメソッドに、引数として文字列"syuu"と関数を渡しています。
  "particle"は、「ねむい」という文字を持つHTMLのspan要素の、class属性としてセットされます。

  シュークリームに、下方向の力が働いている様子を表した関数を、以下で作成し、
  helper.js内でシュークリームのオブジェクトにセットしています。
  */
  makeMethodForEachTime("syuu",

    function(){
      this.addForce(0, 2);
    }
  );
  //---------puffここまで---------



  //---------fishここから---------
  //魚を配置
  for(i=-2; 2 > i; i++){
    createImg("https://3.bp.blogspot.com/-fRYbarwbMjM/XGbSxaRfp4I/AAAAAAAAEFQ/POUGfNyAUfcCU22BYq7o0b8IIPSW5ZDQgCLcBGAs/s320/fish.png", "fish", -500 + i, hCenter + i, 30);
  }
  for(i=-2; 2 > i; i++){
    createImg("https://3.bp.blogspot.com/-fRYbarwbMjM/XGbSxaRfp4I/AAAAAAAAEFQ/POUGfNyAUfcCU22BYq7o0b8IIPSW5ZDQgCLcBGAs/s320/fish.png", "fish", -3500 + i, hCenter + i, 30);
  }


  /*
  helper.js側のメソッドに、引数として文字列"fish"と関数を渡しています。
  "fish"は、魚の画像を表示するためのHTMLのimg要素の、class属性としてセットされます。

  魚が、右側に進もうとする力が働いている様子を表した関数を、以下で作成し、
  helper.js内で魚のオブジェクトにセットしています。
  */
  makeMethodForEachTime("fish",

    function(){
      //X軸とY軸それぞれに関して、魚が受ける力を計算しています。
      //（各タイムステップ毎に、多少ランダムに変動するようにしています。）
      randX = Math.floor( Math.random() * 10 ) - 4;
      randY = Math.floor( Math.random() * 5 ) - 2;

      上記で計算した力を、魚にセットし、加速度の計算までを行います。
      this.addForce(randX, randY);
    }
  );
  //---------fishここまで---------



  //helper.jsで定義されているnextTime()メソッドを、一定間隔ごとに繰り返し呼び出します。
  setInterval("nextTime()", intTimeStep);
}