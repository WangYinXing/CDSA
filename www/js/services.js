(function(){
  'use strict';
  
  var module = angular.module('cdsaServices', []);

  module.service('FourPillarCalc', function() {

      this.compute = function (TZ, pDate, GEN, LON, dst) {

      var i, MM, DD, YY, HR, MN, AAA, JD, S, A, J1, JZJD, T, d, M, L0, DL, L, ys0, yb0, FW, yb, ms0, str00, str01, str1, str2, mb, lpb0, LP;
      var lps0, ds0, ds, db0, hs0, hs, hb0, hb, hs1, his1, his2, his3, dis1, dis2, dis3, mis1, mis2, mis3, ms, db, ys, dn;
      var yis1, yis2, yis3, lpb1, lpb2, lpb3, lpb4, lpb5, lpb6, lpb7, lpb8, lps1, lps2, lps3, lps4, lps5, lps6, lps7, lps8;

      var gon = new Array("-Water [Gui癸]", "+Wood [Jia甲]", "-Wood [Yi乙]", "+Fire [Bing丙]", "-Fire [Ding丁]", "+Earth [Wu戊]", "-Earth [Ji己]",
        "+Metal [Geng庚]", "-Metal [Xin辛]", "+Water [Ren壬]", "-Water [Gui癸]");

      var ji = new Array("Pig [Hai亥]", "Rat [Zi子]", "Ox [Chou丑]", "Tiger [Yin寅]", "Rabbit [Mao卯]", "Dragon [Chen辰]", "Snake [Si巳]",
        "Horse [Wu午]", "Goat [Wei未]", "Monkey [Shen申]", "Rooster [You酉]", "Dog [Xu戌]", "Pig [Hai亥]", "Rat [Zi子]");

      MM = pDate.getMonth() + 1;
      DD = pDate.getDate();
      YY = pDate.getFullYear();
      HR = pDate.getHours();
      MN = pDate.getMinutes();

      HR = HR + (MN / 60);
      if ((LON > -181) & (LON < 181)) HR = HR + (LON / 15 - TZ);
      AAA = 1;
      if (YY <= 1585) AAA = 0;
      JD = -1 * Math.floor(7 * (Math.floor((MM + 9) / 12) + YY) / 4);
      S = 1;
      if ((MM - 9) < 0) S = -1;
      A = Math.abs(MM - 9);
      J1 = Math.floor(YY + S * Math.floor(A / 7));
      J1 = -1 * Math.floor((Math.floor(J1 / 100) + 1) * 3 / 4);
      JD = JD + Math.floor(275 * MM / 9) + DD + (AAA * J1);
      JD = JD + 1721027 + 2 * AAA + 367 * YY - 0.5;
      JZJD = JD + (HR / 24);
      JD = JD + (HR / 24) - (TZ / 24);
      T = (JD - 2451545.0) / 36525;
      d = 2 * Math.PI / 360;
      M = 357.52910 + 35999.05030 * T - 0.0001559 * T * T - 0.00000048 * T * T * T;
      L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T * T;
      DL = (1.914600 - 0.004817 * T - 0.000014 * T * T) * Math.sin(d * M);
      DL = DL + (0.019993 - 0.000101 * T) * Math.sin(d * 2 * M) + 0.000290 * Math.sin(d * 3 * M);
      L = L0 + DL;
      for (i = 0; L > 360; i++) {
        L = L - 360;
      }
      for (i = 0; L < 0; i++) {
        L = L + 360;
      }
      if ((L < 315) && (MM == 1 || MM == 2)) {
        ys0 = YY - 4;
        yb0 = YY - 4;
      } else {
        ys0 = YY - 3;
        yb0 = YY - 3;
      }
      for (i = 0; ys0 > 10; i++) {
        ys0 = ys0 - 10;
      }
      ys = gon[ys0];
      for (i = 0; yb0 > 12; i++) {
        yb0 = yb0 - 12;
      }
      if (ys0 % 2 === 0) {
        FW = -1 * GEN;
      } else {
        FW = 1 * GEN;
      }
      yb = ji[yb0];
      ms0 = 1;
      for (i = 0; i < 6; i++) {
        if ((ys0 == i) || (ys0 == i + 5)) {
          ms0 = ms0 + (i * 2);
          if (ms0 > 10) {
            ms0 = ms0 - 10;
          }
        }
      }
      str00 = "Your given date and time is close to the Jie, ";
      str01 = "Please consult Feng Shui Research Center for accurate charting.";
      str1 = "";
      str2 = "";
      if (L > 314.95 && L < 315.05) {
        str1 = str00 + "Spring Beginning.";
        str2 = str01;
      }
      if (L > 344.95 && L < 345.05) {
        str1 = str00 + "Insects Awakening.";
        str2 = str01;
      }
      if (L > 14.95 && L < 15.05) {
        str1 = str00 + "Clear Bright.";
        str2 = str01;
      }
      if (L > 44.95 && L < 45.05) {
        str1 = str00 + "Summer Beginning.";
        str2 = str01;
      }
      if (L > 74.95 && L < 75.05) {
        str1 = str00 + "Planting Crops.";
        str2 = str01;
      }
      if (L > 104.95 && L < 105.05) {
        str1 = str00 + "Lesser Heat.";
        str2 = str01;
      }
      if (L > 134.95 && L < 135.05) {
        str1 = str00 + "Autumn Beginning.";
        str2 = str01;
      }
      if (L > 164.95 && L < 165.05) {
        str1 = str00 + "White Dew.";
        str2 = str01;
      }
      if (L > 194.95 && L < 195.05) {
        str1 = str00 + "Cold Dew.";
        str2 = str01;
      }
      if (L > 224.95 && L < 225.05) {
        str1 = str00 + "Winter Beginning.";
        str2 = str01;
      }
      if (L > 254.95 && L < 255.05) {
        str1 = str00 + "Greater Snow.";
        str2 = str01;
      }
      if (L > 284.95 && L < 285.05) {
        str1 = str00 + "Lesser Cold.";
        str2 = str01;
      }
      if ((L == 315 || L > 315) && (L < 345)) {
        mb = ji[3];
        lpb0 = 3;
        if (FW == 1) {
          LP = ((345 - L) / 3);
        } else {
          LP = ((L - 315) / 3);
        }
      }
      if ((L == 345 || L > 345) || (L < 15)) {
        mb = ji[4];
        lpb0 = 4;
        ms0 = ms0 + 1;
        if (FW == 1) {
          LP = ((375 - L) / 3);
        } else {
          LP = ((L - 345) / 3);
        }
        if (LP > 11) {
          LP = LP - 120;
        }
        if (LP < 0) {
          LP = LP + 120;
        }
      }
      if ((L == 15 || L > 15) && (L < 45)) {
        mb = ji[5];
        lpb0 = 5;
        ms0 = ms0 + 2;
        if (FW == 1) {
          LP = ((45 - L) / 3);
        } else {
          LP = ((L - 15) / 3);
        }
      }
      if ((L == 45 || L > 45) && (L < 75)) {
        mb = ji[6];
        lpb0 = 6;
        ms0 = ms0 + 3;
        if (FW == 1) {
          LP = ((75 - L) / 3);
        } else {
          LP = ((L - 45) / 3);
        }
      }
      if ((L == 75 || L > 75) && (L < 105)) {
        mb = ji[7];
        lpb0 = 7;
        ms0 = ms0 + 4;
        if (FW == 1) {
          LP = ((105 - L) / 3);
        } else {
          LP = ((L - 75) / 3);
        }
      }
      if ((L == 105 || L > 105) && (L < 135)) {
        mb = ji[8];
        lpb0 = 8;
        ms0 = ms0 + 5;
        if (FW == 1) {
          LP = ((135 - L) / 3);
        } else {
          LP = ((L - 105) / 3);
        }
      }
      if ((L == 135 || L > 135) && (L < 165)) {
        mb = ji[9];
        lpb0 = 9;
        ms0 = ms0 + 6;
        if (FW == 1) {
          LP = ((165 - L) / 3);
        } else {
          LP = ((L - 135) / 3);
        }
      }
      if ((L == 165 || L > 165) && (L < 195)) {
        mb = ji[10];
        lpb0 = 10;
        ms0 = ms0 + 7;
        if (FW == 1) {
          LP = ((195 - L) / 3);
        } else {
          LP = ((L - 165) / 3);
        }
      }
      if ((L == 195 || L > 195) && (L < 225)) {
        mb = ji[11];
        lpb0 = 11;
        ms0 = ms0 + 8;
        if (FW == 1) {
          LP = ((225 - L) / 3);
        } else {
          LP = ((L - 195) / 3);
        }
      }
      if ((L == 225 || L > 225) && (L < 255)) {
        mb = ji[12];
        lpb0 = 12;
        ms0 = ms0 + 9;
        if (FW == 1) {
          LP = ((255 - L) / 3);
        } else {
          LP = ((L - 225) / 3);
        }
      }
      if ((L == 255 || L > 255) && (L < 285)) {
        mb = ji[1];
        lpb0 = 1;
        ms0 = ms0 + 10;
        if (FW == 1) {
          LP = ((285 - L) / 3);
        } else {
          LP = ((L - 255) / 3);
        }
      }
      if ((L == 285 || L > 285) && (L < 315)) {
        mb = ji[2];
        lpb0 = 2;
        ms0 = ms0 + 11;
        if (FW == 1) {
          LP = ((315 - L) / 3);
        } else {
          LP = ((L - 285) / 3);
        }
      }
      if (ms0 > 10) {
        ms0 = ms0 - 10;
      }
      ms = gon[ms0];
      lps0 = ms0;
      ds0 = "" + Math.floor(JZJD + 0.5);
      ds = gon[ds0.substring(6, 7)];
      db0 = Math.floor(JZJD - 12 * Math.floor((JZJD + 0.5) / 12) + 0.5) + 2;
      db = ji[db0];
      hs0 = 1;
      hs1 = 0;
      for (i = 1; i < 5; i++) {
        if ((parseInt(ds0.substring(6, 7)) == i) || (parseInt(ds0.substring(6, 7)) == i + 5)) {
          hs1 = hs0;
        }
        hs0 = hs0 + 2;
      }
      if ((parseInt(ds0.substring(6, 7)) === 0) || (parseInt(ds0.substring(6, 7)) == 5)) {
        hs1 = 9;
      }

      if ( HR < 0 )
        HR = HR + 24;
      else if ( HR > 24 )
          HR = HR - 24;

      var sHR = Math.floor(HR);
      var sMin = Math.ceil((HR - sHR) * 60.0);


      var solarTime = sHR.toString() + " : " + ( (sMin < 10) ? "0" + sMin.toString() : sMin.toString() );
      
      if ((HR == 23) || (HR > 23 && HR < 24)) {
        hs1 = hs1 + 2;
      }
      if (((HR == 23) || (HR > 23 && HR < 24)) || ((HR === 0) || (HR > 0 && HR < 1) || (HR == 24))) {
        hb = ji[1];
      }
      hb0 = 2;
      for (i = 1; i < 23; i++) {
        if ((HR == i) || (HR > i && HR < i + 2)) {
          hb = ji[hb0];
          hs1 = hs1 + hb0 - 1;
        }
        i = i + 1;
        hb0 = hb0 + 1;
      }
      if (hs1 > 10) {
        hs1 = hs1 - 10;
      }
      hs = gon[hs1];

      LP = Math.floor(LP * 100) / 100;

      if (hb == "Pig [Hai亥]") {
        his1 = gon[9];
        his2 = gon[1];
        his3 = "";
      }
      if (hb == "Rat [Zi子]") {
        his1 = gon[0];
        his2 = "";
        his3 = "";
      }
      if (hb == "Ox [Chou丑]") {
        his1 = gon[6];
        his2 = gon[0];
        his3 = gon[8];
      }
      if (hb == "Tiger [Yin寅]") {
        his1 = gon[1];
        his2 = gon[3];
        his3 = gon[5];
      }
      if (hb == "Rabbit [Mao卯]") {
        his1 = gon[2];
        his2 = "";
        his3 = "";
      }
      if (hb == "Dragon [Chen辰]") {
        his1 = gon[5];
        his2 = gon[2];
        his3 = gon[0];
      }
      if (hb == "Snake [Si巳]") {
        his1 = gon[3];
        his2 = gon[5];
        his3 = gon[7];
      }
      if (hb == "Horse [Wu午]") {
        his1 = gon[4];
        his2 = gon[6];
        his3 = "";
      }
      if (hb == "Goat [Wei未]") {
        his1 = gon[6];
        his2 = gon[4];
        his3 = gon[2];
      }
      if (hb == "Monkey [Shen申]") {
        his1 = gon[7];
        his2 = gon[9];
        his3 = gon[5];
      }
      if (hb == "Rooster [You酉]") {
        his1 = gon[8];
        his2 = "";
        his3 = "";
      }
      if (hb == "Dog [Xu戌]") {
        his1 = gon[5];
        his2 = gon[8];
        his3 = gon[4];
      }
      if (db == "Pig [Hai亥]") {
        dis1 = gon[9];
        dis2 = gon[1];
        dis3 = "";
      }
      if (db == "Rat [Zi子]") {
        dis1 = gon[0];
        dis2 = "";
        dis3 = "";
      }
      if (db == "Ox [Chou丑]") {
        dis1 = gon[6];
        dis2 = gon[0];
        dis3 = gon[8];
      }
      if (db == "Tiger [Yin寅]") {
        dis1 = gon[1];
        dis2 = gon[3];
        dis3 = gon[5];
      }
      if (db == "Rabbit [Mao卯]") {
        dis1 = gon[2];
        dis2 = "";
        dis3 = "";
      }
      if (db == "Dragon [Chen辰]") {
        dis1 = gon[5];
        dis2 = gon[2];
        dis3 = gon[0];
      }
      if (db == "Snake [Si巳]") {
        dis1 = gon[3];
        dis2 = gon[5];
        dis3 = gon[7];
      }
      if (db == "Horse [Wu午]") {
        dis1 = gon[4];
        dis2 = gon[6];
        dis3 = "";
      }
      if (db == "Goat [Wei未]") {
        dis1 = gon[6];
        dis2 = gon[4];
        dis3 = gon[2];
      }
      if (db == "Monkey [Shen申]") {
        dis1 = gon[7];
        dis2 = gon[9];
        dis3 = gon[5];
      }
      if (db == "Rooster [You酉]") {
        dis1 = gon[8];
        dis2 = "";
        dis3 = "";
      }
      if (db == "Dog [Xu戌]") {
        dis1 = gon[5];
        dis2 = gon[8];
        dis3 = gon[4];
      }
      if (mb == "Pig [Hai亥]") {
        mis1 = gon[9];
        mis2 = gon[1];
        mis3 = "";
      }
      if (mb == "Rat [Zi子]") {
        mis1 = gon[0];
        mis2 = "";
        mis3 = "";
      }
      if (mb == "Ox [Chou丑]") {
        mis1 = gon[6];
        mis2 = gon[0];
        mis3 = gon[8];
      }
      if (mb == "Tiger [Yin寅]") {
        mis1 = gon[1];
        mis2 = gon[3];
        mis3 = gon[5];
      }
      if (mb == "Rabbit [Mao卯]") {
        mis1 = gon[2];
        mis2 = "";
        mis3 = "";
      }
      if (mb == "Dragon [Chen辰]") {
        mis1 = gon[5];
        mis2 = gon[2];
        mis3 = gon[0];
      }
      if (mb == "Snake [Si巳]") {
        mis1 = gon[3];
        mis2 = gon[5];
        mis3 = gon[7];
      }
      if (mb == "Horse [Wu午]") {
        mis1 = gon[4];
        mis2 = gon[6];
        mis3 = "";
      }
      if (mb == "Goat [Wei未]") {
        mis1 = gon[6];
        mis2 = gon[4];
        mis3 = gon[2];
      }
      if (mb == "Monkey [Shen申]") {
        mis1 = gon[7];
        mis2 = gon[9];
        mis3 = gon[5];
      }
      if (mb == "Rooster [You酉]") {
        mis1 = gon[8];
        mis2 = "";
        mis3 = "";
      }
      if (mb == "Dog [Xu戌]") {
        mis1 = gon[5];
        mis2 = gon[8];
        mis3 = gon[4];
      }
      if (yb == "Pig [Hai亥]") {
        yis1 = gon[9];
        yis2 = gon[1];
        yis3 = "";
      }
      if (yb == "Rat [Zi子]") {
        yis1 = gon[0];
        yis2 = "";
        yis3 = "";
      }
      if (yb == "Ox [Chou丑]") {
        yis1 = gon[6];
        yis2 = gon[0];
        yis3 = gon[8];
      }
      if (yb == "Tiger [Yin寅]") {
        yis1 = gon[1];
        yis2 = gon[3];
        yis3 = gon[5];
      }
      if (yb == "Rabbit [Mao卯]") {
        yis1 = gon[2];
        yis2 = "";
        yis3 = "";
      }
      if (yb == "Dragon [Chen辰]") {
        yis1 = gon[5];
        yis2 = gon[2];
        yis3 = gon[0];
      }
      if (yb == "Snake [Si巳]") {
        yis1 = gon[3];
        yis2 = gon[5];
        yis3 = gon[7];
      }
      if (yb == "Horse [Wu午]") {
        yis1 = gon[4];
        yis2 = gon[6];
        yis3 = "";
      }
      if (yb == "Goat [Wei未]") {
        yis1 = gon[6];
        yis2 = gon[4];
        yis3 = gon[2];
      }
      if (yb == "Monkey [Shen申]") {
        yis1 = gon[7];
        yis2 = gon[9];
        yis3 = gon[5];
      }
      if (yb == "Rooster [You酉]") {
        yis1 = gon[8];
        yis2 = "";
        yis3 = "";
      }
      if (yb == "Dog [Xu戌]") {
        yis1 = gon[5];
        yis2 = gon[8];
        yis3 = gon[4];
      }

      /*
          lps0 = lps0 + FW;

          if ((lps0 > 10) || (lps0 < 0)) {
            lps0 = lps0 - 10 * FW;
          }
          lps1 = gon[lps0];
          lps0 = lps0 + FW;
          if ((lps0 > 10) || (lps0 < 0)) {
            lps0 = lps0 - 10 * FW;
          }
      */

      var lpsBase = lps0;
      var lpbBase = lpb0;
      
      var arrLP = [];

      

        /*

        */


      lpb0 = lpb0 + FW;
      if ((lpb0 > 12) || (lpb0 < 0)) {
        lpb0 = lpb0 - 12 * FW;
      }
      lpb1 = ji[lpb0];
      lpb0 = lpb0 + FW;
      if ((lpb0 > 12) || (lpb0 < 0)) {
        lpb0 = lpb0 - 12 * FW;
      }
      lpb2 = ji[lpb0];
      lpb0 = lpb0 + FW;
      if ((lpb0 > 12) || (lpb0 < 0)) {
        lpb0 = lpb0 - 12 * FW;
      }
      lpb3 = ji[lpb0];
      lpb0 = lpb0 + FW;
      if ((lpb0 > 12) || (lpb0 < 0)) {
        lpb0 = lpb0 - 12 * FW;
      }
      lpb4 = ji[lpb0];
      lpb0 = lpb0 + FW;
      if ((lpb0 > 12) || (lpb0 < 0)) {
        lpb0 = lpb0 - 12 * FW;
      }
      lpb5 = ji[lpb0];
      lpb0 = lpb0 + FW;
      if ((lpb0 > 12) || (lpb0 < 0)) {
        lpb0 = lpb0 - 12 * FW;
      }
      lpb6 = ji[lpb0];
      lpb0 = lpb0 + FW;
      if ((lpb0 > 12) || (lpb0 < 0)) {
        lpb0 = lpb0 - 12 * FW;
      }
      lpb7 = ji[lpb0];
      lpb0 = lpb0 + FW;
      if ((lpb0 > 12) || (lpb0 < 0)) {
        lpb0 = lpb0 - 12 * FW;
      }
      lpb8 = ji[lpb0];



      lps0 = lps0 + FW;
      if ((lps0 > 10) || (lps0 < 0)) {
        lps0 = lps0 - 10 * FW;
      }
      lps1 = gon[lps0];
      lps0 = lps0 + FW;
      if ((lps0 > 10) || (lps0 < 0)) {
        lps0 = lps0 - 10 * FW;
      }
      lps2 = gon[lps0];
      lps0 = lps0 + FW;
      if ((lps0 > 10) || (lps0 < 0)) {
        lps0 = lps0 - 10 * FW;
      }
      lps3 = gon[lps0];
      lps0 = lps0 + FW;
      if ((lps0 > 10) || (lps0 < 0)) {
        lps0 = lps0 - 10 * FW;
      }
      lps4 = gon[lps0];
      lps0 = lps0 + FW;
      if ((lps0 > 10) || (lps0 < 0)) {
        lps0 = lps0 - 10 * FW;
      }
      lps5 = gon[lps0];
      lps0 = lps0 + FW;
      if ((lps0 > 10) || (lps0 < 0)) {
        lps0 = lps0 - 10 * FW;
      }
      lps6 = gon[lps0];
      lps0 = lps0 + FW;
      if ((lps0 > 10) || (lps0 < 0)) {
        lps0 = lps0 - 10 * FW;
      }
      lps7 = gon[lps0];
      lps0 = lps0 + FW;
      if ((lps0 > 10) || (lps0 < 0)) {
        lps0 = lps0 - 10 * FW;
      }
      lps8 = gon[lps0];


      dn = 0;

      if (ys == "+Wood [Jia甲]") {
        dn = 0;
      } else if (ys == "-Wood [Yi乙]") {
        dn = 10;
      } else if (ys == "+Fire [Bing丙]") {
        dn = 20;
      } else if (ys == "-Fire [Ding丁]") {
        dn = 30;
      } else if (ys == "+Earth [Wu戊]") {
        dn = 40;
      } else if (ys == "-Earth [Ji己]") {
        dn = 50;
      } else if (ys == "+Metal [Geng庚]") {
        dn = 60;
      } else if (ys == "-Metal [Xin辛]") {
        dn = 70;
      } else if (ys == "+Water [Ren壬]") {
        dn = 80;
      } else if (ys == "-Water [Gui癸]") {
        dn = 90;
      }

      if (hs == "+Wood [Jia甲]") {
        dn = dn + 1;
      } else if (hs == "-Wood [Yi乙]") {
        dn = dn + 2;
      } else if (hs == "+Fire [Bing丙]") {
        dn = dn + 3;
      } else if (hs == "-Fire [Ding丁]") {
        dn = dn + 4;
      } else if (hs == "+Earth [Wu戊]") {
        dn = dn + 5;
      } else if (hs == "-Earth [Ji己]") {
        dn = dn + 6;
      } else if (hs == "+Metal [Geng庚]") {
        dn = dn + 7;
      } else if (hs == "-Metal [Xin辛]") {
        dn = dn + 8;
      } else if (hs == "+Water [Ren壬]") {
        dn = dn + 9;
      } else if (hs == "-Water [Gui癸]") {
        dn = dn + 10;
      }


          /*
            
          */


      for (var i = -1; i < 8; i++) {

          /*
            Month pillar is the fist luck pillar......
          */
          if (i == -1) {

          }
          else {
              lpsBase += FW;
              lpbBase += FW;


              if ((lpsBase > 10) || (lpsBase < 0))
                  lpsBase = lpsBase - 10 * FW;

              if ((lpbBase > 12) || (lpbBase < 0)) {
                  lpbBase = lpbBase - 12 * FW;
              }
          }
          
          var arrAP = [];

          for (var j = 0; j < 11; j++) {
              var year = Math.floor(i * 10 + j + LP + YY);

              var age = year - 1923;

              var stem = Math.floor(age % 10);
              var branch = Math.floor(age % 12);

              arrAP.push({
                  //MS: moment(pDate).add(year, 'years').format("YYYY"),
                  MS: (i * 10 + j + LP).toFixed(0),
                  LPS: gon[stem],
                  LPB: ji[branch],
              });
          }

          if (i == -1) {
              arrLP.push({
                  // Starting age
                  MS: moment(pDate).add(i * 10 + LP, 'years').format("MMM DD YYYY"),
                  // Luck pillar Stem 
                  LPS: ms,
                  // Luck pillar Branch
                  LPB: mb,
                  // Annual pillars
                  AP: arrAP,
              });
          }
          else {
              arrLP.push({
                  // Starting age
                  MS: moment(pDate).add(i * 10 + LP, 'years').format("MMM DD YYYY"),
                  // Luck pillar Stem 
                  LPS: gon[lpsBase],
                  // Luck pillar Branch
                  LPB: ji[lpbBase],
                  // Annual pillars
                  AP: arrAP,
              });
          }
          
      }

      arrLP.reverse();


          /*
            
          */

      var ret = {
        calculated: true,
        ys: ys,
        ms: ms,
        ds: ds,
        hs: hs,

        yb: yb,
        mb: mb,
        db: db,
        hb: hb,

        comment1: str1,
        comment2: str2,

        fpc: [
            // Hour
            { stem: hs, branch: hb, stem1: his1, stem2: his2, stem3: his3 },
            // Day
            { stem: ds, branch: db, stem1: dis1, stem2: dis2, stem3: dis3 },
            // Month
            { stem: ms, branch: mb, stem1: mis1, stem2: mis2, stem3: mis3 },
            // Year
            { stem: ys, branch: yb, stem1: yis1, stem2: yis2, stem3: yis3 },
        ],

        hs1: his1,
        hs2: his2,
        hs3: his3,
        ds1: dis1,
        ds2: dis2,
        ds3: dis3,
        ms1: mis1,
        ms2: mis2,
        ms3: mis3,
        ys1: yis1,
        ys2: yis2,
        ys3: yis3,
        lp1: LP,
        lp2: LP + 10,
        lp3: LP + 20,
        lp4: LP + 30,
        lp5: LP + 40,
        lp6: LP + 50,
        lp7: LP + 60,
        lp8: LP + 70,



        arrLP: arrLP,


        lps1: lps1,
        lps2: lps2,
        lps3: lps3,
        lps4: lps4,
        lps5: lps5,
        lps6: lps6,
        lps7: lps7,
        lps8: lps8,
        lpb1: lpb1,
        lpb2: lpb2,
        lpb3: lpb3,
        lpb4: lpb4,
        lpb5: lpb5,
        lpb6: lpb6,
        lpb7: lpb7,
        lpb8: lpb8,
        solar_birth: solarTime,

        dn: dn
      };

      return ret;
    };

  });

})();
