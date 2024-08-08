function getDefaultExportFromCjs(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var index_min={exports:{}};/*! qrcode-svg-ts v1.4.0 | https://github.com/shlyren/qrcode-svg-ts | MIT license */(function(module){function QR8bitByte(t){this.mode=QRMode.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,n=this.data.length;e<n;e++){var r=[],o=this.data.charCodeAt(e);o>65536?(r[0]=240|(1835008&o)>>>18,r[1]=128|(258048&o)>>>12,r[2]=128|(4032&o)>>>6,r[3]=128|63&o):o>2048?(r[0]=224|(61440&o)>>>12,r[1]=128|(4032&o)>>>6,r[2]=128|63&o):o>128?(r[0]=192|(1984&o)>>>6,r[1]=128|63&o):r[0]=o,this.parsedData.push(r)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function QRCodeModel(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}QR8bitByte.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,n=this.parsedData.length;e<n;e++)t.put(this.parsedData[e],8)}},QRCodeModel.prototype={addData:function(t){var e=new QR8bitByte(t);this.dataList.push(e),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++){this.modules[n]=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++)this.modules[n][r]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),this.dataCache==null&&(this.dataCache=QRCodeModel.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var n=-1;n<=7;n++)if(!(t+n<=-1||this.moduleCount<=t+n))for(var r=-1;r<=7;r++)e+r<=-1||this.moduleCount<=e+r||(this.modules[t+n][e+r]=0<=n&&n<=6&&(r==0||r==6)||0<=r&&r<=6&&(n==0||n==6)||2<=n&&n<=4&&2<=r&&r<=4)},getBestMaskPattern:function(){for(var t=0,e=0,n=0;n<8;n++){this.makeImpl(!0,n);var r=QRUtil.getLostPoint(this);(n==0||t>r)&&(t=r,e=n)}return e},createMovieClip:function(t,e,n){var r=t.createEmptyMovieClip(e,n);this.make();for(var o=0;o<this.modules.length;o++)for(var s=1*o,l=0;l<this.modules[o].length;l++){var a=1*l;this.modules[o][l]&&(r.beginFill(0,100),r.moveTo(a,s),r.lineTo(a+1,s),r.lineTo(a+1,s+1),r.lineTo(a,s+1),r.endFill())}return r},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)this.modules[t][6]==null&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)this.modules[6][e]==null&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=QRUtil.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var n=0;n<t.length;n++){var r=t[e],o=t[n];if(this.modules[r][o]==null)for(var s=-2;s<=2;s++)for(var l=-2;l<=2;l++)this.modules[r+s][o+l]=s==-2||s==2||l==-2||l==2||s==0&&l==0}},setupTypeNumber:function(t){for(var e=QRUtil.getBCHTypeNumber(this.typeNumber),n=0;n<18;n++){var r=!t&&(e>>n&1)==1;this.modules[Math.floor(n/3)][n%3+this.moduleCount-8-3]=r}for(n=0;n<18;n++)r=!t&&(e>>n&1)==1,this.modules[n%3+this.moduleCount-8-3][Math.floor(n/3)]=r},setupTypeInfo:function(t,e){for(var n=this.errorCorrectLevel<<3|e,r=QRUtil.getBCHTypeInfo(n),o=0;o<15;o++){var s=!t&&(r>>o&1)==1;o<6?this.modules[o][8]=s:o<8?this.modules[o+1][8]=s:this.modules[this.moduleCount-15+o][8]=s}for(o=0;o<15;o++)s=!t&&(r>>o&1)==1,o<8?this.modules[8][this.moduleCount-o-1]=s:o<9?this.modules[8][15-o-1+1]=s:this.modules[8][15-o-1]=s;this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var n=-1,r=this.moduleCount-1,o=7,s=0,l=this.moduleCount-1;l>0;l-=2)for(l==6&&l--;;){for(var a=0;a<2;a++)if(this.modules[r][l-a]==null){var u=!1;s<t.length&&(u=(t[s]>>>o&1)==1),QRUtil.getMask(e,r,l-a)&&(u=!u),this.modules[r][l-a]=u,--o==-1&&(s++,o=7)}if((r+=n)<0||this.moduleCount<=r){r-=n,n=-n;break}}}},QRCodeModel.PAD0=236,QRCodeModel.PAD1=17,QRCodeModel.createData=function(t,e,n){for(var r=QRRSBlock.getRSBlocks(t,e),o=new QRBitBuffer,s=0;s<n.length;s++){var l=n[s];o.put(l.mode,4),o.put(l.getLength(),QRUtil.getLengthInBits(l.mode,t)),l.write(o)}var a=0;for(s=0;s<r.length;s++)a+=r[s].dataCount;if(o.getLengthInBits()>8*a)throw new Error("code length overflow. ("+o.getLengthInBits()+">"+8*a+")");for(o.getLengthInBits()+4<=8*a&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(!1);for(;!(o.getLengthInBits()>=8*a||(o.put(QRCodeModel.PAD0,8),o.getLengthInBits()>=8*a));)o.put(QRCodeModel.PAD1,8);return QRCodeModel.createBytes(o,r)},QRCodeModel.createBytes=function(t,e){for(var n=0,r=0,o=0,s=new Array(e.length),l=new Array(e.length),a=0;a<e.length;a++){var u=e[a].dataCount,d=e[a].totalCount-u;r=Math.max(r,u),o=Math.max(o,d),s[a]=new Array(u);for(var h=0;h<s[a].length;h++)s[a][h]=255&t.buffer[h+n];n+=u;var m=QRUtil.getErrorCorrectPolynomial(d),R=new QRPolynomial(s[a],m.getLength()-1).mod(m);for(l[a]=new Array(m.getLength()-1),h=0;h<l[a].length;h++){var p=h+R.getLength()-l[a].length;l[a][h]=p>=0?R.get(p):0}}var v=0;for(h=0;h<e.length;h++)v+=e[h].totalCount;var Q=new Array(v),E=0;for(h=0;h<r;h++)for(a=0;a<e.length;a++)h<s[a].length&&(Q[E++]=s[a][h]);for(h=0;h<o;h++)for(a=0;a<e.length;a++)h<l[a].length&&(Q[E++]=l[a][h]);return Q};for(var QRMode={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},QRErrorCorrectLevel={L:1,M:0,Q:3,H:2},QRMaskPattern={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},QRUtil={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;QRUtil.getBCHDigit(e)-QRUtil.getBCHDigit(QRUtil.G15)>=0;)e^=QRUtil.G15<<QRUtil.getBCHDigit(e)-QRUtil.getBCHDigit(QRUtil.G15);return(t<<10|e)^QRUtil.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;QRUtil.getBCHDigit(e)-QRUtil.getBCHDigit(QRUtil.G18)>=0;)e^=QRUtil.G18<<QRUtil.getBCHDigit(e)-QRUtil.getBCHDigit(QRUtil.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;t!=0;)e++,t>>>=1;return e},getPatternPosition:function(t){return QRUtil.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,n){switch(t){case QRMaskPattern.PATTERN000:return(e+n)%2==0;case QRMaskPattern.PATTERN001:return e%2==0;case QRMaskPattern.PATTERN010:return n%3==0;case QRMaskPattern.PATTERN011:return(e+n)%3==0;case QRMaskPattern.PATTERN100:return(Math.floor(e/2)+Math.floor(n/3))%2==0;case QRMaskPattern.PATTERN101:return e*n%2+e*n%3==0;case QRMaskPattern.PATTERN110:return(e*n%2+e*n%3)%2==0;case QRMaskPattern.PATTERN111:return(e*n%3+(e+n)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new QRPolynomial([1],0),n=0;n<t;n++)e=e.multiply(new QRPolynomial([1,QRMath.gexp(n)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case QRMode.MODE_NUMBER:return 10;case QRMode.MODE_ALPHA_NUM:return 9;case QRMode.MODE_8BIT_BYTE:case QRMode.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case QRMode.MODE_NUMBER:return 12;case QRMode.MODE_ALPHA_NUM:return 11;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case QRMode.MODE_NUMBER:return 14;case QRMode.MODE_ALPHA_NUM:return 13;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),n=0,r=0;r<e;r++)for(var o=0;o<e;o++){for(var s=0,l=t.isDark(r,o),a=-1;a<=1;a++)if(!(r+a<0||e<=r+a))for(var u=-1;u<=1;u++)o+u<0||e<=o+u||a==0&&u==0||l==t.isDark(r+a,o+u)&&s++;s>5&&(n+=3+s-5)}for(r=0;r<e-1;r++)for(o=0;o<e-1;o++){var d=0;t.isDark(r,o)&&d++,t.isDark(r+1,o)&&d++,t.isDark(r,o+1)&&d++,t.isDark(r+1,o+1)&&d++,d!=0&&d!=4||(n+=3)}for(r=0;r<e;r++)for(o=0;o<e-6;o++)t.isDark(r,o)&&!t.isDark(r,o+1)&&t.isDark(r,o+2)&&t.isDark(r,o+3)&&t.isDark(r,o+4)&&!t.isDark(r,o+5)&&t.isDark(r,o+6)&&(n+=40);for(o=0;o<e;o++)for(r=0;r<e-6;r++)t.isDark(r,o)&&!t.isDark(r+1,o)&&t.isDark(r+2,o)&&t.isDark(r+3,o)&&t.isDark(r+4,o)&&!t.isDark(r+5,o)&&t.isDark(r+6,o)&&(n+=40);var h=0;for(o=0;o<e;o++)for(r=0;r<e;r++)t.isDark(r,o)&&h++;return n+=10*(Math.abs(100*h/e/e-50)/5)}},QRMath={glog:function(t){if(t<1)throw new Error("glog("+t+")");return QRMath.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return QRMath.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},i=0;i<8;i++)QRMath.EXP_TABLE[i]=1<<i;for(var i=8;i<256;i++)QRMath.EXP_TABLE[i]=QRMath.EXP_TABLE[i-4]^QRMath.EXP_TABLE[i-5]^QRMath.EXP_TABLE[i-6]^QRMath.EXP_TABLE[i-8];for(var i=0;i<255;i++)QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]]=i;function QRPolynomial(t,e){if(t.length==null)throw new Error(t.length+"/"+e);for(var n=0;n<t.length&&t[n]==0;)n++;this.num=new Array(t.length-n+e);for(var r=0;r<t.length-n;r++)this.num[r]=t[r+n]}function QRRSBlock(t,e){this.totalCount=t,this.dataCount=e}function QRBitBuffer(){this.buffer=[],this.length=0}QRPolynomial.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),n=0;n<this.getLength();n++)for(var r=0;r<t.getLength();r++)e[n+r]^=QRMath.gexp(QRMath.glog(this.get(n))+QRMath.glog(t.get(r)));return new QRPolynomial(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=QRMath.glog(this.get(0))-QRMath.glog(t.get(0)),n=new Array(this.getLength()),r=0;r<this.getLength();r++)n[r]=this.get(r);for(r=0;r<t.getLength();r++)n[r]^=QRMath.gexp(QRMath.glog(t.get(r))+e);return new QRPolynomial(n,0).mod(t)}},QRRSBlock.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],QRRSBlock.getRSBlocks=function(t,e){var n=QRRSBlock.getRsBlockTable(t,e);if(n==null)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var r=n.length/3,o=[],s=0;s<r;s++)for(var l=n[3*s+0],a=n[3*s+1],u=n[3*s+2],d=0;d<l;d++)o.push(new QRRSBlock(a,u));return o},QRRSBlock.getRsBlockTable=function(t,e){switch(e){case QRErrorCorrectLevel.L:return QRRSBlock.RS_BLOCK_TABLE[4*(t-1)+0];case QRErrorCorrectLevel.M:return QRRSBlock.RS_BLOCK_TABLE[4*(t-1)+1];case QRErrorCorrectLevel.Q:return QRRSBlock.RS_BLOCK_TABLE[4*(t-1)+2];case QRErrorCorrectLevel.H:return QRRSBlock.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},QRBitBuffer.prototype={get:function(t){var e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)==1},put:function(t,e){for(var n=0;n<e;n++)this.putBit((t>>>e-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var QRCodeLimitLength=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];function QRCodeSVG(t){if(this.options={padding:0,width:256,height:256,typeNumber:4,color:"#000000",background:"#ffffff",ecl:"H",join:!0},typeof t=="string"&&(t={content:t}),t)for(var e in t)this.options[e]=t[e];if(typeof this.options.content!="string")throw new Error("Expected 'content' as string!");if(this.options.content.length===0)throw new Error("Expected 'content' to be non-empty!");if(!(this.options.padding>=0))throw new Error("Expected 'padding' value to be non-negative!");if(!(this.options.width>0&&this.options.height>0))throw new Error("Expected 'width' or 'height' value to be higher than zero!");var n=this.options.content,r=function(s,l){for(var a=function(p){var v=encodeURI(p).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return v.length+(v.length!=p?3:0)}(s),u=1,d=0,h=0,m=QRCodeLimitLength.length;h<=m;h++){var R=QRCodeLimitLength[h];if(!R)throw new Error("Content too long: expected "+d+" but got "+a);switch(l){case"L":d=R[0];break;case"M":d=R[1];break;case"Q":d=R[2];break;case"H":d=R[3];break;default:throw new Error("Unknwon error correction level: "+l)}if(a<=d)break;u++}if(u>QRCodeLimitLength.length)throw new Error("Content too long");return u}(n,this.options.ecl),o=function(s){switch(s){case"L":return QRErrorCorrectLevel.L;case"M":return QRErrorCorrectLevel.M;case"Q":return QRErrorCorrectLevel.Q;case"H":return QRErrorCorrectLevel.H;default:throw new Error("Unknwon error correction level: "+s)}}(this.options.ecl);this.qrcode=new QRCodeModel(r,o),this.qrcode.addData(n),this.qrcode.make(),this.modules=this.qrcode.modules}QRCodeSVG.prototype.svg=function(t){var e=this.options||{},n=this.qrcode.modules;t===void 0&&(t={container:e.container||"svg"});for(var r=e.pretty===void 0||!!e.pretty,o=r?"  ":"",s=r?`\r
`:"",l=e.width,a=e.height,u=n.length,d=l/(u+2*e.padding),h=a/(u+2*e.padding),m=e.join!==void 0&&!!e.join,R=e.swap!==void 0&&!!e.swap,p=e.xmlDeclaration===void 0||!!e.xmlDeclaration,v=e.predefined!==void 0&&!!e.predefined,Q=v?o+'<defs><path id="qrmodule" d="M0 0 h'+h+" v"+d+' H0 z" style="fill:'+e.color+';shape-rendering:crispEdges;" /></defs>'+s:"",E=o+'<rect x="0" y="0" width="'+l+'" height="'+a+'" style="fill:'+e.background+';shape-rendering:crispEdges;"/>'+s,C="",P="",w=0;w<u;w++)for(var B=0;B<u;B++)if(n[B][w]){var f=B*d+e.padding*d,c=w*h+e.padding*h;if(R){var T=f;f=c,c=T}if(m){var M=d+f,L=h+c;f=Number.isInteger(f)?Number(f):f.toFixed(2),c=Number.isInteger(c)?Number(c):c.toFixed(2),M=Number.isInteger(M)?Number(M):M.toFixed(2),P+="M"+f+","+c+" V"+(L=Number.isInteger(L)?Number(L):L.toFixed(2))+" H"+M+" V"+c+" H"+f+" Z "}else C+=v?o+'<use x="'+f.toString()+'" y="'+c.toString()+'" href="#qrmodule" />'+s:o+'<rect x="'+f.toString()+'" y="'+c.toString()+'" width="'+d+'" height="'+h+'" style="fill:'+e.color+';shape-rendering:crispEdges;"/>'+s}m&&(C=o+'<path x="0" y="0" style="fill:'+e.color+';shape-rendering:crispEdges;" d="'+P+'" />');var g="";switch(t.container){case"svg":p&&(g+='<?xml version="1.0" standalone="yes"?>'+s),g+='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="'+l+'" height="'+a+'">'+s,g+=Q+E+C,g+="</svg>";break;case"svg-viewbox":p&&(g+='<?xml version="1.0" standalone="yes"?>'+s),g+='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 '+l+" "+a+'">'+s,g+=Q+E+C,g+="</svg>";break;case"g":g+='<g width="'+l+'" height="'+a+'">'+s,g+=Q+E+C,g+="</g>";break;default:g+=(Q+E+C).replace(/^\s+/,"")}return g};const Platform={isBrowser:typeof window<"u"&&window.document!==void 0,isNode:typeof process<"u"&&process.versions!=null&&process.versions.node!=null,isWebWorker:typeof self=="object"&&self.constructor&&self.constructor.name==="DedicatedWorkerGlobalScope",isJsDom:typeof window<"u"&&window.name==="nodejs"||typeof navigator<"u"&&(navigator.userAgent.includes("Node.js")||navigator.userAgent.includes("jsdom")),isDeno:typeof Deno<"u"&&Deno.core!==void 0};QRCodeSVG.prototype.save=function(file){function requireModule(name){if(Platform.isNode)try{const module=eval(`require('${name}')`);return Promise.resolve(module)}catch(t){return Promise.reject(t)}return Promise.reject("QRCodeSVG.save is available in node.js but not in a web browser")}return new Promise((t,e)=>{requireModule("fs").then(n=>{var r=this.svg();n.writeFile(file,r,function(o){o?e(o):t(file)})}).catch(e)})},QRCodeSVG.prototype.toDataURL=function(){var t=this.svg();return"data:image/svg+xml;utf8,"+encodeURIComponent(t)},module.exports=QRCodeSVG})(index_min);var index_minExports=index_min.exports;const QRCode=getDefaultExportFromCjs(index_minExports);export{QRCode as Q};
