//���ԒP�ʂ�1���Z�b�g
intTimeStep = 1;

//start�{�^���������̏����iindex.html����Ă΂�Ă܂��j
function startMovie(){
  setPage("01");
  changePage();



  //---------�˂ނ� ��������---------
  //�u�˂ނ��v����������z�u
  for(i=wCenter-20; wCenter+5 > i; i++){
    for(j=hCenter-70; hCenter-47 > j; j++){

      //helper.js��createChar�֐���p���āA�u�˂ނ��v�Ƃ��������������span�v�f�𐶐�
      createChar("�˂ނ�", "particle", i, j, 10);
    }
  }


  /*
  helper.js���̃��\�b�h�ɁA�����Ƃ��ĕ�����"particle"�Ɗ֐���n���Ă��܂��B
  "particle"�́A�u�˂ނ��v�Ƃ�������������HTML��span�v�f�́Aclass�����Ƃ��ăZ�b�g����܂��B

  span�v�f�ɁA�����_���ȕ����̗͂������Ă���l�q��\�����֐����A�ȉ��ō쐬���A
  helper.js����span�̃I�u�W�F�N�g�Ƀ��\�b�h�Ƃ��ăZ�b�g���Ă��܂��B
  */
  makeMethodForEachTime("particle",

    function(){
      randX = Math.floor( Math.random() * 3 ) - 1;
      randY = Math.floor( Math.random() * 3 ) - 1;

      this.addForce(randX, randY);
    }
  );
  //---------�˂ނ� �����܂�---------



  //---------syuu��������---------
  //�V���[�N���[����z�u
  createImg("https://2.bp.blogspot.com/-9sR6Rc3bFos/XGbS0ujXrLI/AAAAAAAAEFY/Z8igVpM4UJ0YdCuiMAT-lkH5X14Jm0OoACLcBGAs/s320/syuu.png", "syuu", wCenter-100, -1500, 100);


  /*
  helper.js���̃��\�b�h�ɁA�����Ƃ��ĕ�����"syuu"�Ɗ֐���n���Ă��܂��B
  "particle"�́A�u�˂ނ��v�Ƃ�������������HTML��span�v�f�́Aclass�����Ƃ��ăZ�b�g����܂��B

  �V���[�N���[���ɁA�������̗͂������Ă���l�q��\�����֐����A�ȉ��ō쐬���A
  helper.js���ŃV���[�N���[���̃I�u�W�F�N�g�ɃZ�b�g���Ă��܂��B
  */
  makeMethodForEachTime("syuu",

    function(){
      this.addForce(0, 2);
    }
  );
  //---------puff�����܂�---------



  //---------fish��������---------
  //����z�u
  for(i=-2; 2 > i; i++){
    createImg("https://3.bp.blogspot.com/-fRYbarwbMjM/XGbSxaRfp4I/AAAAAAAAEFQ/POUGfNyAUfcCU22BYq7o0b8IIPSW5ZDQgCLcBGAs/s320/fish.png", "fish", -500 + i, hCenter + i, 30);
  }
  for(i=-2; 2 > i; i++){
    createImg("https://3.bp.blogspot.com/-fRYbarwbMjM/XGbSxaRfp4I/AAAAAAAAEFQ/POUGfNyAUfcCU22BYq7o0b8IIPSW5ZDQgCLcBGAs/s320/fish.png", "fish", -3500 + i, hCenter + i, 30);
  }


  /*
  helper.js���̃��\�b�h�ɁA�����Ƃ��ĕ�����"fish"�Ɗ֐���n���Ă��܂��B
  "fish"�́A���̉摜��\�����邽�߂�HTML��img�v�f�́Aclass�����Ƃ��ăZ�b�g����܂��B

  �����A�E���ɐi�����Ƃ���͂������Ă���l�q��\�����֐����A�ȉ��ō쐬���A
  helper.js���ŋ��̃I�u�W�F�N�g�ɃZ�b�g���Ă��܂��B
  */
  makeMethodForEachTime("fish",

    function(){
      //X����Y�����ꂼ��Ɋւ��āA�����󂯂�͂��v�Z���Ă��܂��B
      //�i�e�^�C���X�e�b�v���ɁA���������_���ɕϓ�����悤�ɂ��Ă��܂��B�j
      randX = Math.floor( Math.random() * 10 ) - 4;
      randY = Math.floor( Math.random() * 5 ) - 2;

      ��L�Ōv�Z�����͂��A���ɃZ�b�g���A�����x�̌v�Z�܂ł��s���܂��B
      this.addForce(randX, randY);
    }
  );
  //---------fish�����܂�---------



  //helper.js�Œ�`����Ă���nextTime()���\�b�h���A���Ԋu���ƂɌJ��Ԃ��Ăяo���܂��B
  setInterval("nextTime()", intTimeStep);
}