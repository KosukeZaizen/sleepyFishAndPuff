/*
�u���݃y�[�W(curPage)�v���Z�b�g������ԂŁA
changePage()���\�b�h�����s����ƁA
curPage�̒l�ɍ��킹����ʂɐ؂�ւ��܂��B
*/


//�u���݃y�[�W�v���u00�y�[�W�v�ɃZ�b�g
var curPage = "00";


//�I�u�W�F�N�g���i�[���邽�߂̔z���p��
const objs = [];


//��ʂ̒��S�̈ʒu��ϐ��ɓ���Ă���
wCenter = window.innerWidth/2;
hCenter = window.innerHeight/2;


//��ʓǂݍ��݌�ɂ����y�[�W�ύX
//�i��L��00�y�[�W���Z�b�g�����j
window.onload = function initial(){
  changePage();
}


//�u���݃y�[�W�v��ύX
function setPage(num){
  curPage = num;
}


//�u���݃y�[�W�v����ʂɔ��f������
function changePage(){

  //�upageDiv�v�Ƃ����N���X���������Ƃ��ăZ�b�g����Ă���HTML�v�f�����ׂĎ擾���܂��B
  arrAllPages = document.querySelectorAll(".pageDiv");

  for(let objPage of arrAllPages){

    //��L�Ŏ擾����HTML�v�f�̂����A���݃y�[�W�ƈ�v����div�v�f������\������B
    if(objPage.id == "page" + curPage){

      //��v����Ε\��
      show(objPage);

    } else {

      //��v���Ȃ���Δ�\��
      hide(objPage);
    }
  }
}


//���񏑂��̂��߂�ǂ������̂ŁA�֐��ɂ��܂����B
//�ijQuery�Ȃǂ�p����΂����ƊȒP�ɏ����܂��B�j
function gebId(id){
  return document.getElementById(id);
}


//���񏑂��̂��߂�ǂ������̂ŁA�֐��ɂ��܂����B
//�ijQuery�Ȃǂ�p����΂����ƊȒP�ɏ����܂��B�j
function gebClass(strClass){
  return document.getElementsByClassName(strClass);
}


//�����œn���ꂽ�I�u�W�F�N�g�̕\���������܂��B
//���񏑂��̂��߂�ǂ������̂ŁA�֐��ɂ��܂����B
//�ijQuery�Ȃǂ�p����΂����ƊȒP�ɏ����܂��B�j
function hide(obj){
  obj.style.display="none";
}


//�����œn���ꂽ�I�u�W�F�N�g�̕\����L���ɂ��܂��B
//���񏑂��̂��߂�ǂ������̂ŁA�֐��ɂ��܂����B
//�ijQuery�Ȃǂ�p����΂����ƊȒP�ɏ����܂��B�j
function show(obj){
  obj.style.display="block";
}


/*
�����œn���ꂽ�I�u�W�F�N�g���A�`��Ώۂ̔z��Ɋi�[���܂��B
���̍ہA�����x��ʒu���v�Z���邽�߂̃��\�b�h���A�I�u�W�F�N�g�ɒǉ����Ă��܂��B
*/
function addObj(obj){
  obj.xAccel = 0;
  obj.yAccel = 0;
  obj.xSpeed = 0;
  obj.ySpeed = 0;

  //doEachTime���\�b�h�́A�쐬���ꂽ�S�ẴI�u�W�F�N�g�ɑ΂��Ĉ�莞�Ԃ��ƂɎ��s�����̂ŁA
  //����doEachTime���\�b�h���Z�b�g����Ȃ��I�u�W�F�N�g���������ۂ̃G���[��h�����߁A
  //��̊֐������炩���߃Z�b�g�B
  obj.doEachTime = function(){};

  //�󂯂��͂����ɁA�����x�v�Z
  // (�����x) = (�󂯂���) / (���̂̏d��)
  obj.addForce = function(xForce, yForce){
    this.xAccel = xForce / this.weight;
    this.yAccel = yForce / this.weight;
  }

  //�����x�����ɁA���x�v�Z
  // (���x�ω�) = (���x) + (�����x) * (����)
  obj.calcSpeed = function(){
    this.xSpeed = this.xSpeed + this.xAccel * intTimeStep;
    this.ySpeed = this.ySpeed + this.yAccel * intTimeStep;
  }

  //���x�����ɁA�ʒu�v�Z
  // (�ʒu�ω�)= (�ʒu) + (���x) * (����)
  obj.calcPos = function(){
    this.style.left = parseInt(this.style.left) + Math.floor(this.xSpeed * intTimeStep) + "px";
    this.style.top = parseInt(this.style.top) + Math.floor(this.ySpeed * intTimeStep) + "px";
  };

  //�`��Ώۂ̃I�u�W�F�N�g���i�[���邽�߂̔z��Ɋi�[
  objs.push(obj);
}


/*
�u�˂ނ��v���̕����𓮂�����悤�ɐ�������֐��ł��B
*/
function createChar(char, strClass, x, y, weight){

  //span�Ƃ�����ނ�HTML�v�f�����ispan�̓O�O��Əo�Ă���Ǝv���܂��B�j
  var span = document.createElement("span");

  //�����Ŏ󂯎����������HTML�Ƃ��ĕۗL�i���̏ꍇ�́u<span>�˂ނ�</span>�v�j
  span.innerHTML = char;

  //�쐬����HTML�v�f��class�����ɁA�����Ŏ󂯎������������Z�b�g����
  span.className = strClass;

  //�uposition:fixed�v��uposition:absolute�v���Z�b�g����ƁA���̗v�f�̈ʒu�ɉe����^�����A��ʏ�����R�ɓ������܂��B
  span.style.position = "fixed";

  //�����Ŏ󂯎�����A�����ʒu���Z�b�g���܂��B
  span.style.top = y + "px";
  span.style.left = x + "px";


  //�u���݃y�[�W�v��id������div�v�f�̒��ɁA��L�ō쐬����span�v�f��z�u���܂��B
  gebId("page" + curPage).appendChild(span);


  //�����Ŏ󂯎�����A���̂̏d�����Z�b�g���܂��B
  span.weight = weight;

  //�쐬����span�v�f���A�`��ΏۂƂ��ăZ�b�g���܂��B
  addObj(span);
}


/*
����V���[�N���[���̉摜�𓮂�����悤�ɐ�������֐��ł��B
*/
function createImg(strSrc, strClass, x, y, weight){

  //HTML��img�v�f���쐬
  var img = document.createElement("img");

  //�����Ŏ󂯎�����A�摜�̊i�[�ꏊ��URL���Z�b�g
  img.src = strSrc;

  //�����Ŏ󂯎����HTML�v�f��class�������Z�b�g
  img.className = strClass;

  //�uposition:fixed�v��uposition:absolute�v���Z�b�g����ƁA���̗v�f�̈ʒu�ɉe����^�����A��ʏ�����R�ɓ������܂��B
  img.style.position = "fixed";

  //�����Ŏ󂯎�����A�����ʒu���Z�b�g���܂��B
  img.style.top = y + "px";
  img.style.left = x + "px";


  //�u���݃y�[�W�v��id������div�v�f�̒��ɁA��L�ō쐬����img�v�f��z�u���܂��B
  gebId("page" + curPage).appendChild(img);


  //�����Ŏ󂯎�����A���̂̏d�����Z�b�g���܂��B
  img.weight = weight;

  //�쐬����span�v�f���A�`��ΏۂƂ��ăZ�b�g���܂��B
  addObj(img);
}


/*
main.js������A�e�I�u�W�F�N�g�ɑ΂��ă^�C���X�e�b�v���ƂɎ��s�������֐����n����܂��̂ŁA
�e�I�u�W�F�N�g�ɁAdoEachTime()�Ƃ������\�b�h���ŁA���̓n����Ă����֐����������܂��B

�u�V���[�N���[���͉������ɗ͂��󂯂�v��
�u"�˂ނ�"�̓����_���ȕ����ɗ͂��󂯂�v�Ȃǂ̊֐����n����Ă��܂��B
*/
function makeMethodForEachTime(strClass, func){

  for (let obj of objs){
    if(obj.className == strClass){
      //�����œn����Ă����N���X���Ɉ�v����I�u�W�F�N�g�ɑ΂��Ă̂݁A
      //�����œn���ꂽ�֐����A���\�b�h�Ƃ��Ď������܂��B
      obj.doEachTime = func;
    }
  }
}


/*
main.js���̍ŏI�s����Ăяo����Ă��܂��B
���Ԋu�i�^�C���X�e�b�v�j���Ɏ��s�����֐��ł��B
*/
function nextTime(){

  //���ׂĂ̕`��ΏۃI�u�W�F�N�g�ɑ΂��A�ȉ��̌v�Z���s���܂��B
  for (let obj of objs){

    //�󂯂��͂Ɖ����x���v�Z
    obj.doEachTime();

    //���x���v�Z
    obj.calcSpeed();

    //�ʒu�v�Z
    obj.calcPos();
  }
}